import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CallDb, CallInfo } from "../models/call";
import { CallsService } from "../services/calls.service";

@Component({
  selector: "app-admin-add-call",
  templateUrl: "./admin-add-call.component.html",
  styleUrls: ["./admin-add-call.component.scss"],
})
export class AdminAddCallComponent implements OnInit {
  public isLoading: boolean = true;

  public callForm: FormGroup;

  private coinsList: any[];
  public filteredCoinsList: any[];

  private coinGeckoUrl: string;
  public coinInfo: CallInfo;
  public urlImage: string;
  public coin: any;

  // TODO: test pour voir

  constructor(
    private callsService: CallsService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.callsService.getCoinsList().subscribe((coins: any[]) => {
      this.coinsList = coins;

      this.initForm();
      this.isLoading = false;
    });
  }

  private initForm(): void {
    this.callForm = this.formBuilder.group({
      author: "",
      name: "",
      callPrice: "",
      callDate: "",
    });

    this.callForm.controls.name.valueChanges.subscribe((data) => {
      const filterValue = data.toLowerCase();

      this.filteredCoinsList = this.coinsList.filter(
        (option) =>
          option.symbol.toLowerCase() === filterValue ||
          option.name.toLowerCase().includes(filterValue)
      );
    });
  }

  public onSubmit(): void {
    if (this.callForm.valid) {
      const newCall: CallDb = {
        author: this.callForm.controls.author.value,
        image: this.urlImage,
        id: this.coin.id,
        name: this.coin.name,
        symbol: this.coin.symbol,
        why: "because",
        platforms: {
          ethereum: this.coin.platforms.ethereum ? true : false,
        },
        callPrice: parseFloat(
          this.callForm.controls.callPrice.value.replace(/,/g, ".")
        ),
        callDate: this.callForm.controls.callDate.value,
        GeckoURL: this.coinGeckoUrl,
        running: true,
        closedDate: null,
        closedPrice: null,
      };

      this.callsService.addCallToDB(newCall);
    }
  }

  public selected(data: { option: { value: any } }): void {
    this.coin = this.coinsList.find(
      (value) => value.name === data.option.value
    );

    this.getCoinInfo();
  }

  private getCoinInfo(): any {
    let coinGeckoUrl: string = "https://api.coingecko.com/api/v3/coins/";
    if (this.coin.platforms.ethereum) {
      coinGeckoUrl += `ethereum/contract/${this.coin.platforms.ethereum}`;
    } else {
      coinGeckoUrl += `${this.coin.id}`;
    }

    this.coinGeckoUrl = coinGeckoUrl;
    this.httpClient.get(coinGeckoUrl).subscribe((data: any) => {
      this.urlImage = data.image.small;
      this.coinInfo = this.callsService.dispatchCallInfo(data);
    });
  }
}
