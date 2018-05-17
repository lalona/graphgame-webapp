import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { AuthService } from '../core/auth.service'
import { format } from 'util';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent {

  state: string = '';
  error: any;

  constructor(public auth : AuthService,private router: Router) {

  }

  onSubmit(formData) {    
    if(formData.valid) {
      alert("Valid data");
      this.auth.checkUsername(formData.value.username).subscribe(username => {
          if(!username) {
            this.auth.signUp(formData.value, formData.value.password)
            alert("User not choosen")
          } else {
            alert("User already choosen")
            
          }
        },
        error => {
          console.log(error);
        }
      )      
    } else {
      alert("No valid data");
    }
  }

}
