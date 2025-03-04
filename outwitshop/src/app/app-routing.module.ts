import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirect the empty path to '/home'
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  // Home page route
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // Your New Page route using standalone component
  {
    path: 'your-new-page',
    loadComponent: () => import('./your-new-page/your-new-page.page').then(m => m.YourNewPagePage)
  },
  // Fallback route for undefined paths
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
