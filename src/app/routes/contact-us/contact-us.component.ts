import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss']
})


export class ContactUsComponent implements OnInit {
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

interface marker {
	lat: number;
	lng: number;
	label?: string;
    draggable: boolean;
    icon: string;
}