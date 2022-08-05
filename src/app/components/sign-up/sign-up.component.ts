import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserRole } from 'src/app/models/user-role';
import { AllRequestsService } from 'src/app/services/all_requests/all-requests.service';
import { AuthService } from 'src/app/services/auth/auth.service';

interface Role {
  name: string, 
  value: string
};

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  userRoles: Role[] = [
    {name: "Booker", value: "Booker"},
    {name: "Manager", value: "Manager"}
  ]

  signUpForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl(this.userRoles[0].value, [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(private authService: AuthService,
              private toast: HotToastService,
              private request: AllRequestsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get role() {
    return this.signUpForm.get('role');
  }

  submit():void {
    if (!this.signUpForm.valid) {
      return;
    }
    const { email, password } = this.signUpForm.value;
    this.authService.signUp(email, password).then((result: any) => {
      this.toast.loading('Signing up...');
      this.signUpForm.reset();
      if (result) {
        this.toast.close();
        this.toast.success('Congrats! You are all signed up');
        const userRole: UserRole = {
          uuid: result.user?.uid,
          email: result.user?.email,
          role: this.signUpForm.value.role ? this.signUpForm.value.role : this.userRoles[0].value
        }
        this.request.setRole(userRole).subscribe((res) => {
          this.router.navigate(['login']);
        });
        
      }
    })
    .catch((error) => {
      this.toast.error(error.message);
    });
  }
}