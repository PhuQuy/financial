import { Component, OnInit } from '@angular/core';
import { BlogService } from '@app/services/blog.service'
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '@app/services/upload.service';
// import { UploadService } from '@app/services/upload.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [BlogService, UploadService]
})
export class BlogDetailComponent implements OnInit {
  // selectedPhoto: any;
  // photoName: any;
  // currentUpload: any;
  blog: any = new Object();
  time = new Date();
  alls: any;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private uploadService: UploadService) {
    this.route.params.subscribe(params => {
      if(params['id'] != 'create'){
        this.blog.id = params['id'];

      }
    });
    this.alls = this.blogService.getById(this.blog.id);
  }

  ngOnInit() {
    if (this.alls) {
      this.alls.subscribe(blog => {
        if (blog) {
          this.blog = blog;
        }
      });
    }
  }

  createBlog() {

      this.blog.time = this.time.getTime();
      this.blogService.create(this.blog);
      this.blog = {};

  }

  detectFiles(event) {
    // this.selectedPhoto = event.target.files;
    // if (event.target.files) {
      let file = event.target.files.item(0);
      let currentUpload = new Object(file);
      console.log(file);
          if (file) {


      let data2 = this.uploadService.pushUpload(currentUpload).then(res => {
        this.blog.picture = res;
        console.log(res);
        
        });
    } 
      
    //   this.selectedPhoto = file;
    //   this.photoName = file.name;
    // }
    // this.uploadSingle();
  }
  // uploadSingle() {
  //   let file = this.selectedPhoto;
  //   if (file) {
  //     this.
  //     let data2 = this.uploadService.pushUpload(this.currentUpload.photoName).then(res => {
  //       this.blog.picture = res;
  //       });
  //   } 
  // }
}
