import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from "@google/generative-ai";

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() friendName = 'Friend';
  isMinimized = false;
  messages: { text: string; type: 'user' | 'friend' }[] = [];
  newMessage = '';
  currentTime = '';
  friendTime = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getCurrentTime();
  }

  getCurrentTime() {
    this.currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    this.friendTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow a new line
        return;
      } else {
        // Prevent default behavior and send the message
        event.preventDefault();
        this.sendMessage();
        this.newMessage = '';
      }
    }
  }

  get isOpen() {
    const chat = this.chatService.activeChats.find(chat => chat.friendName === this.friendName);
    return chat ? chat.isOpen : false;
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;

    const chatBox = document.querySelector('.chat-box');
    if (this.isMinimized) {
      chatBox?.classList.add('minimized');
    } else {
      chatBox?.classList.remove('minimized');
    }
  }

  closeChat() {
    this.chatService.closeChat(this.friendName);
  }

  // Gemini Chatbot
  async spaceAI(inputText: string) {
    const genAI = new GoogleGenerativeAI("AIzaSyBZ5SejlO3HeEj_aL_t76st9X5qgWIbxNI");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const result = await model.generateContent(inputText);
    return result.response.text();
  }

  async sendMessage() {
    // Chat with friends
    if (this.friendName !== 'Space AI') {
      if (this.newMessage.trim()) {
        this.messages.push({ text: this.newMessage, type: 'user' });
        this.newMessage = '';

        this.getCurrentTime();
        setTimeout(() => {
          this.messages.push({ text: 'I love you!', type: 'friend' });
        }, 1000);
      }
    
    // Chat with Space AI
    } else if (this.friendName === 'Space AI') {
      if (this.newMessage.trim()) {
        this.messages.push({ text: this.newMessage, type: 'user' });
        const userMessage = this.newMessage;
        this.newMessage = '';
        this.getCurrentTime();

        try {
          const spaceAIText = await this.spaceAI(userMessage);
          this.messages.push({ text: spaceAIText, type: 'friend' });
        } catch (error) {
          console.error('Error while generating AI response:', error);
        }
      }
    }
  }

}

