import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CallService } from "../../services/call.service";
import { CallModel } from "./call.model";

@Injectable()
export class CallResolver implements Resolve<CallModel> {
  constructor(private readonly _callService: CallService) {}

  public resolve(): Observable<CallModel> {
    return forkJoin({
      calls: this._callService.getCalls(),
    }).pipe(map((data) => new CallModel(data.calls, true)));
  }
}
