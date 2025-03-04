import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourNewPagePageRoutingModule } from './your-new-page-routing.module';

import { YourNewPagePage } from './your-new-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourNewPagePageRoutingModule
  ],
  declarations: [YourNewPagePage]
})
export class YourNewPagePageModule {}
