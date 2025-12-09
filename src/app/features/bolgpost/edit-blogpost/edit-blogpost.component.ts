import { Component, effect, inject, input } from '@angular/core';
import { BlogPostServiceService } from '../services/blog-post-service.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryServiceService } from '../../category/services/category-service.service';
import { UpdateBlogPostRequest } from '../models/blogpost.model';
import { Router, RouterLink } from '@angular/router';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageSelectorServiceService } from '../../../shared/services/image-selector-service.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, ReactiveFormsModule, MarkdownComponent,ImageSelectorComponent ],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent {

  id=input<string>()

  bolgPostService=inject(BlogPostServiceService)
  categoryService=inject(CategoryServiceService)
  imageSelectorService=inject(ImageSelectorServiceService)

  router=inject(Router)

  private blogPostRef=this.bolgPostService.getBlogPostById(this.id); 
  blogPostResponse =this.blogPostRef.value;

  private categoriesRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesRef.value;

   editBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(5),
      ],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
       
        Validators.minLength(5),
      ],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
     
        Validators.minLength(1),
      ],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
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


  effectRef =effect(()=>{
    if(this.blogPostResponse()){
    this.editBlogPostForm.patchValue({
      title:this.blogPostResponse()?.title,
      shortDescription:this.blogPostResponse()?.shortDescription,
      content:this.blogPostResponse()?.content,
      featuredImageUrl:this.blogPostResponse()?.featuredImageUrl,
      urlHandle:this.blogPostResponse()?.urlHandle,
      author:this.blogPostResponse()?.author,
      publishedDate:new Date(this.blogPostResponse()?.publishedDate!).toISOString().split('T')[0],
      categories:this.blogPostResponse()?.categories.map(category=>category.id) || [],
    })
  }
  })

  selectedImageEffectRef=effect(()=>{
    const selectedImageUrl=this.imageSelectorService.selectedImage();
    if(selectedImageUrl){
      this.editBlogPostForm.patchValue({
        featuredImageUrl:selectedImageUrl
      })
    }
  })

  onSubmit(){
    const id=this.id();

    if(id && this.editBlogPostForm.valid){
       

       const formValue=this.editBlogPostForm.getRawValue(); 

    const updateBlogPostRequest:UpdateBlogPostRequest={

      title:formValue.title,
      shortDescription:formValue.shortDescription,
      content:formValue.content,
      author:formValue.author,
      publishedDate:new Date(formValue.publishedDate),
      isVisible:formValue.isVisible,
      categories:formValue.categories??[],
      featuredImageUrl:formValue.featuredImageUrl,
      urlHandle:formValue.urlHandle,

    }
      console.log("hi");

    this.bolgPostService.editBlogPost(id,updateBlogPostRequest).subscribe({
      next:(response)=>{
        console.log('Blog Post updated successfully',response);
        // this.router.navigate(['admin/blogposts']);
      },
      error:(error)=>{
        console.error('Error updating Blog Post',error);
      }
    })
    }
   
  }

  onDelete(){
    const id=this.id();
    if(id){
      this.bolgPostService.deleteBlogPost(id)
      .subscribe({
        next:(response)=>{
          console.log('Blog Post deleted successfully',response);
          this.router.navigate(['admin/blogposts']);
        },
        error:(error)=>{
          console.error('Error deleting Blog Post',error);
        }
      })   
  }
  }

  openImageSelector(){ 
    this.imageSelectorService.displayImageSelector();
  }
}
