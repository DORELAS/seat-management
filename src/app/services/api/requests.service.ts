import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  /**
   * GET THE ELEMENTS NEEDED
   */
  getRequest(endPoint: string, params?: {}): Observable<any> {
    return this.http.get(this.baseUrl + endPoint, {params});
  }

  /**
   * TE REQUEST USED TO POST SOME DATA FOR TH FIRST TIME
   */
  postRequest(endPoint: string, body: {}): Observable<any> {
    return this.http.post<any>(this.baseUrl + endPoint, body);
  }

  /**
   * TE REQUEST USED TO DELETE THE SELECTED ELEMENT
   */
  deleteRequest(endpoint: string, id?: any): Observable<any> {
    return this.http.delete(this.baseUrl + endpoint, id);
  }

  /**
   * TE REQUEST USED TO CHANGE A SELECTED ELEMENT AND CONTROL IT'S INFO
   */
  putRequest(endpoint: string, id: string): Observable<any> {
    return this.http.put(this.baseUrl + endpoint, id);
  }

  /**
 * TE REQUEST USED TO UPDATE A SELECTED ELEMENT AND CONTROL IT'S INFO
 */
  patchRequest(endpoint: string, body: {}): Observable<any> {
    return this.http.patch(this.baseUrl + endpoint, body);
  }
}
