import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string | null;

  constructor() {
    this.token = '';
  }

  /**
   * SAVES TE TOKEN INTO THE TOKEN VARIABLE
   * @param value THE DATA TO BE SAVED
   */
  setToken(value: string | null) {
    this.token = value;
  }

  /**
   * RETURNS THE SAVED TOKEN
   */
  getToken() {
    return this.token;
  }
}
