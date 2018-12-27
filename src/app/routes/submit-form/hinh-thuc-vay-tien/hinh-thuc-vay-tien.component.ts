import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hinh-thuc-vay-tien',
  templateUrl: './hinh-thuc-vay-tien.component.html',
  styleUrls: ['./hinh-thuc-vay-tien.component.scss']
})
export class HinhThucVayTienComponent implements OnInit {
title;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
