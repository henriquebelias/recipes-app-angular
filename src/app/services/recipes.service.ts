import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  endpoints = {
    meal: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    drink: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  }

  constructor() { }
}
