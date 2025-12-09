import { Component, inject } from '@angular/core';
import { BlogPostServiceService } from '../../bolgpost/services/blog-post-service.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  blogPostService = inject(BlogPostServiceService);

  blogPostRef=this.blogPostService.getAllBlogPosts();
  isLoading=this.blogPostRef.isLoading;
  blogPostReasponse=this.blogPostRef.value;
}
