import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {Delta, diff, patch} from "jsondiffpatch";
import {NGXLogger} from "ngx-logger";
import {Todo} from "../../todo/todo";


@Injectable()
export class SyncApiServiceMock {

  serverText: Todo[] = [];
  serverShadow: Todo[] = [];

  constructor(private logger: NGXLogger) {
    // this.serverText.push(...DIFF_SYNC_MOCK_DATA_SERVER.todos);
    // this.serverShadow.push(...DIFF_SYNC_MOCK_DATA_CLIENT.todos);
  }

  public updateDiff(clientDiff): Observable<Delta> {

    this.logger.debug('original server text:');
    this.logger.debug(this.serverText);

    this.logger.debug('4.a 4.b 5. PATCH INTO SERVER SHADOW');
    this.serverShadow = patch(this.serverShadow, clientDiff);
    this.logger.debug('server shadow:');
    this.logger.debug(this.serverShadow);

    this.logger.debug('6.a 6.b 7. PATCH INTO SERVER TEXT');
    this.serverText = patch(this.serverText, clientDiff);
    this.logger.debug('server text:');
    this.logger.debug(this.serverText);

    this.logger.debug('8.a 8.b 9. CREATE SERVER DIFF BETWEEN SERVER SHADOW AND SERVER TEXT');
    const serverDiff = diff(this.serverShadow, this.serverText);
    this.logger.debug('server diff:');
    this.logger.debug(serverDiff);

    this.logger.debug('10. PATCH INTO SERVER SHADOW');
    this.serverShadow = patch(this.serverShadow, serverDiff);
    this.logger.debug('server shadow:');
    this.logger.debug(this.serverShadow);

    return of(serverDiff);
  }

}
