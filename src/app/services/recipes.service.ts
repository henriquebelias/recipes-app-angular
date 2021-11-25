import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Meal } from '../models/Meal';
import { Drink } from '../models/Drink';
import { basicUrls, searchUrls, detailsUrl } from './endpoints';

const testEndpoint = 'http://localhost:5000/recipes';

interface ApiResponse {
  meals: Meal[],
  drinks: Drink[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  initialEndpoint = testEndpoint;
  searchEndpoint = searchUrls;
  detailsEndpoint = detailsUrl;
  recipesSub: Subject<ApiResponse> = new Subject();

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get<ApiResponse>(this.initialEndpoint).subscribe((response) => {
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

  getDetails(type: string, id: number): Observable<ApiResponse> {
    return type === 'meals'
      ? this.http.get<ApiResponse>(this.detailsEndpoint.meals + id)
      : this.http.get<ApiResponse>(this.detailsEndpoint.drinks + id)
  }
}
