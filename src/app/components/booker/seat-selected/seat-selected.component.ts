import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from 'src/app/models/seat';

@Component({
  selector: 'app-seat-selected',
  templateUrl: './seat-selected.component.html',
  styleUrls: ['./seat-selected.component.scss']
})
export class SeatSelectedComponent implements OnInit {
  seat: Seat | any;
  constructor(private route: ActivatedRoute, private router: Router,) {
    if (this.route.snapshot.params) {
      this.seat = this.route.snapshot.params;
    } else {
      this.router.navigate(['/user-seats']);
    };
  }

  ngOnInit(): void {}

  convertDate(date: string) {
    return new Date(date);
  }

}
