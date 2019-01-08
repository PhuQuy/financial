import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { BlogService } from '@app/services/blog.service'
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '@app/services/upload.service';
import { Observable } from 'rxjs/Observable';
import { text } from '@angular/core/src/render3/instructions';
import { DataService } from '@app/services/data.service';
import { from } from 'rxjs';

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
  
    
    people$1 = ['Soccer', 'Jackpack', 'Serial'];
    selectedPeople5 = [];
    items = ['Pizza', 'Pasta', 'Parmesan'];


    blog: any = new Object();
    time = new Date();
    alls: any;
    id: any;

    constructor(private blogService: BlogService, private route: ActivatedRoute, protected uploadService: UploadService, private dataService: DataService) {
        this.route.params.subscribe(params => {
            if (params['id'] != 'create') {
                this.id = params['id'];

            }
        });
        this.alls = this.blogService.getById(this.id);
    }

    ngOnInit() {
        if (this.alls) {
            this.alls.subscribe(blog => {
                if (blog) {
                    this.blog = blog;
                }
            });
        }

        // this.dataService.getPeople().subscribe(res => {
        //     this.people$1 = res
        // });
    }

    createBlog() {

        if (this.id == null) {
            this.blog.time = this.time.getTime();
            this.blogService.create(this.blog);
            this.blog = {};
        }
        else {
            this.blogService.updateWithId(this.blog, this.id);
            alert("Cập nhật thành công")
        }

    }

    detectFiles(event) {
        // this.selectedPhoto = event.target.files;
        // if (event.target.files) {
        let file = event.target.files.item(0);
        console.log(file);
        if (file) {


            //   let data2 = this.uploadService.pushUpload(currentUpload).then(res => {

            //     });
            this.uploadService.pushUpload(file).subscribe(res => {
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
