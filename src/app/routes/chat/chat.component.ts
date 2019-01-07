import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '@app/services/chat.service';
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers: [ChatService]
})
export class ChatComponent implements OnInit {
    chat: any;
    chatId = 'fifRIsgzkGS3tKfBkLiD';
    message = '';
    @ViewChild('chatList') chatList: ElementRef;

    constructor(private chatService: ChatService) {
        if (this.chatId) {
            chatService.getById(this.chatId).subscribe(chat => {
                this.chat = chat;
                setTimeout(() => {
                    this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
                }, 100);
            })
        }

        // this.createChat('ahihi');
    }

    ngOnInit() {
    }

    createChat(name) {
        let newChat = {
            name: name,
            contents: []
        }
        this.chatService.create(newChat).then(chat => {
            this.chatId = chat.id;
        });
    }

    sendMessage() {
        if (this.chat) {
            let messageContent = {
                value: this.message,
                createdAt: new Date()
            }
            this.chat.contents.push(messageContent);
            this.chatService.updateElement(this.chatId, this.chat);
        }
        this.message = '';
    }
}
