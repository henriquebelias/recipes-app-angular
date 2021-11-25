import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Meal } from '../models/Meal';
import { Drink } from '../models/Drink';
import { basicUrls, searchUrls } from './endpoints';

const testEndpoint = 'http://localhost:5000/recipes';

interface ApiResponse {
  meals: Meal[],
  drinks: Drink[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  endpoint = testEndpoint;
  searchEndpoint = searchUrls;
  recipesSub: Subject<ApiResponse> = new Subject();

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get<ApiResponse>(this.endpoint).subscribe((response) => {
      this.recipesSub.next(response);
    });
  }

  searchRecipes(radioValue: string, inputValue: string, type: string) {
    if (type === 'meals') {
      this.http.get<ApiResponse>(this.searchEndpoint.meals(radioValue, inputValue))
        .subscribe((response) => this.recipesSub.next(response));
    } else {
      this.http.get<ApiResponse>(this.searchEndpoint.drinks(radioValue, inputValue))
        .subscribe((response) => this.recipesSub.next(response));
    }
  }
}
