import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, Roles } from './user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,              
              private db: AngularFireDatabase,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            if (user) {
              return this.db.object<User>(`users/${user.uid}`).valueChanges()
            } else {
              return of(null)
            }
          }
        )
      )        
  }


  private login(credential) {    
    this.afAuth.auth.signInAndRetrieveDataWithCredential(credential)
      .then(user => {          
          // Navigate to home page for admin
          user
      });      
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  signUp(user , password: string) {    
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email,password)
      .then(finalUser => {
        console.log(finalUser);
        this.updateUserData(user,finalUser.user.uid);
        this.router.navigate(['/login'])
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        }
        else if (errorCode == 'auth/invalid-email') {
          console.log('The email is invalid.');
        }
        else if (errorCode == 'auth/email-already-in-use') {
          console.log('The email is already in use.');
        }         
        else {
          console.log(errorMessage);
        }
        console.log(error);
        this.error = error;
      });
  }

  public checkUsername(username: string) {
    console.log(username);
    username = username.toLowerCase();
    return this.db.object(`usernames/${username}`).valueChanges()
  }

  private updateUserData(user, uid) {
    
    console.log(user);

    const studentRole: Roles = {
      student: true
    };

    
    const userData: User = {      
      email: user.email,
      username: user.username,
      firstNames: user.firstNames,
      lastNames: user.lastNames,
      role: studentRole
    };

    const dataU = {
      uid, userData
    }
    const usernameData = { uid
    };

    let u = user.username;
    const dataUs = {
      u, usernameData
    };
  
    const usersRef = this.db.list('users');
    usersRef.push(dataU);
    
    const usernameRef = this.db.list('usernames');
    usersRef.push(dataUs);
  }


  
}