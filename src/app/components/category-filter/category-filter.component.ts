import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';

type Category = {
  strCategory: string
}

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit, OnChanges {
  @Input() type?: string;
  categories?: { name: string, value: string }[];
  @ViewChild('categorySelect') categorySelect?: ElementRef;

  constructor(private recipeSvc: RecipesService) { }

  ngOnInit(): void {
    this.recipeSvc.getCategories(this.type!)
      .subscribe((response) => {
        if (this.type === 'meals') {
          this.categories = response.meals.map(this.mapCategories);
        } else {
          this.categories = response.drinks.map(this.mapCategories);
        }
      });
  }

  ngOnChanges() {
    this.recipeSvc.getCategories(this.type!)
      .subscribe((response) => {
        if (this.type === 'meals') {
          this.categories = response.meals.map(this.mapCategories);
        } else {
          this.categories = response.drinks.map(this.mapCategories);
        }
      });
  }

  mapCategories(category: Category) {
    return {
      name: category.strCategory,
      value: category.strCategory.toLowerCase()
    };
  }

  getRecipesByCategory() {
    const inputValue = this.categorySelect?.nativeElement.value;
    if (inputValue === 'all') {
      this.recipeSvc.getRecipes(this.type!);
    } else {
      this.recipeSvc.getRecipesByCategory(this.type!, inputValue);
    }
  }

}
