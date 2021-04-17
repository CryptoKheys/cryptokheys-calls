import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { CallsService } from "../services/calls.service";
import { CallsListModel } from "./calls-list.model";

@Injectable()
export class CallsListResolver implements Resolve<CallsListModel> {
  constructor(private readonly _callsService: CallsService) {}

  public resolve(): Observable<CallsListModel> {
    return forkJoin({
      calls: this._callsService.getCalls(),
      coinsList: of([]), //this._callsService.getCoinsList(),
    }).pipe(map((data) => new CallsListModel(data.calls, data.coinsList)));
  }
}
