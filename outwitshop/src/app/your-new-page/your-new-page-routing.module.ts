import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourNewPagePage } from './your-new-page.page';

const routes: Routes = [
  {
    path: '',
    component: YourNewPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourNewPagePageRoutingModule {}
