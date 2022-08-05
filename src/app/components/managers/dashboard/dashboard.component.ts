import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import * as _ from 'lodash';
import { Seat } from 'src/app/models/seat';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  seats: Seat[] = [];
  full_seats: Seat[] = [];
  filteredSeats: Seat[] = [];
  responseSeat: any;
  seatControl: FormControl = new FormControl();
  seatFilter: FormControl = new FormControl();
  mybreakpoint:number = 5; 
  rowheight: string = '2rem:2rem';
  constructor(public dialog: MatDialog,
              private toast: HotToastService,
              private authService: AuthService,
              private cd:ChangeDetectorRef,
              private requests: AllRequestsService,
            ) { 
              this.getSeats();
            }

  ngOnInit(): void {
    this.controlSize(window.innerWidth);
  }

  openSeat(title:string, data: Seat|null):void {
    let seatKey = "";
    for(const key in this.responseSeat) {
      if (_.isEqual(data, this.responseSeat[key])) {
        seatKey = key;
      }
    }
    const dialogRef = this.dialog.open(SeatComponent, {
      width: '500px',
      data: {title, seatKey, data}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getSeats();
    });
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
            this.seats.push(response[key]);
            this.full_seats.push(response[key]);
            this.cd.detectChanges();
          }
        }
      },
      error: (error) => {this.toast.error(error.message)}
    });
  }

  deleteSeat(item:any):void {
    for(const key in this.responseSeat) {
      if(_.isEqual(item, this.responseSeat[key])) {
        this.toast.loading('Loading...');
        this.requests.deleteSeat(key.toString()).subscribe({
          next: (response: any) => {
            this.toast.close();
            if(response) {
              this.getSeats();
            }
          },
          error: (error) => {this.toast.error(error.message)}
        });
      }
    }
  }

  filterMyOptions(event: Event):void {
    if(event) {
      this.filteredSeats = [];
      this.toast.loading('Loading...');
      for(let seat of this.seats) {
        if(((seat.seatnumber).toString()).includes(event.toString())) {
          this.filteredSeats.push(seat);
        }
      }
    }
    this.toast.close();
    this.filterSeat();
  }

  changeDateEvent(event: any):void {
    if(event.value) {
      this.filteredSeats = [];
      this.toast.loading('Loading...');
      for(let seat of this.seats) {
        if(((seat.start).toString()) === (event.value).toISOString() 
        || ((seat.end).toString()) === (event.value).toISOString()) {
          this.filteredSeats.push(seat);
        }
      }
    }
    this.toast.close();
    this.filterSeat();
  }

  filterSeat() {
    if (this.filteredSeats.length > 0) {
      this.seats = this.filteredSeats;
    } else {
      this.seats = this.full_seats;
    }
  }

  logout():void {
    this.authService.logout();
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
}
