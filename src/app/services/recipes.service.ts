import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../models/Meal';
import { Drink } from '../models/Drink';

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

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.endpoint);
  }
}
