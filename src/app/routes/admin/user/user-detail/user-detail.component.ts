import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {
  users:any = new Object();
  id: any;
  alls: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.alls = this.userService.getById(this.id);
  }

  ngOnInit() {
    if (this.alls) {
      this.alls.subscribe(users => {
          this.users = users;
      });
    }
    
    

}

}
