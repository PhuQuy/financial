import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '@app/services/chat.service';
import * as moment from 'moment';

@Component({
    selector: 'app-chat-manage',
    templateUrl: './chat-manage.component.html',
    styleUrls: ['./chat-manage.component.scss'],
    providers: [ChatService]
})
export class ChatManageComponent implements OnInit {
    chats = [];
    currentChat: any;
    message = "";
    term = '';
    chatId;
    @ViewChild('chatList') chatList: ElementRef;

    constructor(protected chatService: ChatService) {
        chatService.getAlls().subscribe(chats => {
            this.chats = chats;
            this.chats.map(chat => {
                chat.time = this.getDiffDate(chat);
                chat.isHours = false;
            })
            if (chats.length > 0) {
                this.setChat(chats[0].id);
            }
        })
    }

    ngOnInit() {
    }

    setChat(id) {
        this.chatId = id;
        this.chatService.getById(id).subscribe(chat => {
            chat.time = this.getDiffDate(chat);
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
                createdAt: moment(new Date()).format(),
                isAdmin: true
            }
            this.currentChat.contents.push(messageContent);
            this.chatService.updateElement(this.chatId, this.currentChat);
        }
        this.message = '';

    }

    getDiffDate(chat) {
        let latest = moment(chat.contents[chat.contents.length - 1].createdAt);
        let diff = -latest.diff(moment.now(), 'minutes');
        let result = moment.duration({"minutes": diff}).humanize();
        return result;

    }
}
