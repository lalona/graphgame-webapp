import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { _ } from 'underscore'
@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent implements OnInit {

  users$: Observable<any[]>
  $users: Subscription
  allUsers: any[]
  filterUsers: any[]

  constructor(db: AngularFireDatabase) { 
    this.users$ = db.list('users').snapshotChanges().pipe(
      map((users) => {
        return users.map(u => {          
          let user_with_key = { key: u.payload.key, ...u.payload.val() }          
          return user_with_key
        })        
      }) 
    );
    this.$users = this.users$.subscribe(
      users => {
        this.allUsers = users   
        this.filterUsers = this.allUsers     
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.$users.unsubscribe();
  }

  onFilter(event) {
    let filter = event.target.value
    this.filterUsers = _.filter(this.allUsers, 
      user => {
        return user.userData.firstNames.toLowerCase().includes(filter) ||
               user.userData.lastNames.toLowerCase().includes(filter)  ||
               user.userData.email.toLowerCase().includes(filter);
      } 
    )

  }

}
