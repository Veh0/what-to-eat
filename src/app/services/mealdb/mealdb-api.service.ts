import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { threadId } from 'worker_threads';
import { map } from 'rxjs/operators';
import { MEALDB_Category, MEALDB_ListItem } from 'src/app/model';

const MEALDB_API = {
    ROOT: 'https://www.themealdb.com/api/json/v1/1/',
    get FILTER() {
      return this.ROOT + "filter.php?c=";
    },
    get LOOKUP() {
      return this.ROOT + "lookup.php?i="
    },
    get CATEGORIES() {
      return this.ROOT + "categories.php"
    }
}

  @Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  

  constructor(private http:HttpClient) { }

  getCategories() {
    return this.http
      .get(MEALDB_API.CATEGORIES)
      .pipe(
        map((res:any) => res.categories)
      );
  }

  getMealsByCategory(category:string): Observable<MEALDB_ListItem[]> {
    return this.http
      .get(MEALDB_API.FILTER + category)
      .pipe(
        map((res:any) => res.meals)
      );
  }

  getMealById(id:string) {
    return this.http
      .get(MEALDB_API.LOOKUP+id)
      .pipe(
        map((res:any) => res.meals[0])
      )
  }
}
