import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CallsService } from "../services/calls.service";
import { CallModel } from "./call.model";

@Injectable()
export class CallResolver implements Resolve<CallModel> {
  constructor(private readonly _callsService: CallsService) {}

  public resolve(): Observable<CallModel> {
    return forkJoin({
      calls: this._callsService.getCalls(),
    }).pipe(map((data) => new CallModel(data.calls)));
  }
}
