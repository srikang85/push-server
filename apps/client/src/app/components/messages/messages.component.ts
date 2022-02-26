import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'push-server-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public formGroup: FormGroup;
  private messageController: AbstractControl;
  private dataPeristed = false;

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      messageInput: ['']
    });
    this.messageController = this.formGroup.get('messageInput') as FormControl;
  }

  ngOnInit(): void {
    this.messageController.valueChanges.subscribe(text => {
       this.messageService.setMessage('');
    });
  }
  getMessage(): string {
    return this.messageService.getMessage()
  }

  postMessage(): void {
    this.messageService.postMessage(this.messageController.value);
    this.dataPeristed = true;
  }



}
