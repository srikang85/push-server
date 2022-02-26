import { uuidURL } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UUIDService {
    private uuid: string = '';
    constructor(private http: HttpClient) {
    }

    getUUID(): string {
        return this.uuid;
    }
    fetchUUID(): Observable<any> {
      return this.http.get(uuidURL).pipe(tap(
          (response: any) => {
            this.uuid = response.uuid;
          }
      ));
    }
}