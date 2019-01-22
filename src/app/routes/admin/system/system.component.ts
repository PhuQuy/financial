import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { SystemService } from '@app/services/system.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@app/modals/confirm/confirm.component';
import { ConfigurationService } from '@app/services/configuration.service';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
    providers: [SystemService, ConfigurationService]
})
export class SystemComponent implements OnInit {
    systems = [];
    breadcrumbs;
    term;
    configuration;
    config: PaginationInstance = {
        id: 'comment',
        itemsPerPage: 10,
        currentPage: 1
    };
    constructor(private systemService: SystemService, private modalService: NgbModal, private configurationService: ConfigurationService) { 
    }

    ngOnInit() {
        this.breadcrumbs = [
            {
                router: '/admin',
                title: 'Home'
            },
            {
                router: '/admin/system',
                title: 'System Management'
            }
        ];

        this.loadSystems();
        this.loadConfiguration();
    }

    loadSystems() {
        this.systemService.getAlls().subscribe(systems => {
            this.systems = systems;
        })
    }

    loadConfiguration() {
        this.configurationService.getAlls().subscribe(configurations => {
            if (configurations && configurations.length > 0) {
                this.configuration = configurations[0];
                console.log(this.configuration);
                
            } else {
                this.configuration = new Object();
            }
        })
    }

    saveConfiguration() {
        this.configurationService.updateOrCreate(this.configuration);
    }

    open(id) {
        const modalRef = this.modalService.open(ConfirmComponent, { centered: true });
        modalRef.componentInstance.title = 'Xác nhận xóa';
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.question = 'Bạn có chắc chắn xóa không?';
        modalRef.componentInstance.confirmText = 'Xóa';

        modalRef.result.then((id) => {
            this.systemService.deleteById(id);
        }, () => { })
    }

    setItemPerpage(page) {
        this.config.itemsPerPage = page;
    }
}
