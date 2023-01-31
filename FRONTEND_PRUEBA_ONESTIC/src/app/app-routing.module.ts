import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { DetailComponent } from './views/detail/detail.component';
import { FavoritesComponent } from './views/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo:'list', pathMatch:'full' },
  { path: 'list', component: ListComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
