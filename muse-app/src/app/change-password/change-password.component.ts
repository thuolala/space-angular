import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.updateTitle('Change Password?');
  }

  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Home
  home() {
    this.router.navigate(['']);
  }

  // Back to login
  // Change password
  login() {
    this.router.navigate(['/login']);
  }
}
