import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '@env/environment';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { configurationState } from '@app/components/redux/app.states';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    providers: [UserService]
})
export class UserDetailComponent implements OnInit {
    user: any = new Object();
    id: any;
    alls: any;
    encrypt;
    breadcrumbs;
    basicDisabled = true;
    otherDisabled = true;
    configuration;
    loinhuan = 0;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.encrypt = new JsEncryptModule.JSEncrypt();
        this.encrypt.setPrivateKey(environment.privateSSHRASKey);
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.store.select(configurationState).subscribe((configuration) => {
            this.configuration = configuration;
        });
    }

    loadUser() {
        this.alls = this.userService.getById(this.id);

        this.alls.subscribe(user => {
            if (!user.status) {
                user.status = 'pending';
            }
            this.user = user;
            console.log(user);
            let createAt = moment.unix(user.createdAt.seconds);
            let estimate = moment.unix(user.createdAt.seconds).add(user.long, 'months');

            let count = estimate.diff(createAt, 'days');
            this.loinhuan = count * this.user.laixuat;

            this.user.phone = this.encrypt.decrypt(this.user.phone);
            this.breadcrumbs = [
                {
                    router: '/admin',
                    title: 'Home'
                },
                {
                    router: '/admin/users',
                    title: 'Users'
                },
                {
                    router: '/admin/users',
                    title: user.name
                }
            ]
        });
    }

    ngOnInit() {
        this.loadUser();
    }

    basicEdit() {
        this.basicDisabled = false;
    }

    otherEdit() {
        this.otherDisabled = false;
    }

    update() {
        this.userService.updateUser(this.id, this.user).then(data => {
            console.log(data);
        });
    }

    cancelBasic() {
        this.basicDisabled = true;
        this.loadUser();
    }

    cancelOther() {
        this.otherDisabled = true;
        this.loadUser();
    }

    updateBasic() {
        this.basicDisabled = true;
        this.update();
    }

    updateOther() {
        this.otherDisabled = true;
        this.update();
    }

    updateStatus(status) {
        this.user.status = status;
        this.update();
    }
}
