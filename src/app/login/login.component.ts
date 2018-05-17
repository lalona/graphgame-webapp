import { Component,OnInit, HostBinding } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  state: string = '';    

  ngOnInit() {
    
  }

  constructor(public afAuth: AngularFireAuth,private router: Router) {
    if(this.afAuth.auth.currentUser) {
      // TODO: goto home
    } 
  }

  onSubmit(formData) {
    if(formData.valid) {

      console.log(formData.value);
      const credential = firebase.auth.EmailAuthProvider.credential(
            formData.value.email,
            formData.value.password
      );
      this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
        .then(
          user => {
            // TODO: check user has the credentials so it can go to home
            this.router.navigate(['/members']);
          }
        )
        .catch(
          (err) => {
            console.log(err);
            this.error = err;
          }
        );  
      }    
    }

}
