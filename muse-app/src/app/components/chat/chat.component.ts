// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ChatService } from '../../services/chat.service';

// @Component({
//   selector: 'app-chat',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.css'
// })
// export class ChatComponent {
//   @Input() friendName = 'Friend';
//   isOpen = true;
//   isMinimized = false;
//   messages: { text: string; type: 'user' | 'friend' }[] = [];
//   newMessage = '';

//   constructor(private chatService: ChatService) {

//   }

//   toggleMinimize() {
//     this.isMinimized = !this.isMinimized;
//   }

//   closeChat() {
//     this.chatService.closeChat(this.friendName);
//     this.isOpen = false;
//   }

//   sendMessage() {
//     if (this.newMessage.trim()) {
//       this.messages.push({ text: this.newMessage, type: 'user' });
//       this.newMessage = '';
//       // Simulate a reply
//       setTimeout(() => {
//         this.messages.push({ text: 'Hello!', type: 'friend' });
//       }, 1000);
//     }
//   }
// }

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.currentTime = new Date().toLocaleTimeString('en-US', {
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

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, type: 'user' });
      this.newMessage = '';

      this.scrollToBottom();
      setTimeout(() => {
        this.messages.push({ text: 'I love you!', type: 'friend' });
      }, 1000);

    }
  }
}

