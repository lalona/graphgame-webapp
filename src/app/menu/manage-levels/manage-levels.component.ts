import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { _ } from 'underscore'
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-levels',
  templateUrl: './manage-levels.component.html',
  styleUrls: ['./manage-levels.component.css']
})
export class ManageLevelsComponent implements OnDestroy {
  
  basePath = "levels";
  levelsRef: AngularFireList<any>;
  levels$: Observable<any[]>;
  $levels: Subscription;
  levels: any[];
  allLevels: any[];
  enabledLevels: any[];
  showingAll: boolean;

  constructor(db: AngularFireDatabase, private router: Router) { 
    this.levelsRef = db.list(this.basePath);
    this.showingAll = true
    this.levels$ = this.levelsRef.snapshotChanges().pipe(
      map((levels) => {
        let levels_key = levels.map(l => {          
          let level_with_key = { key: l.payload.key, ...l.payload.val() }          
          return level_with_key
        })
        levels_key = _.reject(levels_key, l => l.name == undefined)        
        return levels_key;
      }) 
    );
    this.$levels = this.levels$.subscribe(
      levels => {
        this.allLevels = levels
        this.enabledLevels = _.reject(levels, l => l.disabled == true)
        this.showSelected();
      }
    );
  }

  ngOnDestroy(): void {
    this.$levels.unsubscribe();
  }

  changeStateDisabled(level_avaible, state) {
    let key = level_avaible.key
    let level_disable = level_avaible    
    console.log(level_disable)
    delete level_disable.key
    level_disable.disabled = state
    console.log(level_disable);
    console.log(key)
    this.levelsRef.update(key, level_disable);
  }

  disable(level_avaible) {
    this.changeStateDisabled(level_avaible, true)
  }

  avaible(level_disable) {
    this.changeStateDisabled(level_disable, false)
  }

  showSelected() {
    if(this.showingAll) this.showAll()
    else this.showEnableds()
  }

  showAll() {
    this.levels = this.allLevels
    this.showingAll = true
  }

  showEnableds() {
    this.levels = this.enabledLevels
    this.showingAll = false
  }

  goToCreateLevel() {
    this.router.navigate(['/menu/create-levels']);
  }

}
