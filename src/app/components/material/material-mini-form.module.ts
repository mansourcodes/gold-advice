import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  exports: [MatInputModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatMomentDateModule],
})
export class MaterialMiniFormModule { }
