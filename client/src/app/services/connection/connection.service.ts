import {Injectable} from '@angular/core';
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/switchMap";
import {Network} from "@ngx-pwa/offline";
import {Observable, of, ReplaySubject} from "rxjs";

@Injectable()
export class ConnectionService {

  manualConnectionStatus$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1)

  constructor(protected network: Network) {
    this.manualConnectionStatus$.next(this.isAppOnline())
  }

  notifyWhenNetworkChanges(): Observable<boolean> {
    return this.network.onlineChanges;
  }

  isAppOnline(): boolean {
    return this.network.online;
  }

  setManualConnectionStatus(status: boolean) {
    this.manualConnectionStatus$.next(status);
  }

  getManualConnectionStatus(): Observable<boolean> {
    return this.manualConnectionStatus$;
  }
}
