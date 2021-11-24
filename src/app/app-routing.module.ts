import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RecipesTableComponent } from './components/recipes/recipes-table/recipes-table.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent  },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'meals', component: RecipesTableComponent },
    { path: 'drinks', component: RecipesTableComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
