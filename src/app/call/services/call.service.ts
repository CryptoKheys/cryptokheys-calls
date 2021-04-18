import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of, Subject } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import {
  AddResult,
  Call,
  CallDb,
  CallDTO,
  CallInfo,
} from "../model/call.model";
import { Coin, CoinInfo } from "../model/coin.model";

@Injectable({
  providedIn: "root",
})
export class CallService {
  private calls: Call[] = [];
  private coins: Coin[] = [];

  callsList: CallDTO[] = [];

  firebaseURL =
    "https://ckcalls-default-rtdb.europe-west1.firebasedatabase.app";
  firebaseDB = "cktest";

  constructor(private http: HttpClient) {
    this.getCoinsList();
  }

  public getCalls(refresh: boolean = false): Observable<Call[]> {
    if (!refresh && this.calls.length) {
      return of(this.calls);
    }

    const firebaseDbUrl: string = `${this.firebaseURL}/${this.firebaseDB}.json`;
    return this.http.get(firebaseDbUrl).pipe(
      mergeMap((h: { [id: string]: any }) => {
        if (!h) {
          return of([]);
        }

        return forkJoin(
          Object.entries<{ [id: string]: any }>(h).map(([id, callDb]) => {
            if (!callDb.GeckoURL) {
              return of(this.mapCall(id, callDb));
            }
            return this.http.get(callDb.GeckoURL).pipe(
              map((coinInfo: any) => {
                return this.mapCall(id, callDb, coinInfo);
              })
            );
          })
        );
      }),
      map((calls: Call[]) => {
        this.calls = calls;
        return this.calls;
      })
    );
  }

  private mapCall(callDbId: string, callDb: any, coinInfo?: any): Call {
    return {
      id: callDbId,
      name: callDb.name,
      author: callDb.author,
      image: callDb.image,
      callPrice: callDb.callPrice,
      callDate: callDb.callDate,
      running: callDb.running,
      closedDate: callDb.closedDate,
      closedPrice: callDb.closedPrice,
      currentPrice: coinInfo?.market_data.current_price.usd,
      marketCap: coinInfo?.market_data.market_cap.usd,
      marketCapRank: coinInfo?.market_data.market_cap_rank,
      priceChange24h: coinInfo?.market_data.price_change_24h,
      priceChangePercentage24h:
        coinInfo?.market_data.price_change_percentage_24h,
      priceChangePercentage7d: coinInfo?.market_data.price_change_percentage_7d,
      priceChangePercentage14d:
        coinInfo?.market_data.price_change_percentage_14d,
      priceChangePercentage30d:
        coinInfo?.market_data.price_change_percentage_30d,
    };
  }

  public getCoinsList(): Observable<Coin[]> {
    if (!this.coins.length) {
      return this.http
        .get(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
        )
        .pipe(
          map((resp: Coin[]) => {
            this.coins = resp;
            return this.coins;
          }),
          catchError(this.handleError("getCoinsList", []))
        );
    }

    return of(this.coins);
  }

  public getCoinInfo(coin: Coin): Observable<CoinInfo> {
    let coinGeckoUrl: string = "https://api.coingecko.com/api/v3/coins/";
    if (coin.platforms.ethereum) {
      coinGeckoUrl += `ethereum/contract/${coin.platforms.ethereum}`;
    } else {
      coinGeckoUrl += `${coin.id}`;
    }

    return this.http.get(coinGeckoUrl).pipe(
      map((coinInfo: any) => {
        return {
          coin: coin,
          coinGeckoUrl: coinGeckoUrl,
          urlImage: coinInfo.image.small,
          currentPrice: coinInfo.market_data.current_price.usd,
          marketCap: coinInfo.market_data.market_cap.usd,
          mcapRank: coinInfo.market_data.market_cap_rank,
          sentimentVotesUpPercentage: coinInfo.sentiment_votes_up_percentage,
          priceChange24h: coinInfo.market_data.price_change_24h,
          priceChangePercentage24h:
            coinInfo.market_data.price_change_percentage_24h,
          price_changePercentage7d:
            coinInfo.market_data.price_change_percentage_7d,
          priceChangePercentage14d:
            coinInfo.market_data.price_change_percentage_14d,
          priceChangePercentage30d:
            coinInfo.market_data.price_change_percentage_30d,
        };
      })
    );
  }

  private singleCallInfo(call: CallDTO, push?: boolean): void {
    this.http
      .get(call[1].GeckoURL)
      .pipe(catchError(this.handleError("singleCallInfo", [])))
      .subscribe((res) => {
        // console.log(res);
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

  public addCallToDB(call?: CallDb): Observable<void> {
    const subject: Subject<void> = new Subject();
    const mockCall: CallDb = {
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
        subject.next();
        subject.complete();
      });

    return subject.asObservable();
  }

  private addCallToList(dbID: string, callToAdd: CallDb): void {
    const defCall: CallDTO = [dbID, callToAdd];
    this.singleCallInfo(defCall, true);
  }

  updateCall(call: CallDTO): void {
    this.http
      .patch(`${this.firebaseURL}/${this.firebaseDB}/${call[0]}.json`, call[1])
      .subscribe((res) => console.log(res));
  }

  public deleteCallfromDB(id: string): Observable<void> {
    return this.http
      .delete(`${this.firebaseURL}/${this.firebaseDB}/${id}.json`)
      .pipe(
        map(() => {
          this.deleteCallFromList(id);
        })
      );
  }

  private deleteCallFromList(id: string): void {
    const index: number = this.calls.findIndex((call: Call) => call.id === id);
    if (index !== -1) {
      this.calls.splice(index, 1);
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
