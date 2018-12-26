import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
    // myform: FormGroup = new FormGroup({
    //     email: new FormControl('', [
    //         Validators.required,
    //         Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    //     ]),
    //     name: new FormControl('', [
    //         Validators.required
    //     ]),
    //     message: new FormControl('', [
    //         Validators.required
    //     ])
    // });;

    myform;
    constructor(private fb: FormBuilder) {
        this.myform = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
            'message': ''
        });

    }

    ngOnInit() {
    }


    sendMessage(value) {
        console.log(value);

    }

}
