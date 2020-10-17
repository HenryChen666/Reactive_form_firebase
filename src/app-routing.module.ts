import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormComponent} from '../src/app/form/form.component';

const routes: Routes = [
  {path: 'form', component:FormComponent},
  {path: '', redirectTo:'form', pathMatch:'full'},
  {path:'**', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
