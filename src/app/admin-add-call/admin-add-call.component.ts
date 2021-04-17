import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CallDb, CallInfo } from "../models/call";
import { CallsService } from "../services/calls.service";

@Component({
  selector: "app-admin-add-call",
  templateUrl: "./admin-add-call.component.html",
  styleUrls: ["./admin-add-call.component.scss"],
})
export class AdminAddCallComponent implements OnInit, OnDestroy {
  callForm!: FormGroup;
  filteredCoinsList!: CallDb[];
  coin = {} as CallDb;
  coinInfo = {} as CallInfo;

  // TODO: test pour voir

  constructor(
    private callsService: CallsService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.callForm.controls.name.valueChanges.subscribe((data) => {
      this.filteredCoinsList = this._filter(data);
    });

    this.callForm.controls.author.valueChanges.subscribe((data) => {
      this.coin.author = data;
    });

    this.callForm.controls.callPrice.valueChanges.subscribe(
      (data) => (this.coin.callPrice = parseFloat(data.replace(/,/g, ".")))
    );

    this.callForm.controls.callDate.valueChanges.subscribe(
      (data) => (this.coin.callDate = data)
    );
  }

  private _filter(value: string): CallDb[] {
    const filterValue = value.toLowerCase();

    return this.callsService.coinsList.filter(
      (option) =>
        option.symbol.toLowerCase() === filterValue ||
        option.name.toLowerCase().includes(filterValue)
    );
  }
  ngOnDestroy(): void {}

  initForm(): void {
    this.callForm = this.formBuilder.group({
      author: "",
      name: "",
      callPrice: "",
      callDate: "",
    });
  }

  onSubmit(): void {
    // this.coin.author = form.value.author;
    console.log(this.coin);
    this.callsService.addCallToDB(this.coin);
  }

  selected(data: { option: { value: any } }): void {
    console.log(data.option.value);
    this.coin = {
      author: this.coin.author,
      callPrice: this.coin.callPrice,
      ...this.callsService.coinsList.filter(
        (value) => value.name === data.option.value
      )[0],
    };
    this.getInfo(this.coin);
  }

  getInfo(coin: CallDb): any {
    if (coin.platforms.ethereum) {
      console.log(coin.platforms.ethereum);
      this.coin.GeckoURL =
        "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
        coin.platforms.ethereum;

      this.httpClient
        .get(
          "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
            coin.platforms.ethereum
        )
        .subscribe((data: any) => {
          this.dispatchInfo(data);
        });
    } else {
      this.coin.GeckoURL = "https://api.coingecko.com/api/v3/coins/" + coin.id;
      this.httpClient
        .get("https://api.coingecko.com/api/v3/coins/" + coin.id)
        .subscribe((data: any) => {
          this.dispatchInfo(data);
        });
    }
  }

  dispatchInfo(data: any): void {
    this.coin.image = data.image.small;
    this.coinInfo = this.callsService.dispatchCallInfo(data);
  }
}
