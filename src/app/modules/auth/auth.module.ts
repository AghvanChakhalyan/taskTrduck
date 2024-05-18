import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent, RegistrationComponent } from './components';
import { MatError, MatFormField, MatLabel, } from '@angular/material/form-field';



const routes: Routes = [{
  path: 'login',
  component: LoginComponent

}, {
  path: 'register',
  component: RegistrationComponent
}];

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    MatInput,
    MatLabel,
    MatError,
    FormsModule,
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
