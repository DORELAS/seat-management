import { Component, OnInit } from '@angular/core';
import { Seat } from 'src/app/models/seat';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
  seats: {'seat': Seat, 'key': string}[] = [];
  mybreakpoint:number = 5;
  load = Promise.resolve(false);
  rowheight: string = '2rem:2rem';
  constructor(private authService: AuthService,
  ) {this.controlSize(window.innerWidth);}

  ngOnInit() {
    this.seats = JSON.parse(localStorage.getItem('bookings')!);
    console.log(this.seats);
  }

  handleSize(event: any) {
    this.controlSize(event.target.innerWidth);
  }

  controlSize(size: number) {
    if(size > 1300) {
      this.mybreakpoint = 5;
      this.rowheight = '2rem:2rem';
    } else if (size <= 1300 &&  size > 850) {
      this.mybreakpoint = 4;
      this.rowheight = '2rem:2rem';
    } else if (size <= 850 && size > 650) {
      this.mybreakpoint = 3;
      this.rowheight = '2rem:2rem';
    } else if (size <= 650 && size > 450) {
      this.mybreakpoint = 2;
      this.rowheight = '2rem:2rem';
    } else if (size <= 450) {
      this.mybreakpoint = 1;
      this.rowheight = '2rem:1rem';
    }
  }

  logout():void {
    this.authService.logout();
  }
}
