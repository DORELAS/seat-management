import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Seat } from 'src/app/models/seat';
import { UserRole } from 'src/app/models/user-role';
import { RequestsService } from '../api/requests.service';

@Injectable({
  providedIn: 'root'
})
export class AllRequestsService {

  constructor(private requestService: RequestsService ) { }

  setRole(body: UserRole):Observable<any> {
    return this.requestService.postRequest('user-role.json', body);
  }

  getRole(id: any):Observable<any> {
    return this.requestService.getRequest('user-role.json');
  }

  createSeat(body: Seat):Observable<any> {
    return this.requestService.postRequest('seat.json', body);
  }

  getSeats():Observable<any> {
    return this.requestService.getRequest('seat.json');
  }

  updateSeat(id: string, body: Seat):Observable<any> {
    return this.requestService.patchRequest(`seat/${id}.json`, body);
  }

  deleteSeat(id: string):Observable<any> {
    return this.requestService.deleteRequest(`seat/${id}.json`);
  }
}
