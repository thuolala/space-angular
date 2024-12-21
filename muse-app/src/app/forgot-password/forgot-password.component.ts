import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.updateTitle('Forgot Password?');
  }

  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Home
  home(){
    this.router.navigate(['']);
  }

  // Change password
  changePass(){
    this.router.navigate(['/change-password']);
  }
}
