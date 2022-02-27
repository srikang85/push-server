import { UUIDService } from './../../shared/uuid.service';
import { secretURL } from './../../shared/url.service';
import { SecretService } from './../../shared/secretService';
import { MessageService } from './../../shared/message.service';
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
  private clientIdController: AbstractControl;

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private secretSerice: SecretService,
    private uuidService: UUIDService) {
    this.formGroup = this.formBuilder.group({
      messageInput: [''],
      clientId: ['']
    });
    this.messageController = this.formGroup.get('messageInput') as FormControl;
    this.clientIdController = this.formGroup.get('clientId') as FormControl;
  }

  getUUID(): string {
    return this.uuidService.getUUID();
  }

  ngOnInit(): void {
    this.secretSerice.setSecret();
    this.messageController.valueChanges.subscribe(text => {
       this.messageService.setSuccessMessage('');
    });
  }
  getSuccessMessage(): string {
    return this.messageService.getSuccessMessage()
  }

  postMessage(): void {
    this.messageService.postMessage({
      message: this.secretSerice.encrypt(this.messageController.value, this.clientIdController.value),
      client: this.clientIdController.value,
      timestamp: new Date().toString()
    });
  }

  getMessage(): any[] {
    return this.messageService.getServerMessage().map(item => {
      let parsedData = JSON.parse(item);
      let message = parsedData.message;
      let client = parsedData.client;
      let [data, status] = message.split('::VERIFIED');
      if (!status) {
        status = 'VERIFIED';
      } else {
        status = 'UNVERIFIED';
      }
      data = this.secretSerice.decrypt(data, client);
      return { data , status};
    });
  }
}
