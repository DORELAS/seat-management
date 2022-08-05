import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, 
              private router: Router,
              private toast: HotToastService,
              private requests: AllRequestsService) {}
  
  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async submit(): Promise<any> {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then((result) => {
      this.loginForm.reset();
      this.toast.loading('Logging in...');
      if (result) {
        this.toast.close();
        this.toast.success('Congrats! You are all signed in');
        this.authService.setUserData(result.user);
        this.requests.getRole(result.user?.uid).subscribe((res) => {
          this.userRoleType(email, res);
        });
      }
    })
    .catch((error) => {
      this.toast.error(error.message);
    });
  }

  userRoleType(email: any, response: any) {
    for(const key in response) {
      if (response[key].role === "Manager" && response[key].email === email) {
        this.router.navigate(['dashboard']);
      } else if (response[key].role === "Booker" && response[key].email === email) {
        this.router.navigate(['user-seats']);
      }
    }
  }
}
