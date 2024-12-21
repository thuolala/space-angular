import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.updateTitle('Login to Space');

    // Login with Google 
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "449374744114-v1okj6bjl1dp56i8c38jtskj31qt6rf3.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });

    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );

    // Apply custom class after rendering
    // setTimeout(() => {
    //   this.applyCustomButtonStyle();
    // }, 0);

    // // @ts-ignore
    // google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    this.onGoogleSignIn();

  }

  async handleCredentialResponse(response: any) {
    // Here you can process the Google login response
    console.log('Google response:', response);

    // Simulate verifying the response or extracting user info
    if (response && response.credential) {
      console.log('Google Credential Token:', response.credential);

      // Navigate to the homepage after successful login
      this.homePage();
    } else {
      console.error('Failed to get Google credential.');
    }
  }

  applyCustomButtonStyle() {
    const googleButton = document
      .getElementById("google-button")
      ?.querySelector("button");

    if (googleButton) {
      googleButton.classList.add("btn-google"); // Add your custom class
    }
  }

  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Home
  home() {
    this.router.navigate(['']);
  }

  // Logout
  signup() {
    this.router.navigate(['/signup']);
  }

  // Authentication
  check() {
    return this.homePage();
  }

  // Login with Google 
  onGoogleSignIn() {
    // @ts-ignore
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.error('Google Sign-In prompt was not displayed:', notification.getNotDisplayedReason());
      } else if (notification.isSkippedMoment()) {
        console.warn('Google Sign-In prompt was skipped:', notification.getSkippedReason());
      }
    });

  }

  // Home
  homePage() {
    this.router.navigate(['/home']);
  }
}
