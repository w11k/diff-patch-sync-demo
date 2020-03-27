import {Injectable} from '@angular/core';
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/switchMap";
import {Network} from "@ngx-pwa/offline";
import {Observable, of} from "rxjs";

@Injectable()
export class ConnectionMockService {

  constructor() {
  }

  notifyWhenNetworkChanges(): Observable<boolean> {
    return of(true);
  }

  isAppOnline(): boolean {
    return true;
  }
}
