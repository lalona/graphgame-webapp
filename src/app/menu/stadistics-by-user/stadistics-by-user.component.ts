import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { _ } from 'underscore'

@Component({
  selector: 'app-stadistics-by-user',
  templateUrl: './stadistics-by-user.component.html',
  styleUrls: ['./stadistics-by-user.component.css']
})
export class StadisticsByUserComponent implements OnInit {

  games$: Observable<any[]>
  games: any[]
  $games: Subscription;
  levels$: Observable<any[]>;
  $levels: Subscription;
  sub: any
  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) { 
    this.sub = this.route.params.subscribe(params => {
        let id = params['id']; // (+) converts string 'id' to a number
        console.log(id)
        this.levels$ = db.list('levels').snapshotChanges().pipe(
          map((levels) => {
            let levels_key = levels.map(l => {          
              let level_with_key = { key: l.payload.key, ...l.payload.val() }          
              return level_with_key
            })            
            return levels_key;
          }) 
        );
        this.$levels = this.levels$.subscribe(
          levels => {
            this.games$ = this.db.list('games_played', 
            ref => ref.orderByChild('user').equalTo(id))
                  .valueChanges()
                  .pipe(
                    map((games) => {
                        console.log("Is entering for first time\n")                                    
                        console.dir(games)
                        var alllevelsPlayedByUser = []
                        games.forEach((g: any) => {
                          if(!_.contains(alllevelsPlayedByUser, g.level)) {
                            alllevelsPlayedByUser.push(g.level)
                          }
                        });  
                        console.dir(levels)
                        var gamesByLevel = []
                        for(var i = 0; i < alllevelsPlayedByUser.length; i++) {
                          let lPlayed = alllevelsPlayedByUser[i]
                          let gamesPlayed = _.where(games, {"level": lPlayed})
                          console.log(lPlayed)
                          console.dir(gamesPlayed)
                          let levelPlayed = _.findWhere(levels, {"key": lPlayed})
                          console.dir(levelPlayed)
                          gamesByLevel.push({
                            level: levelPlayed,
                            games: gamesPlayed
                          }) 
                        }

                        /*games.map((g: any) => {
                            let level = _.findWhere(
                              levels, 
                              possibleLevel => possibleLevel.key == g.level
                            );                                          
                            g.level = level                                          
                          }                                         
                        );*/
                        return gamesByLevel
                      }
                    )
                  );
            this.$games = this.games$.subscribe(
              games => {
                console.dir(games)
                this.games = games
              }
            )
          }
        );        
            
    });

    //let id = route.paramMap.get('id');
    
  }

  ngOnInit() {    
    this.sub.unsubscribe();
    this.$games.unsubscribe();
  }

}
