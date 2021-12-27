import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Meal } from '../models/Meal';
import { Drink } from '../models/Drink';
import { basicUrls, searchUrls, detailsUrl, categoriesUrls, byCategoryUrl } from './endpoints';

const testEndpoint = 'http://localhost:5000/recipes';

interface ApiResponse {
  meals: Meal[],
  drinks: Drink[]
}

interface CategoriesApiResponse {
  meals: { 'strCategory': string }[],
  drinks: { 'strCategory': string }[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  initialEndpoint = basicUrls;
  searchEndpoint = searchUrls;
  detailsEndpoint = detailsUrl;
  categoriesEndpoint = categoriesUrls;
  byCategoryEndpoint = byCategoryUrl;
  recipesSub: Subject<ApiResponse> = new Subject();

  constructor(private http: HttpClient) { }

  getRecipes(type: string) {
    if (type === 'meals') {
      this.http.get<ApiResponse>(this.initialEndpoint.meals).subscribe((response) => {
        this.recipesSub.next(response);
      });
    } else {
      this.http.get<ApiResponse>(this.initialEndpoint.drinks).subscribe((response) => {
        this.recipesSub.next(response);
      });
    }
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

  getDetails(type: string, id: number): Observable<ApiResponse> {
    return type === 'meals'
      ? this.http.get<ApiResponse>(this.detailsEndpoint.meals + id)
      : this.http.get<ApiResponse>(this.detailsEndpoint.drinks + id);
  }

  getCategories(type: string) {
    return type === 'meals'
      ? this.http.get<CategoriesApiResponse>(this.categoriesEndpoint.meals)
      : this.http.get<CategoriesApiResponse>(this.categoriesEndpoint.drinks);
  }

  getRecipesByCategory(type: string, category: string) {
    return type === 'meals'
      ? this.http.get<ApiResponse>(this.byCategoryEndpoint.meals + category)
          .subscribe((response) => this.recipesSub.next(response))
      : this.http.get<ApiResponse>(this.byCategoryEndpoint.drinks + category)
        .subscribe((response) => this.recipesSub.next(response))
  }
}
