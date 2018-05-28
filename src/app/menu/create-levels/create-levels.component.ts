import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Level, Transformation } from './level'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-levels',
  templateUrl: './create-levels.component.html',
  styleUrls: ['./create-levels.component.css']
})
export class CreateLevelsComponent {

  basePath = "levels";  
  levelsRef: AngularFireList<any>;
  levels$: Observable<any[]>;
  level: Level = new Level()

  figures$: Observable<any[]>

  constructor(db: AngularFireDatabase,public router: Router) {
    this.levelsRef = db.list(this.basePath);        
    this.figures$ = db.list("figures").valueChanges();
  }

  onSubmit() {
    this.levelsRef.push(this.level.toJson());    
    this.router.navigateByUrl('/menu/manage-levels');
  }

  public checkLevelName(levelname: string) {    
    levelname = levelname.toLowerCase();
    return this.db.object(`usernames/${levelname}`).valueChanges()
  }

}
