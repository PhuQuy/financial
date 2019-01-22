import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { configurationState } from '../redux/app.states';
import { Store } from '@ngrx/store';

@Component({
    selector: 'root-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    getState: Observable<any>;
    configuration;
    constructor(private store: Store<any>) {
        this.getState = this.store.select(configurationState);
        this.getState.subscribe((configuration) => {
            this.configuration = configuration;
        });
    }

    ngOnInit() {
    }

}
