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
        // console.log(encrypted);
        // this.encrypt.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
        // MIICXgIBAAKBgQCplalQEhceQZwp88/Xg7+92jh3GUhcnYfXK6gXRD7KF4JhZlpS
        // 8OX2F1m71gQehHmes2JoQNJDpUtgv2M0M1jt8eLAEcu4tRA+oSY5c5A8t1LAPh4y
        // LutlxO0PsdlmyLWX8octAh194BPM1/NZWaeO4w1/6LdnHOZR9DSyu8ye8QIDAQAB
        // AoGBAIO5pqx1gNOVrxG/OqByzAtSaC3Ky7R1AMEYPhbkgclEfZfegyaNzHJdLOyE
        // juqNiFLHkBbe0vSMfoKF5y7y+42DtBsvP3ohr061Kwmr5ilekDHyyXo2gslwcXgR
        // 7XMo6FFnT1/uFpqq06eNce4XHUrW3gHMPrGIC8raZH6DHMLJAkEA3yJNL4SLBM2e
        // JwuVFuF5sisVMljCI6P4IjtF+It1JTc0sPGpLy9A3sLX+w3PxZQfXCP03rr/dEk4
        // IdZJIopI8wJBAMKQLVkL9idghs6kCWrqTB0dXc67zrAFHiSV9zVCNgolUI+Jq7Sk
        // 340lxtKwzAEvfzyFWCz5cvW4RbukPSpdsYsCQQCtzoFDF0JWfnfHwDzkssNhpi9/
        // pSWsL2fz+im5vZ+FWqg/gC4h4/Pq0Oj91LdYFtYKprNx30Vm5jXEHa+gKQlDAkBI
        // Lea050wdlaDNXmuj/2HXV0Kq5F+sS2nAVuZMGtEjeG5nocJSlOveWEpndXFpay5/
        // zFRG8w/j+sXb8/VBF1s7AkEA3Y+nhnPxj3RclmRrcqzUNQ/TpBZATqTcrHC9dDyb
        // vnnbcy0JbGc+nZzeMNlbvun6t7jcR7TCa/QTpQyPcajXrg==
        // -----END RSA PRIVATE KEY-----
        // `);
        // var uncrypted = this.encrypt.decrypt(encrypted);
        // console.log(uncrypted);

        // userService.getAlls().subscribe(data => {
        //     console.log(data);
            
        // })
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
