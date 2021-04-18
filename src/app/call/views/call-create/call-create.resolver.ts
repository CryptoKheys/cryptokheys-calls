import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CallService } from "../../services/call.service";
import { CallCreateModel } from "../call-create/call-create.model";

@Injectable()
export class CallCreateResolver implements Resolve<CallCreateModel> {
  constructor(private readonly _callService: CallService) {}

  public resolve(): Observable<CallCreateModel> {
    return forkJoin({
      coins: this._callService.getCoinsList(),
    }).pipe(map((data) => new CallCreateModel(data.coins)));
  }
}
