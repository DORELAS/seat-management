import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private tokenService: TokenService
  ) {
     /* SAVES USER DATA IN LOCAL STORAGE WHEN USER IS LOGGED IN AND
        SAVE IT AS NULL WHEN USER IS LOGGED OUT!
     */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  get isLoggedIn():Promise<any> {
    // RETURNS TRUE IF USER IS LOGGED IN AND SAVES THE TOKEN RECEIVED
    return new Promise(resolve => {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user && user.refreshToken !== null) {
        this.tokenService.setToken(user.refreshToken);
        resolve(true);
      } else {
        this.tokenService.setToken(null);
        this.router.navigate(['/']);
        resolve(false);  
      }
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: ProfileUser = {
      uid: user.uid,
      email: user.email,
      refreshToken: user.refreshToken,
      username: user.displayName
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }

}
