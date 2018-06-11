import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Level, Transformation, Rotation, RotationAxis, STEPS } from './level'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-levels',
  templateUrl: './create-levels.component.html',  
  styleUrls: ['./create-levels.component.css'],  
})

export class CreateLevelsComponent implements OnDestroy {
  
  basePath = "levels";  
  levelsRef: AngularFireList<any>;
  levels$: Observable<any[]>;
  level: Level = new Level()
  $checkLevelsNames: Subscription
  figures$: Observable<any[]>
  rotationSolved: Rotation = new Rotation()
  rotationStarted: Rotation = new Rotation()
  rotationAxis = RotationAxis
  stepsScale: number = 1  
  stepsTranslation: number = 1 
  steps = STEPS  

  constructor(public db: AngularFireDatabase,public router: Router) {
    this.levelsRef = db.list(this.basePath);        
    this.figures$ = db.list("figures").valueChanges();
  }

  ngOnDestroy(): void {
    this.$checkLevelsNames.unsubscribe()
  }

  onSubmit() {
    this.$checkLevelsNames = this.checkLevelName(this.level.name).subscribe(
      levelname => {    
        this.$checkLevelsNames.unsubscribe()
        if(!levelname) {
          let newLevelRef = this.levelsRef.push(this.level.toJson());  
          const levelsnamesRef = this.db.list('levelsnames');
          levelsnamesRef.update(this.level.name, {key: newLevelRef.key} );              
          this.router.navigateByUrl('/menu/manage-levels');
          alert("Levelname not choosen")
        } else {
          alert("Levelname already choosen")          
        }        
      }
    )   
  }

  printLevel() {
    console.dir(this.level.toJson())
  }

  public checkLevelName(levelname: string) {     
    return this.db.object(`levelsnames/${levelname}`).valueChanges()
  }

  public addRotationSolved() {
    this.level.solvedState.rotations.push(this.rotationSolved);
    this.rotationSolved = new Rotation()
  }
  
  public addRotationStart() {
    this.level.startState.rotations.push(this.rotationStarted);
    this.rotationStarted = new Rotation()
  }

}


