import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-levels',
  templateUrl: './create-levels.component.html',
  styleUrls: ['./create-levels.component.css']
})
export class CreateLevelsComponent implements OnInit {

  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {
  }

  onSubmit(level) {
    console.log(level);
    this.db.list('/levels').valueChanges().subscribe(
      levels => {
        console.log(levels.length)
        let levelJson = {
          
        }
        this.db.list('/levels').push(
          { "level 3": {
              
            }
          }
        )
      }
    );
  }

}
