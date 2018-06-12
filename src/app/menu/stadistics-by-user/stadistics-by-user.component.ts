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
            this.games$ = this.db.list('games_played', ref => ref.orderByChild('user').equalTo(id))
                                .valueChanges()
                                .pipe(
                                  map(
                                    (games) => {
                                      console.dir(games)
                                      let games_with_level = games.map(
                                        (g:any) => {
                                          let level = _.findWhere(levels, 
                                            possibleLevel => possibleLevel.key == g.level 
                                          );
                                          
                                          g.level = level                                          
                                        }                                         
                                      );
                                      return games_with_level
                                    }
                                  )
                                );
            this.$games = this.games$.subscribe(
            
            )
          }
        );        
            
    });

    //let id = route.paramMap.get('id');
    
  }

  ngOnInit() {    
    this.sub.unsubscribe();
  }

}
