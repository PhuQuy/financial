import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lai-suat',
  templateUrl: './lai-suat.component.html',
  styleUrls: ['./lai-suat.component.scss']
})
export class LaiSuatComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  // confirm(value) {
  //   this.activeModal.close(value);
  // }

}
