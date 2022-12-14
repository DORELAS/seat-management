import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Seat } from 'src/app/models/seat';
import { ProfileUser } from 'src/app/models/user';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';

@Component({
  selector: 'app-seat-detailed',
  templateUrl: './seat-detailed.component.html',
  styleUrls: ['./seat-detailed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatDetailedComponent implements OnInit {
  @Input() seat: any;
  user: ProfileUser;
  constructor(private requests: AllRequestsService,
              private cd: ChangeDetectorRef,
              private router: Router,
              private toast: HotToastService,) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
  }

  bookSeat(seat: any) {
    const createSeat: Seat = {
      seatnumber: seat.seat.seatnumber,
      seatlocation: seat.seat.seatlocation,
      status: "Booked",
      start: seat.seat.start,
      end: seat.seat.end,
      bookeremail: this.user.email,
    }
    this.requests.updateSeat(seat.key, createSeat).subscribe({
        next: (response) => {
          this.seat.seat.status = "Booked";
          this.cd.detectChanges();
        },
        error: (error) => {this.toast.error(error.message)}
    });
  }

  seatSelected(seat: Seat) {
    this.router.navigate(['/seat-selected', seat]);
  }
}
