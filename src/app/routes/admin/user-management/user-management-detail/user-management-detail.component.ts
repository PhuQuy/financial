import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '@app/services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '@app/services/upload.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-user-management-detail',
    templateUrl: './user-management-detail.component.html',
    styleUrls: ['./user-management-detail.component.scss'],
    providers: [ManagerService, UploadService]
})
export class UserManagementDetailComponent implements OnInit {
    myform: FormGroup;
    breadcrumbs: any;
    photoURL;
    loadingImage;
    error;
    loading;
    @ViewChild('fileInput') fileInput: ElementRef;
    defaultForm = {
        'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
        'name': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
        'address': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
        'description': null,
        'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(500)])],
        'role': 'manager',
        'photoURL': '',
        'uid': ''
    };
    managerID;
    constructor(private fb: FormBuilder, private managerService: ManagerService, private route: ActivatedRoute,
        protected uploadService: UploadService, private angularFireAuth: AngularFireAuth) {
        this.myform = this.fb.group(this.defaultForm);
        // this.angularFireAuth.database.
        this.route.params.subscribe(params => {
            if (params['id'] != 'create') {
                this.managerID = params['id'];
                this.managerService.getById(this.managerID).subscribe(manager => {
                    manager.id = this.managerID;
                    this.photoURL = manager.photoURL;
                    this.myform.patchValue(manager);
                    this.breadcrumbs = [
                        {
                            router: '/admin',
                            title: 'Home'
                        },
                        {
                            router: '/admin/user-management',
                            title: 'User Management'
                        },
                        {
                            router: '/admin/user-management/' + this.managerID,
                            title: manager.name
                        }
                    ]
                })
            } else {
                this.breadcrumbs = [
                    {
                        router: '/admin',
                        title: 'Home'
                    },
                    {
                        router: '/admin/user-management',
                        title: 'User Management'
                    },
                    {
                        router: '/admin/user-management/create',
                        title: 'Create'
                    }
                ]
            }
        });
    }

    get email() {
        { return this.myform.get('email'); }
    }

    get name() {
        { return this.myform.get('name'); }
    }

    get address() {
        { return this.myform.get('address'); }
    }

    get password() {
        { return this.myform.get('password'); }
    }

    ngOnInit() {
    }

    submit(value) {
        if (this.photoURL) {
            value.photoURL = this.photoURL;
        }
        if (!this.managerID) {
            this.loading = true;
            this.angularFireAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
                .then((user) => {
                    value.uid = user.user.uid;
                    this.afterSubmit(value);
                })
                .catch((e) => {
                    this.error = e;

                    this.loading = false;
                });
        } else {
            value.id = this.managerID;
            this.afterSubmit(value);
        }
    }

    afterSubmit(value) {
        this.loading = true;
        this.managerService.updateOrCreate(value);
        if (!this.managerID) {
            this.myform = this.fb.group(this.defaultForm);
            this.photoURL = '';
        }
        this.loading = false;
    }

    openFileInput() {
        this.fileInput.nativeElement.click();
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        ev.preventDefault();
        var file = ev.dataTransfer.files[0];
        this.uploadImage(file);
    }

    detectFiles(event) {
        let file = event.target.files.item(0);
        this.uploadImage(file);
    }

    uploadImage(file) {
        if (file) {
            this.loadingImage = true;
            this.uploadService.pushUpload(file).subscribe(res => {
                this.photoURL = res;
                this.loadingImage = false;
            });
        }
    }
}
