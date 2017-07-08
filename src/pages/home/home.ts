import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public angularFireAuth: AngularFireAuth) {
  }

  register(email, password) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.sendEmailVerification()
    });
  }

  login(username, password) {
    console.log('in', username, password);
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user.emailVerified) {
          console.log('email verified');
          // Redirect the user here
        } else {
          console.log('email not verified');
          // Tell the user to have a look at its mailbox
        }
      })
      .catch((err) =>{
        console.log('err', err);
      })
  }

  sendEmailVerification() {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
      });
  }

  sendPassword(email) {
    this.angularFireAuth.auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('email sent');
    })
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
