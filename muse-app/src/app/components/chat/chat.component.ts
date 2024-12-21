import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() friendName = 'Friend';
  isOpen = true;
  isMinimized = false;
  messages: { text: string; type: 'user' | 'friend' }[] = [];
  newMessage = '';

  constructor(private chatService: ChatService) {

  }
  
  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  closeChat() {
    this.chatService.closeChat(this.friendName);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, type: 'user' });
      this.newMessage = '';
      // Simulate a reply
      setTimeout(() => {
        this.messages.push({ text: 'Hello!', type: 'friend' });
      }, 1000);
    }
  }
}
