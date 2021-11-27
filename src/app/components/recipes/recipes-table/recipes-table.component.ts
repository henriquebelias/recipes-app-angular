import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { drinkObjFormatter, mealObjFormatter } from 'src/app/utils/objFormatter';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss']
})
export class RecipesTableComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private route: ActivatedRoute, private recipesSvc: RecipesService) { }

  ngOnInit(): void {
    this.recipesSvc.getRecipes();
    this.recipesSvc.recipesSub.subscribe((response) => {
      if (this.route.snapshot.routeConfig?.path === 'meals') {
        this.recipes = response.meals?.map(mealObjFormatter);
      } else {
        this.recipes = response.drinks?.map(drinkObjFormatter);
      }
    });
  }

}
