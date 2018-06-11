import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { AuthService } from '../core/auth.service'
import { format } from 'util';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnDestroy {
  
  state: string = '';
  error: any;
  $checkUsername: Subscription

  constructor(public auth : AuthService,private router: Router) {

  }

  ngOnDestroy(): void {
    this.$checkUsername.unsubscribe();
  }

  onSubmit(formData) {    
    if(formData.valid) {
      alert("Valid data");
      this.$checkUsername = this.auth.checkUsername(formData.value.username).subscribe(username => {
          this.$checkUsername.unsubscribe()
          if(!username) {
            this.auth.signUp(formData.value, formData.value.password)
            alert("User not choosen")
          } else {
            alert("User already choosen")            
          }
        },
        error => {
          console.log(error);
          alert(error);
        }
      )      
    } else {
      alert("No valid data");
    }
  }

}
