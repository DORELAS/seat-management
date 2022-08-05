import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Seat } from 'src/app/models/seat';
import { ProfileUser } from 'src/app/models/user';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';


@Component({
  selector: 'app-user-seats',
  templateUrl: './user-seats.component.html',
  styleUrls: ['./user-seats.component.scss']
})
export class UserSeatsComponent implements OnInit {

  seats: {'seat': Seat, 'key': string}[] = [];
  userBookedSeats: {'seat': Seat, 'key': string}[] = [];
  responseSeat: any;
  user: ProfileUser;
  mybreakpoint:number = 5;
  rowheight: string = '2rem:2rem';
  constructor(private cd: ChangeDetectorRef,
              private requests: AllRequestsService,
              private router: Router,
              private toast: HotToastService,) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.controlSize(window.innerWidth);
    }

  ngOnInit(): void {
    this.getSeats();
  }

  getSeats():void {
    this.seats = [];
    this.responseSeat = [];
    this.toast.loading('Loading...');
    this.requests.getSeats().subscribe({
      next: (response: any) => {
      this.toast.close();
      if(response) {
        this.responseSeat = response;
        for(const key in response) {
          this.seats.push({'seat': response[key], 'key': key});
          this.cd.detectChanges();
          if(response[key].bookeremail === this.user.email) {
            this.userBookedSeats.push({'seat': response[key], 'key': key});
          }
        }
      }
    },
    error: (error) => {this.toast.error(error.message)}
    });
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

  navigateDashboard() {
    localStorage.setItem('bookings', JSON.stringify(this.userBookedSeats));
    this.router.navigate(['/user-dashboard']);
  }
}
