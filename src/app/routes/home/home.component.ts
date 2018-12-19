import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { SeoService } from '@app/services/seo.service';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment.prod';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [SeoService, UserService]
})
export class HomeComponent implements AfterViewInit {
    user: any = new Object();
    encrypt;
    constructor(private seoService: SeoService, private userService: UserService) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPublicKey(environment.publishSSHRASKey);
        
        const hasName = (name) => {
            return { name };
        }

        const canSayHi = (name) => {
            return {
                sayHi: () => `Hello, ${name}`
            }
        }

        const Person = (name) => {
            return {
                ...hasName(name),
                ...canSayHi(name)
            }
        }

        const person = Person('Quy');
        console.log(person.sayHi());


        const orders = [500, 30, 99, 15, 223];
        let ahihi = orders.reduce((acc, cur) => {
            console.log(acc);
            console.log(cur);
            
            return acc;
        });
        
    }

    saveUserLocal(){
        //console.log(this.user);
        localStorage.name = this.user.name;
        localStorage.money = this.user.money;
        localStorage.long = this.user.long;
        localStorage.phone = this.user.phone;
    }


    createUser() {
        // console.log(this.user);
        var encrypted = this.encrypt.encrypt(this.user.phone + '');
        this.user.phone = encrypted;
        this.userService.create(this.user);
        this.user = {};
        console.log(encrypted);

    }

    ngOnInit() {
        this.seoService.generateTags({
            title: 'Vay vốn sinh viên',
            description: 'Vay vốn sinh viên',
            slug: 'home',
            keywords: 'vay von sinh vien'
        });

    }

    ngAfterViewInit() {

    }

}
