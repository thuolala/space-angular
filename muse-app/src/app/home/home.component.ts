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
import { ChatService } from '../services/chat.service';
import { ChatComponent } from '../components/chat/chat.component';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PostModalComponent } from '../components/post/post-modal.component';

@Component({
  selector: 'app-home',
  imports: [StoryModalComponent, ListenModalComponent, NgxSpinnerModule, HttpClientModule, CommonModule, ChatComponent, PostModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {
  searchResults: any[] = [];
  apiKey: string = 'AIzaSyBlerfhExaaMmLKL2FA3h2Zl7h9aIseYn8';
  @ViewChild('storyModal') storyModal!: StoryModalComponent;

  newStory: string = '';
  friends = ['Space AI', 'Sanji', 'Sylus', 'Nanami Kento', 'Rafayel', 'Zayne', 'Xavier', 'Zhongli', 'Arataki Itto', 'Childe', 'Diluc', 'Roronoa Zoro', 'Jinyuan', 'Blade'];

  filterText = '';

  constructor(private titleService: Title, private router: Router, private modalService: ModalService,
    private spinner: NgxSpinnerService, private http: HttpClient, public chatService: ChatService) { }

  ngOnInit() {
    this.updateTitle('Space');

    /** Spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** Spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500); // Remember to change to suitable ms 

    // Test Chatbot
    // this.spaceAI();
  }

  ngDoCheck() {
    // New story 
    this.newStory = this.storyModal?.img;

    const imageStory = document.getElementById('newStory');
    if (imageStory) {
      imageStory.innerHTML = this.newStory;
    }
  }

  // Gemini Chatbot
  async spaceAI() {
    const genAI = new GoogleGenerativeAI("AIzaSyBZ5SejlO3HeEj_aL_t76st9X5qgWIbxNI");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Explain how AI works";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }

  // Chat
  openChat(friend: string) {
    this.chatService.openChat(friend);

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
    this.router.navigate(['/user']);
  }

  // Post 

  // Live
  live() {

  }

  // Media 
  media() {
    const fileInput = document.getElementById('fileUploadPost') as HTMLInputElement;
    fileInput?.click();
  }

  // Upload picture
  onFileUploadPost(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result); // You can handle the file after it's read
      };
    } else {
      console.error('No file selected');
    }
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
