import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-not-submit',
  templateUrl: './confirm-not-submit.component.html',
  styleUrls: ['./confirm-not-submit.component.scss']
})
export class ConfirmNotSubmitComponent implements OnInit {

  title;
  question;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
