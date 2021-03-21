import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MaterialButtonsModule } from '../../components/material/material-buttons.module';
import { MaterialFormModule } from '../../components/material/material-form.module';
import { MaterialLayoutModule } from '../../components/material/material-layout.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    MaterialFormModule,
    MaterialButtonsModule,
    MaterialLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
