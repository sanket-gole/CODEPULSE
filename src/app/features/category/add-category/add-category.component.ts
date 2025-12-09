import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryServiceService } from '../services/category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  private router=inject(Router)

  constructor() {
     effect(()=>{
        if(this.categoryService.addCategoryStatus() ==='success'){
          // alert('Category added successfully!');
          // this.addCategoryFormGroup.reset();
          this.categoryService.addCategoryStatus.set('idle');
          this.router.navigateByUrl('/admin/categories');
        }
        if(this.categoryService.addCategoryStatus() ==='error'){
          alert('Error occurred while adding category. Please try again.');
        }
       })
  }

  private categoryService=inject(CategoryServiceService);

  addCategoryFormGroup =new FormGroup({
    name:new FormControl<string>("",{nonNullable:true,validators:[Validators.required, Validators.minLength(3), Validators.maxLength(250)]}),
    urlHandle:new FormControl<string>("",{nonNullable:true,validators:[Validators.required, Validators.minLength(3), Validators.maxLength(250)]})
  })

  get nameFormControl(){
    return this.addCategoryFormGroup.controls.name ;
  }

  get urlHandleFormControl(){
    return this.addCategoryFormGroup.controls.urlHandle ;
  }
  onSubmit(){
     const addCateroryFormValue= this.addCategoryFormGroup.getRawValue();

     const addCategoryRequestDto:AddCategoryRequest={
      name:addCateroryFormValue.name,
      urlHandle:addCateroryFormValue.urlHandle
     }
       this.categoryService.addCategory(addCategoryRequestDto);
      
  };


}
