import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IRegisterUserData, IUserData } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersCollection!: AngularFirestoreCollection<IUserData>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) {
    this.usersCollection = this.angularFireStore.collection<IUserData>('users');
    this.isAuthenticated$ = this.angularFireAuth.user.pipe(map((usr) => !!usr));
  }

  async createUser(userData: IRegisterUserData): Promise<void | Error> {
    const { name, email, password, age, phoneNumber } = userData;
    const userCredentials =
      await this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

    if (!userCredentials.user) {
      throw Error('User cannot be found');
    }

    await this.usersCollection.doc(userCredentials.user?.uid).set({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      age: age
    });

    await userCredentials.user.updateProfile({
      displayName: name
    });
  }

  async login(args: {
    email: string;
    password: string;
  }): Promise<void | Error> {
    const { email, password } = args;
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await this.angularFireAuth.signOut();
  }
}
