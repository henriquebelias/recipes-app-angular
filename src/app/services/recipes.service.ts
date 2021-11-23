import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const testEndpoint = 'http://localhost:5000/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  endpoint = testEndpoint;

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get(this.endpoint);
  }
}
