import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Seat } from 'src/app/models/seat';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  private dataTransferSubject = new Subject<Seat[]>()
  dataTransferObservable = this.dataTransferSubject.asObservable();
  
  constructor() { }

  push(data: Seat[]) {
    this.dataTransferSubject.next(data);
  }
}
