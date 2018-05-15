import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/games_played').valueChanges();
  }

  ngOnInit() {
  }

}
