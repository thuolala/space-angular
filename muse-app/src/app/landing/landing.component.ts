import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.updateTitle('Welcome to Space!');
  }

  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Home
  home() {
    this.router.navigate(['']);
  }

  // Login
  login() {
    this.router.navigate(['/login']);
  }

  // Logout
  signup() {
    this.router.navigate(['/signup']);
  }
}
