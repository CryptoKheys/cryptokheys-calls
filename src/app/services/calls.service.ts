import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AddResult, Call, CallDTO, CallInfo } from "../models/call";

@Injectable({
  providedIn: "root",
})
export class CallsService {
  callsList: CallDTO[] = [];
  coinsList: any[] = [];
  firebaseURL =
    "https://ckcalls-default-rtdb.europe-west1.firebasedatabase.app";
  firebaseDB = "cktest";

  constructor(private http: HttpClient) {}

  public getCalls(): Observable<CallDTO[]> {
    if (!this.callsList.length) {
      return this.http.get(`${this.firebaseURL}/${this.firebaseDB}.json`).pipe(
        map((h) => {
          this.callsList = Object.entries(h);
          this.getCallsInfo();
          return this.callsList;
        }),
        catchError(this.handleError("getCalls", []))
      );
    }

    return of(this.callsList);
  }

  public getCoinsList(): Observable<any[]> {
    if (!this.coinsList.length) {
      return this.http
        .get(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
        )
        .pipe(
          map((resp: any) => {
            this.coinsList = resp;
            return this.coinsList;
          }),
          catchError(this.handleError("getCoinsList", []))
        );
    }

    return of(this.coinsList);
  }

  private getCallsInfo(): void {
    this.callsList?.forEach((call) => {
      this.singleCallInfo(call);
    });
  }

  private singleCallInfo(call: CallDTO, push?: boolean): void {
    this.http
      .get(call[1].GeckoURL)
      .pipe(catchError(this.handleError("singleCallInfo", [])))
      .subscribe((res) => {
        console.log(res);
        call[2] = this.dispatchCallInfo(res);
        if (push) {
          this.callsList.push(call);
        }
      });
  }

  dispatchCallInfo(GeckoData: any): CallInfo {
    return {
      current_price: GeckoData.market_data.current_price.usd,
      market_cap: GeckoData.market_data.market_cap.usd,
      mcapRank: GeckoData.market_data.market_cap_rank,
      sentiment_votes_up_percentage: GeckoData.sentiment_votes_up_percentage,
      price_change_24h: GeckoData.market_data.price_change_24h,
      price_change_percentage_24h:
        GeckoData.market_data.price_change_percentage_24h,
      price_change_percentage_7d:
        GeckoData.market_data.price_change_percentage_7d,
      price_change_percentage_14d:
        GeckoData.market_data.price_change_percentage_14d,
      price_change_percentage_30d:
        GeckoData.market_data.price_change_percentage_30d,
    };
  }

  addCallToDB(call?: Call): void {
    const mockCall: Call = {
      author: "Mathieu",
      image:
        "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "bitcoin",
      why: "because",
      platforms: {
        ethereum: false,
      },
      callPrice: 14,
      callDate: "today",
      GeckoURL: "https://api.coingecko.com/api/v3/coins/bitcoin",
      running: true,
      closedDate: 0,
      closedPrice: 0,
    };

    const callToAdd = call ? call : mockCall;

    this.http
      .post<AddResult>(`${this.firebaseURL}/${this.firebaseDB}.json`, callToAdd)
      .pipe(catchError(this.handleError("addCalltoDB", [])))
      .subscribe((res) => {
        if ("name" in res) {
          this.addCallToList(res.name, callToAdd);
        }
      });
  }

  private addCallToList(dbID: string, callToAdd: Call): void {
    const defCall: CallDTO = [dbID, callToAdd];
    this.singleCallInfo(defCall, true);
  }

  updateCall(call: CallDTO): void {
    this.http
      .patch(`${this.firebaseURL}/${this.firebaseDB}/${call[0]}.json`, call[1])
      .subscribe((res) => console.log(res));
  }

  deleteCallfromDB(id: string): void {
    this.http
      .delete(`${this.firebaseURL}/${this.firebaseDB}/${id}.json`)
      .pipe(catchError(this.handleError("deleteCallfromDB", [])))
      .subscribe((res) => {
        this.deleteCallFromList(id);
      });
  }

  private deleteCallFromList(id: string): void {
    const arrCallToDelete = this.callsList.filter((call) => call[0] === id);
    if (arrCallToDelete.length === 1) {
      const indexCallToDelete = this.callsList.indexOf(arrCallToDelete[0]);
      this.callsList.splice(indexCallToDelete, 1);
    }
  }

  private handleError<T>(
    operation = "operation",
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  closeCall(index: string, closedPrice?: number): void {
    console.log(index, closedPrice);
  }
}
