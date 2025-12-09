import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryServiceService } from '../services/category-service.service';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  private categoryService = inject(CategoryServiceService);
  private getAllcategoriesRef=this.categoryService.getAllCategories();

  isLoding=this.getAllcategoriesRef.isLoading;
  isError=this.getAllcategoriesRef.error;
  values=this.getAllcategoriesRef.value;

}
