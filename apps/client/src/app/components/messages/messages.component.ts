import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'push-server-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  private messageControl: FormControl;
  public formGroup: FormGroup;
  private messageController: AbstractControl;
  //public result: string;

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder) {
    this.messageControl = new FormControl();
    this.formGroup = this.formBuilder.group({
      messageInput: ['']
    });
    this.messageController = this.formGroup.get('messageInput') as FormControl;
  }

  ngOnInit(): void {
  }
  getMessage(): string {
    return this.messageService.getMessage()
  }

  postMessage(): void {
    this.messageService.postMessage(this.messageController.value);
  }



}
