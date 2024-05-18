import { NgModule } from '@angular/core';
import { AsanaComponent } from './components';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption, MatSelect, } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { AsanaListComponent } from './components/asana-list/asana-list.component';

const routes: Routes = [{
  path: '',
  component: AsanaComponent
}];

@NgModule({
  providers: [provideNativeDateAdapter()],
  declarations: [
    AsanaComponent,
    AsanaListComponent
  ],
  imports: [
    MatLabel,
    MatInput,
    MatButton,
    MatSelect,
    MatOption,
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],

})
export class AsanaModule { }
