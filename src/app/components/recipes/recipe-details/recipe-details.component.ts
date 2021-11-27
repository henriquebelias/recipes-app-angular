import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from 'src/app/models/Drink';
import { Meal } from 'src/app/models/Meal';
import { Recipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { drinkObjFormatter, mealObjFormatter } from 'src/app/utils/objFormatter';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: Recipe;
  ingredients?: { name: string, measure: string }[];

  constructor(private route: ActivatedRoute, private recipesSvc: RecipesService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (this.route.snapshot.routeConfig?.path === 'recipes/meals/:id') {
      this.recipesSvc.getDetails('meals', +id).subscribe((response) => {
        this.recipe = mealObjFormatter(response.meals[0]);
        this.ingredients = this.getIngredients(response.meals[0]);
      });
    } else {
      this.recipesSvc.getDetails('drinks', +id).subscribe((response) => {
        this.recipe = drinkObjFormatter(response.drinks[0]);
        this.ingredients = this.getIngredients(response.drinks[0]);
      });
    }
  }

  getIngredients(recipe: Meal | Drink) {
    const ingredients: [string, string][] = Object.entries(recipe).filter(
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

}
