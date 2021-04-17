import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { CallsService } from "../services/calls.service";
import { AdminPanelModel } from "./admin-panel.model";

@Injectable()
export class AdminPanelResolver implements Resolve<AdminPanelModel> {
  constructor(private readonly _callsService: CallsService) {}

  public resolve(): Observable<AdminPanelModel> {
    return forkJoin({
      calls: this._callsService.getCalls(),
      coinsList: of([]), //this._callsService.getCoinsList(),
    }).pipe(map((data) => new AdminPanelModel(data.calls, data.coinsList)));
  }
}
