import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchOptions = [
    {label: 'Ingredient', value: 'ingredient'},
    {label: 'Name', value: 'name'},
    {label: 'First Letter', value:'firstLetter'},
  ];
  type?: string;

  searchForm = this.fb.group({
    searchInput: [null],
    searchOption: [null],
  });

  constructor(private fb: FormBuilder, private recipesSvc: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.children[0].url.subscribe((url) => this.type = url[0].path);
  }

  onSubmit() {
    this.recipesSvc
      .searchRecipes(
        this.searchForm.get('searchOption')?.value,
        this.searchForm.get('searchInput')?.value,
        this.type!
      )
  }

}
