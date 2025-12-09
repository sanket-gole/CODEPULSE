import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostServiceService } from '../services/blog-post-service.service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent {

  blogPostService=inject(BlogPostServiceService);

  getAllBlogPostref =this.blogPostService.getAllBlogPosts();

  isLoding=this.getAllBlogPostref.isLoading;
  error=this.getAllBlogPostref.error;
  response=this.getAllBlogPostref.value;
  statusCode=this.getAllBlogPostref.statusCode;

}
