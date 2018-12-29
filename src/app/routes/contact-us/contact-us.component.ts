import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '@app/services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmNotSubmitComponent } from '@app/modals/confirm/confirm-not-submit/confirm-not-submit.component';


@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./contact-us.component.scss'],
    providers: [ContactService]
})
export class ContactUsComponent implements OnInit {
    contact: any = new Object();
    local;
    lat: number = 10.880319;
    lng: number = 106.794486;
    icon = {
        url: '../../../assets/images/local.png',
        scaledSize: {
            width: 40,
            height: 60
        }
    };

    markers: marker[] = [
        {
            lat: 10.880319,
            lng: 106.794486,
            label: 'A',
            draggable: true,
            icon: '../../../assets/images/local.png',
        }
    ];
    styles = [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "hue": "#ffb500"
                },
                {
                    "lightness": "54"
                },
                {
                    "saturation": "-61"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];
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

    myform: FormGroup;
    name: FormControl; 
    email: FormControl;
    message: FormControl;

    constructor(private fb: FormBuilder, private contactService: ContactService, private modalService: NgbModal) {
        this.myform = this.fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
            'message': ''
        });

    }


    ngOnInit() {

        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.name = new FormControl('', [
            Validators.minLength(1),
            Validators.required
        ]);
        this.email = new FormControl('', [ 
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) 
        ]);
        this.message = new FormControl('', [
            Validators.minLength(1),
            Validators.required
        ]);
    }

    createForm() { 
        this.myform = new FormGroup({
            name: this.name,
            email: this.email,
            message: this.message
        });
    }


    sendMessage(value) {
        if(value) {
            this.contactService.create(value);
            this.myform = this.fb.group({
                'email': [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
                'name': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
                'message': ''
            });
        }

        const modalRef = this.modalService.open(ConfirmNotSubmitComponent, { centered: true });
        modalRef.componentInstance.title = 'Gửi thành công';
        modalRef.componentInstance.question = 'Cám ơn bạn đã liên hệ với chúng tôi!';
        
    }

}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    icon: string;
}