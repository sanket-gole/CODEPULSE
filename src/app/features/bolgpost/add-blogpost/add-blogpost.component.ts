import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogPostServiceService } from '../services/blog-post-service.service';
import { AddblogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryServiceService } from '../../category/services/category-service.service';
import { ImageSelectorServiceService } from '../../../shared/services/image-selector-service.service';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule, ReactiveFormsModule, MarkdownComponent, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css',
})
export class AddBlogpostComponent {

 
  blogPostService=inject(BlogPostServiceService)
  categoryService=inject(CategoryServiceService)
  router=inject(Router);

  imageSelectorService=inject(ImageSelectorServiceService)

  private categoriesResourceRef=this.categoryService.getAllCategories();
  categoriesResponse=this.categoriesResourceRef.value;


  addBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.min(5),
      ],
    }),
    shortDiscription: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(300),
        Validators.min(5),
      ],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(5)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.min(1),
      ],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),

    categories:new FormControl<string[]>([])
  });


  onSubmit(){
    const formRawValue=this.addBlogPostForm.getRawValue();
    const requestDto:AddblogPostRequest={
       title:formRawValue.title,
       shortDescription:formRawValue.shortDiscription,
       content:formRawValue.content,
       author:formRawValue.author,
       featuredImageUrl:formRawValue.featuredImageUrl,
       isVisible:formRawValue.isVisible,
       urlHandle:formRawValue.urlHandle,
       publishedDate:new Date(formRawValue.publishedDate),
        categories:formRawValue.categories ??[]

    }
    this.blogPostService.createBlogPost(requestDto).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigate(['/admin/blogposts'])

      },
      error:()=>{
           console.error("Something went wrong")
      }
    })
    
  }
//    openImageSelector() {
//  this.imageSelectorService.displayImageSelector();
// }
  selectedImageEffectRef=effect(()=>{
    const selectedImageUrl=this.imageSelectorService.selectedImage();
    if(selectedImageUrl){
      this.addBlogPostForm.patchValue({
        featuredImageUrl:selectedImageUrl
      })
    }
  })

}
 