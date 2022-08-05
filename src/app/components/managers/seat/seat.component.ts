import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Seat } from 'src/app/models/seat';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';

interface SeatStatus {
  name: string, 
  value: string
};
export interface DialogData {
  title: string;
  seatKey: string;
  data: Seat;
};
@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})

export class SeatComponent implements OnInit {
  seatStatus: SeatStatus[] = [
    {name: "Free", value: "Free"},
    {name: "Booked", value: "Booked"}
  ];
  title: string = "Create";
  key: string = "";
  formFilled: Seat | undefined;
  seatForm = new FormGroup(
    {
      seatnumber: new FormControl(0, Validators.required),
      seatlocation: new FormControl('', [Validators.required]),
      status: new FormControl(this.seatStatus[0].value, [Validators.required]),
      start: new FormControl(''),
      end: new FormControl(''),
      bookeremail: new FormControl('',[ Validators.required, Validators.email]),
    }
  );
  constructor(private requests: AllRequestsService,
              private toast: HotToastService,
              public dialogRef: MatDialogRef<SeatComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.title = data.title;
    if(data && data.data) {
      this.key = data.seatKey;
      this.formFilled = data.data;
      this.seatForm.controls['seatnumber'].setValue(this.formFilled.seatnumber);
      this.seatForm.controls['seatlocation'].setValue(this.formFilled.seatlocation);
      this.seatForm.controls['status'].setValue(this.formFilled.status);
      this.seatForm.controls['start'].setValue(this.formFilled.start);
      this.seatForm.controls['end'].setValue(this.formFilled.end);
      this.seatForm.controls['bookeremail'].setValue(this.formFilled.bookeremail);
    }
  }

  ngOnInit(): void {
  }

  get seatnumber() {
    return this.seatForm.get('seatnumber');
  }

  get seatlocation() {
    return this.seatForm.get('seatlocation');
  }

  get status() {
    return this.seatForm.get('status');
  }

  get start() {
    return this.seatForm.get('start');
  }

  get end() {
    return this.seatForm.get('end');
  }

  get bookerEmail() {
    return this.seatForm.get('bookeremail');
  }

  submit(): void {
    if (!this.seatForm.valid) {
      return;
    }
    const createSeat: Seat = {
      seatnumber: this.seatForm.value.seatnumber?this.seatForm.value.seatnumber:0,
      seatlocation: this.seatForm.value.seatlocation?this.seatForm.value.seatlocation:"",
      status:  this.seatForm.value.status?this.seatForm.value.status:"Free",
      start: this.seatForm.value.start?this.seatForm.value.start:(new Date()).toISOString(),
      end: this.seatForm.value.end?this.seatForm.value.end:(new Date()).toISOString(),
      bookeremail: this.seatForm.value.bookeremail?this.seatForm.value.bookeremail:'',
    }

    if(this.title === "Create") {
      this.requests.createSeat(createSeat).subscribe({
        next: (res: any) => {
          if (res) {
            this.seatForm.reset();
            this.dialogRef.close();
          }
        },
        error: (error) => {this.toast.error(error.message)}
      });
    } else {
      this.requests.updateSeat(this.key, createSeat).subscribe({
        next: (res: any) => {
          if (res) {
            this.seatForm.reset();
            this.dialogRef.close();
          }
        },
        error: (error) => {this.toast.error(error.message)}
      });
    }
  }
}
