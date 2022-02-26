import { messageURL, secretURL } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class SecretService {
    private secretKey: string = '';
    constructor(private http: HttpClient) {
    }

    getSecret(): string {
        return this.secretKey;
    }
    setSecret() {
      this.http.get(secretURL).subscribe((response: any) => {
          this.secretKey = response.secret;
      })
    }
    encrypt(data: string, clientId?: string): string {
      return CryptoJS.AES.encrypt(data, this.secretKey + clientId).toString()
    }
}