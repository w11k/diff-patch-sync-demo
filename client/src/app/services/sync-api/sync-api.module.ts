import {NgModule} from "@angular/core";
import {SyncApiServiceMock} from "./sync-api.service.mock";

@NgModule({
    imports: [
    ],
  providers: [
    SyncApiServiceMock,
  ]
})
export class SyncApiModule {
}
