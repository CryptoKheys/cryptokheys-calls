import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, takeWhile } from "rxjs/operators";
import { BaseComponent } from "src/app/components/base/base.component";
import { CallDb } from "../../model/call.model";
import { Coin, CoinInfo } from "../../model/coin.model";
import { CallService } from "../../services/call.service";
import { CallUtils } from "../../utils/call.utils";
import { CallCreateModel } from "./call-create.model";

@Component({
  selector: "app-call-create",
  templateUrl: "./call-create.component.html",
  styleUrls: ["./call-create.component.scss"],
})
export class CallCreateComponent extends BaseComponent implements OnInit {
  public pm: CallCreateModel;

  public form: FormGroup;

  public filteredCoins: Observable<Coin[]>;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _callService: CallService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;

      this.initForm();
    });
  }

  private initForm(): void {
    this.form = this._formBuilder.group({
      assetName: ["", Validators.required],
      author: ["", Validators.required],
      callPrice: ["", Validators.required],
      callDate: ["", Validators.required],
      coinInfo: ["", Validators.required],
    });

    const MIN_LENGTH_FILTER: number = 3;
    this.filteredCoins = this.form.controls.assetName.valueChanges.pipe(
      takeWhile(() => this.isAlive),
      filter((e: string) => e.length >= MIN_LENGTH_FILTER),
      map((value: string) => this.filter(value.toLowerCase()))
    );
  }

  private filter(filterValue: string): Coin[] {
    return this.pm.coins.filter(
      (coin) =>
        coin.symbol.toLowerCase() === filterValue ||
        coin.name.toLowerCase().includes(filterValue)
    );
  }

  public onCoinSelected(data: { option: { value: any } }): void {
    const coin: Coin = this.pm.coins.find(
      (coin: Coin) => coin.name === data.option.value
    );

    this.pm.isCoinInfoLoading = true;
    this._callService
      .getCoinInfo(coin)
      .pipe(first())
      .subscribe((coinInfo: CoinInfo) => {
        this.coinInfoForm.setValue(coinInfo);
        this.pm.isCoinInfoLoading = false;
      });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const coinInfo: CoinInfo = this.coinInfoForm.value as CoinInfo;
      const author: string = this.form.controls.author.value;
      const callPrice: number = this.form.controls.callPrice.value;

      const newCall: CallDb = {
        author: author,
        image: coinInfo.urlImage,
        id: coinInfo.coin.id,
        name: coinInfo.coin.name,
        symbol: coinInfo.coin.symbol,
        why: "because",
        platforms: {
          ethereum: coinInfo.coin.platforms.ethereum ? true : false,
        },
        callPrice: callPrice,
        callDate: this.form.controls.callDate.value,
        GeckoURL: coinInfo.coinGeckoUrl,
        running: true,
        closedDate: null,
        closedPrice: null,
      };

      this._callService
        .addCallToDB(newCall)
        .pipe(first())
        .subscribe(() => {
          this._router.navigateByUrl("/call");
        });
    }
  }

  public get percentage(): string {
    const percentage: number = CallUtils.calculatePnl(
      this.coinInfoForm.value.currentPrice,
      this.form.controls.callPrice.value
    );
    return `${percentage}%`;
  }

  public getErrorMessage(formControlName: string): string {
    let errorMessage: string = "Champs invalide";

    if (this.form.controls[formControlName].errors?.required) {
      errorMessage = "Champs obligatoire";
    }

    return errorMessage;
  }

  public get coinInfoForm(): AbstractControl {
    return this.form.controls.coinInfo;
  }
}
