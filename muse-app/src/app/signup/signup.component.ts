import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SignupComponent {
  constructor(private titleService: Title, private router: Router) { }

  // months: number[] = Array.from({ length: 12 }, (_, i) => i + 1); 
  // days: number[] = []; 
  // years: number[] = Array.from({ length: 125 }, (_, i) => new Date().getFullYear() - i); 

  // selectedDay: number = 1; 
  // selectedMonth: number = 1; 
  // selectedYear: number = new Date().getFullYear(); 

  // updateDays() {
  //   const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
  //   this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  // }

  ngOnInit() {
    this.updateTitle('Create a new Space account');
    // this.updateDays();
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
}
