import { messageURL } from './../../shared/url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private message: string = '';
    constructor(private http: HttpClient) {
    }

    getMessage(): string {
        return this.message;
    }
    setMessage(message: string) {
        this.message = message;
    }
    postMessage(data: string) {
        console.log(data);
      this.http.post(messageURL, {
          data
      }).subscribe(response => {
          console.log(response);
          this.message = 'Message Created SuccessFully!!!'
      })
    }
}