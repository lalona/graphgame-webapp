import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

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

  constructor(public afAuth: AngularFireAuth,private router: Router) {

  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.createUserWithEmailAndPassword(
        formData.value.email,formData.value.password)
      .then(
        (success) => {
        console.log(success);
        this.router.navigate(['/login'])
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        }
        else if (errorCode == 'auth/invalid-email') {
          alert('The email is invalid.');
        }
        else if (errorCode == 'auth/email-already-in-use') {
          alert('The email is already in use.');
        }         
        else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
  }

}
