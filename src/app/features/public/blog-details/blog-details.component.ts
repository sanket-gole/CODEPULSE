import { Component, inject, input } from '@angular/core';
import { BlogPostServiceService } from '../../bolgpost/services/blog-post-service.service';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-blog-details',
  imports: [DatePipe, MarkdownComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  url =input<string | undefined>();

  blogPostService = inject(BlogPostServiceService);
  blogDetailsRef=this.blogPostService.getBlogPostByUrlHandle(this.url);
  isLoading=this.blogDetailsRef.isLoading;
  blogDetailsResponse=this.blogDetailsRef.value;

}
