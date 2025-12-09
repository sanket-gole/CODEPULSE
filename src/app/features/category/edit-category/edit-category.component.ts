import { Component, effect, inject, input } from '@angular/core';
import { CategoryServiceService } from '../services/category-service.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  
})
export class EditCategoryComponent {

  constructor(){
    effect(()=>{
      if(this.categoryService.updateCategoryStatus() ==='success'){
        alert('Category updated successfully!');
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigateByUrl('/admin/categories'); 
      }
      if(this.categoryService.updateCategoryStatus() ==='error'){
        alert('Error occurred while updating category. Please try again.');
      }
    })
  }

  id =input<string>();
  private categoryService=inject(CategoryServiceService);

  categoryResourceRef =this.categoryService.getCategoryById(this.id);
  categoryResponse =this.categoryResourceRef.value;
  private router=inject(Router);

    editCategoryFormGroup =new FormGroup({
    name:new FormControl<string>("",{nonNullable:true,validators:[Validators.required, Validators.minLength(3), Validators.maxLength(250)]}),
    urlHandle:new FormControl<string>("",{nonNullable:true,validators:[Validators.required, Validators.minLength(3), Validators.maxLength(250)]})
  })

  get nameFormControl(){
    return this.editCategoryFormGroup.controls.name ;
  }

  get urlHandleFormControl(){
    return this.editCategoryFormGroup.controls.urlHandle ;
  }

  effectRef =effect(()=>{
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name??'')
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle??'')
  })

  onSubmit(){

    const id=this.id();
    if(!this.editCategoryFormGroup.valid || !id){
      return;
    }

    const formValue = this.editCategoryFormGroup.getRawValue();
    const updateCategoryRequestDto:UpdateCategoryRequest={
      name:formValue.name,
      urlHandle:formValue.urlHandle
    };
    this.categoryService.updateCategory(id,updateCategoryRequestDto);
  }

  deleteCategory(){
    const id=this.id();
    if(!id){
      return;
    }
    this.categoryService.deleteCategory(id).subscribe({
      next:()=>{
        alert('Category deleted successfully!');
        this.router.navigateByUrl('/admin/categories');
      },
      error:(error)=>{
        alert('Error occurred while deleting category. Please try again.');
      }
    });
  }
}
