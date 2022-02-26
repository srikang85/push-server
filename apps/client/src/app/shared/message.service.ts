import { UUIDService } from './uuid.service';
import { messageURL } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private message: string = '';
    private serverMessages: string[] = [];
    private eventSource = new EventSource(messageURL);
    constructor(private http: HttpClient, private uuidService: UUIDService) {
        this.uuidService.fetchUUID().subscribe(res => {
            this.eventSource.addEventListener(this.uuidService.getUUID(), (event: any) => {
                this.serverMessages.push(event.data);
                console.log(event.data);
              });            
        });
        // this.eventSource.addEventListener(this.uuidService.getUUID(), (event: any) => {
        //   this.serverMessages.push(event.data);
        //   console.log(event.data);
        // });
    }

    getServerMessage(): string[] {
        return this.serverMessages;
    }
    getSuccessMessage(): string {
        return this.message;
    }
    setSuccessMessage(message: string) {
        this.message = message;
    }
    postMessage(data: MessageType) {
      this.http.post(messageURL, {
          data
      }).subscribe(response => {
          this.message = 'Message Created SuccessFully!!!'
      })
    }

    getMessage(): string[] {
      return this.serverMessages;
    }
}

export interface MessageType {
    message: string;
    client: string;
    timestamp: string
}