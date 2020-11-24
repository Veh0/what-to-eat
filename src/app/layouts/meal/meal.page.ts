import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MEALDB_Meal } from 'src/app/model';
import { MealdbApiService } from 'src/app/services/mealdb/mealdb-api.service';
import { tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealId:string;
  meal$:Observable<MEALDB_Meal>;
  ingredients:string[];
  measures:string[];

  constructor(
    private route:ActivatedRoute,
    private mealdb:MealdbApiService,
    private sanitizer:DomSanitizer
  ) {
      this.mealId = this.route.snapshot.paramMap.get("id");
      this.meal$ = this.mealdb
        .getMealById(this.mealId)
        .pipe(
          tap((meal:MEALDB_Meal) => {
            this.ingredients = this.getIngredientsArray(meal);
            this.measures = this.getMeasuresArray(meal);
            //console.log(this.ingredients);
          })
        );
          
  }

  ngOnInit() {
  }

  getYTLink(meal:MEALDB_Meal): SafeResourceUrl {
    let id = meal.strYoutube.split('=')[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://youtube.com/embed/"+id)
  }

  getIngredientsArray(meal:MEALDB_Meal): string[] {
    let result:string[] = [];

    for (let i = 1; i <= 20; i++) {
      let value = meal["strIngredient"+i];

      if(value != '') result.push(value);
      
    }

    return result;
  }

  getMeasuresArray(meal:MEALDB_Meal): string[] {
    let result:string[] = [];

    for (let i = 1; i <= 20; i++) {
      let value = meal["strMeasure"+i];

      if(value != '') result.push(value);
      
    }

    return result;
  }

}
