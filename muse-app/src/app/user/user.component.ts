import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { StoryModalComponent } from '../components/story-modal/story-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListenModalComponent } from '../components/listen-modal/listen-modal.component';

@Component({
  selector: 'app-user',
  imports: [StoryModalComponent, ListenModalComponent , NgxSpinnerModule, HttpClientModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  searchResults: any[] = [];
  apiKey: string = 'AIzaSyBlerfhExaaMmLKL2FA3h2Zl7h9aIseYn8';
  @ViewChild('storyModal') storyModal!: StoryModalComponent;
  newStory: string = '';

  constructor(private titleService: Title, private router: Router, private modalService: ModalService, 
              private spinner: NgxSpinnerService, private http: HttpClient) { }

  ngOnInit() {
    this.updateTitle('User');

    /** Spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** Spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500); // Remember to change to suitable ms 
  }

  ngDoCheck() {
    // New story 
    this.newStory = this.storyModal?.img;
    console.log(this.newStory);

    const imageStory = document.getElementById('newStory');
    if(imageStory){
      imageStory.innerHTML = this.newStory;
    }
  }

  // onDataChange(img: string) {
  //   // New story 
  //   this.newStory = img;
  // }

  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Home
  homePage() {
    this.router.navigate(['/home']);
  }

  // Login
  login() {
    this.router.navigate(['/login']);
  }

  // Logout
  signup() {
    this.router.navigate(['/signup']);
  }

  // Message
  message() {

  }

  // User Profile
  profile() {

  }

  // Live
  live() {

  }

  // Media 
  media() {

  }

  // Create new story 
  openModal(modalId: string) {
    this.modalService.openModal(modalId);
  }

  // Youtube video
  onSearch(query: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${this.apiKey}&maxResults=20`;
    this.http.get(url).subscribe((response: any) => {
      this.searchResults = response.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url
      }));
    });
  }

  playVideo(videoId: string) {
    const playerDiv = document.getElementById('videoPlayer');
    if (playerDiv) {
      playerDiv.innerHTML = `
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>`;
    }
  }
}
