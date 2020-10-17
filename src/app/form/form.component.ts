import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Userdatas} from '../userdatas';
import {FormDbService} from './firestore/form-db.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  message: string;
  hideMsg = true;
  msgStyle = {
    color: null,
    'background-color': 'white',
    'font-size': '150%',
  };

users: Userdatas[] = [];
  userForm = this.fromBuilder.group({
    phone: ['', [Validators.required, Validators.pattern('[1-9][0-9][0-9][1-9][0-9][0-9][0-9][0-9][0-9][0-9]')]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });


  get phone(): AbstractControl{return this.userForm.get('phone'); }
  get firstName(): AbstractControl{return this.userForm.get('firstName'); }
  get lastName(): AbstractControl{return this.userForm.get('lastName'); }
  get email(): AbstractControl{return this.userForm.get('email'); }


  constructor(private  fromBuilder: FormBuilder, private store: FormDbService) { }



  ngOnInit(): void {
    this.message = '';
    this.store.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Userdatas;
      });
    });
  }
  showMessage(type: string, msg: string): void {
    this.msgStyle.color = type === 'error' ? 'red' : 'blue';
    this.message = msg;
    this.hideMsg = false;
    setTimeout(
      () => {
        this.hideMsg = true;
      }, 2500
    );
  }


  onSubmit(): void{

    const user = new Userdatas(
      null,
      this.userForm.value.lastName,
      this.userForm.value.firstName,
      Number(this.userForm.value.phone),
      this.userForm.value.email);
    this.users.push(user);
    this.store.createUser(user)
      .then(
        docRef => {
          user.id = docRef.id;
          this.showMessage('info', 'Sucessfully Save');
          }
    )
    .catch(_ =>
      this.showMessage('error', 'Save Unsuccessful')
    );
    this.userForm.reset();

  }
  delete(id: string): void {
    this.store.deleteUser(id)
      .then(_ =>
        this.showMessage('info', 'Sucessfully Delete')
    )
    .catch(_ =>
      this.showMessage('error', 'Delete Unsuccessful')
    );
  }
}
