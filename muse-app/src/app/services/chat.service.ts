import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  activeChats: { friendName: string; isOpen: boolean }[] = [];

  openChat(friendName: string) {
    const chat = this.activeChats.find(chat => chat.friendName === friendName);
    if (chat) {
      chat.isOpen = true; // Reopen the chat if it already exists
    } else {
      this.activeChats.push({ friendName, isOpen: true }); // Add a new chat
    }
  }

  closeChat(friendName: string) {
    const chat = this.activeChats.find(chat => chat.friendName === friendName);
    if (chat) {
      chat.isOpen = false;
    }
  }
}
