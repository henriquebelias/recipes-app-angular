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
    this.recipesSvc.getRecipes().subscribe((response) => {
      if (this.route.snapshot.routeConfig?.path === 'meals') {
        this.recipes.meals = response.meals;
      } else {
        this.recipes.drinks = response.drinks;
      }
    });
  }
}

/*
COLOCAR NA PÁGINA DE DETALHES

getIngredients(recipe: Meal | Drink) {
  const ingredients: [string, any][] = Object.entries(recipe).filter(
    (details) => {
      const condition1 = details[0].includes('Ingredient');
      const condition2 = details[1] !== '' && details[1] !== null;
      return condition1 && condition2;
    },
  );

  const measure: [string, any][] = Object.entries(recipe).filter(
    (details) => details[0].includes('Measure'),
  );

  const ingredientsArray = ingredients.reduce((acc: { name: string, index: number}[], curr, index) => {
    acc.push({ name: curr[1], index });
    return acc;
  }, []);

  const measuresArray = measure.reduce((acc: { measure: string, index: number }[], curr, index) => {
    acc.push({ measure: curr[1], index });
    return acc;
  }, []);

  return ingredientsArray.map((ingredient) => {
    const measurament = measuresArray
      .filter((quantity) => ingredient.index === quantity.index);
    return { name: ingredient.name, measure: measurament[0].measure };
  });
};
*/
