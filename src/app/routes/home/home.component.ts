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
    moneySelected : number;
    longSelected : number;
    moneys:Array<Object> = [
        {num: 500000, title: 'SỐ TIỀN VAY (VNĐ)'},
        {num: 500000, title: '500.000 VNĐ'},
        {num: 1000000, title: '1.000.000 VNĐ'},
        {num: 1500000, title: '1.500.000 VNĐ'},
        {num: 2000000, title: '2.000.000 VNĐ'},
        {num: 2500000, title: '2.500.000 VNĐ'},
        {num: 3000000, title: '3.000.000 VNĐ'},
        {num: 3500000, title: '3.500.000 VNĐ'},
        {num: 4000000, title: '4.000.000 VNĐ'},
        {num: 4500000, title: '4.500.000 VNĐ'},
        {num: 5000000, title: '5.000.000 VNĐ'}
    ];
    
    longs:Array<Object> = [
        {num: 3, title: 'BAO LÂU?'},
        {num: 3, title: '3 Tháng'},
        {num: 6, title: '6 Tháng'},
        {num: 8, title: '8 Tháng'},
        {num: 10, title: '10 Tháng'},
        {num: 12, title: '1 Năm'}
    ];

    constructor(private seoService: SeoService, private userService: UserService) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPublicKey(environment.publishSSHRASKey);

        this.moneySelected = 500000;
        this.user.money = this.moneySelected;
        this.longSelected = 3;
        this.user.long = this.longSelected;
        console.log(typeof this.user.name);
        

        const hasName = (name) => {
            return { name };
        }
        
        const canSayHi = (name) => {
            return {
                sayHi: () => `Hello, ${name}`
            }
        }

        // const Person = (name) => {
        //     return {
        //         ...hasName(name),
        //         ...canSayHi(name)
        //     }
        // }

        // const person = Person('Quy');
        // console.log(person.sayHi());


        // const orders = [500, 30, 99, 15, 223];
        // let ahihi = orders.reduce((acc, cur) => {
        //     console.log(acc);
        //     console.log(cur);
            
        //     return acc;
        // });
        
    }

    selectChange(){
        this.user.money = this.moneySelected;
        this.user.long = this.longSelected;
    }

    saveUserLocal(){
        //console.log(this.user);
        if(typeof this.user.name === "undefined"){
            localStorage.name = '';
        }else{
            localStorage.name = this.user.name;
        }
        if(typeof this.user.phone === "undefined"){
            localStorage.phone = '';
        }else{
            localStorage.phone = this.user.phone;
        }
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
