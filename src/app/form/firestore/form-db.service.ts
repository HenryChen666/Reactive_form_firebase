import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Userdatas} from '../../userdatas';

@Injectable({
  providedIn: 'root'
})
export class FormDbService {
  constructor(private firestore: AngularFirestore) { }
  getUsers(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: Userdatas): Promise<DocumentReference> {
    delete user.id;
    return this.firestore.collection('users').add({...user});
  }
  deleteUser(userId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).delete();
    }

}
