import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  title?: string;
  showSearchBar = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.children[0].url.join('') === 'meals') {
      this.title = 'Meals';
    } else {
      this.title = 'Drinks';
    }
  }

  changeTitle(title: string) {
    this.title = title;
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

}
