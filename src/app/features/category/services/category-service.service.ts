  import { HttpClient, httpResource } from '@angular/common/http';
  import { inject, Inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryServiceService {

    private http = inject(HttpClient);


    private apiBaseUrl=environment.apiBaseUrl;

    addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
    updateCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

    addCategory(category:AddCategoryRequest){
      this.addCategoryStatus.set('loading');
       this.http.post<void>(`${this.apiBaseUrl}/api/categories`,category).subscribe({
      next:()=>{
        this.addCategoryStatus.set('success');
      }
      ,error:(error)=>{
        this.addCategoryStatus.set('error');
      }
    });
    }

    getAllCategories(){
     return httpResource<Category[]>(()=>`${this.apiBaseUrl}/api/categories`);
    }

    getCategoryById(id:InputSignal<string |undefined>){
      return httpResource<Category>(()=>`${this.apiBaseUrl}/api/categories/${id()}`);
    }

    updateCategory(id:string, updateCategoryRequestDto:UpdateCategoryRequest){
      this.updateCategoryStatus.set('loading');
      this.http.put<void>(`${this.apiBaseUrl}/api/categories/${id}`,updateCategoryRequestDto).subscribe({
        next:()=>{
          console.log('Category updated successfully');
          this.updateCategoryStatus.set('success');
        }
        ,error:(error)=>{
          console.error('Error updating category:', error);
          this.updateCategoryStatus.set('error');
        }
      });
    }

    deleteCategory(id:string):Observable<void>{
      return this.http.delete<void>(`${this.apiBaseUrl}/api/categories/${id}`);
    }
  } 
