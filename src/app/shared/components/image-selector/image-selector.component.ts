import { Component, inject, signal } from '@angular/core';
import { ImageSelectorServiceService } from '../../services/image-selector-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogImage } from '../../models/image.model';

@Component({
  selector: 'app-image-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {
  private imageSelectorService=inject(ImageSelectorServiceService)

  showImageSelector=this.imageSelectorService.showImageSelector.asReadonly();  
 id=signal<string | undefined>(undefined);
  imagesRef =this.imageSelectorService.getAllImages(this.id);
  isLoading=this.imagesRef.isLoading;
  images=this.imagesRef.value;

 


  imageSelectorUploadForm = new FormGroup({
    file:new FormControl<File | null | undefined>(null,{
      nonNullable:true,
      validators:[Validators.required],

    }),
    name:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required],
    }),
    title:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required],
    }),
  })
  hideImageSelector(){
    this.imageSelectorService.hideImageSelector();
  }

  onFileSelected(event:Event){
    const input=   event.target as HTMLInputElement;
    if(!input.files || input.files.length===0){
      return;
    }

    const file=input.files[0];
    this.imageSelectorUploadForm.patchValue({
      file:file
    })
  }

  onSelectImage(image:BlogImage){
    this.imageSelectorService.selectImage(image.url);
  }

  onSubmit(){
    if(this.imageSelectorUploadForm.valid){
      const formRawValue=this.imageSelectorUploadForm.getRawValue();
      // console.log(formRawValue);
      this.imageSelectorService.uploadImage(formRawValue.file!,formRawValue.name,formRawValue.title).subscribe({
        next:(response)=>{
          // console.log('Image uploaded successfully:',response);
          this.id.set(response.id);
          this.imageSelectorUploadForm.reset();
          // this.hideImageSelector();

        }
        ,error:(error)=>{
          console.error('Error uploading image:',error);
        }
      })
    }
  }
}
 