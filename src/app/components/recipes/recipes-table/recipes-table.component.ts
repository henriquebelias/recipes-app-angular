import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from 'src/app/models/Drink';
import { Meal } from 'src/app/models/Meal';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss']
})
export class RecipesTableComponent implements OnInit {
  recipes: { meals?: Meal[], drinks?: Drink[] } = {};

  constructor(private route: ActivatedRoute, private recipesSvc: RecipesService) { }

  ngOnInit(): void {
    // const type = this.route.snapshot.routeConfig?.path;
    this.recipesSvc.getRecipes().subscribe((response) => {
      if (this.route.snapshot.routeConfig?.path === 'meals') {
        this.recipes.meals = response.meals;
      } else {
        this.recipes.drinks = response.drinks;
      }
    });
  }
}
