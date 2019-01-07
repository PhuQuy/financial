import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '@app/services/chat.service';

@Component({
    selector: 'app-chat-manage',
    templateUrl: './chat-manage.component.html',
    styleUrls: ['./chat-manage.component.scss'],
    providers: [ChatService]
})
export class ChatManageComponent implements OnInit {
    chats = [];
    currentChat: any;
    message = '';
    term = '';
    @ViewChild('chatList') chatList: ElementRef;

    constructor(protected chatService: ChatService) {
        chatService.getAlls().subscribe(chats => {
            this.chats = chats;
            if (chats.length > 0) {
                this.setChat(chats[0].id);
            }
        })
    }

    ngOnInit() {
    }

    setChat(id) {
        this.chatService.getById(id).subscribe(chat => {
            this.currentChat = chat;
            setTimeout(() => {
                this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
            }, 100);
        })
    }

    sendMessage() {
        if (this.currentChat) {
            let messageContent = {
                value: this.message,
                createdAt: new Date(),
                isAdmin: true
            }
            this.currentChat.contents.push(messageContent);
            this.chatService.updateElement(this.currentChat.id, this.currentChat);
        }
        this.message = '';

    }
}
