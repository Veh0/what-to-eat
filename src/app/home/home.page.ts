import { Component } from '@angular/core';
import { MEALDB_Category, MEALDB_ListItem } from '../model';
import { MealdbApiService } from '../services/mealdb/mealdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private meals:MEALDB_ListItem[];
  private categories;
  
  constructor(private mealdb:MealdbApiService) {
    this.getCategoriesArray();
  }

  loadData(e:any) {
    let category = e.target.value;
    this.mealdb.getMealsByCategory(category)
      .subscribe((meals:MEALDB_ListItem[]) => {
        this.meals = meals;
      }); 
  }

  getCategoriesArray() {
    this.mealdb.getCategories()
      .subscribe(categories => {
        console.log(categories);
        this.categories = categories;
      })
  }

}
