import { Pipe, PipeTransform } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';

@Pipe({name: 'decrypt'})
export class DecryptPhone implements PipeTransform{
    encrypt;
    constructor(){
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);
    }
    transform(phone: string) {
        phone = this.encrypt.decrypt(phone);
        return phone;
    }
}