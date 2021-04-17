import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { CallService } from "../../services/call.service";
import { CallCreateModel } from "./call-create.model";

@Component({
  selector: "app-call-create",
  templateUrl: "./call-create.component.html",
  styleUrls: ["./call-create.component.scss"],
})
export class CallCreateComponent implements OnInit {
  public pm: CallCreateModel;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _callService: CallService
  ) {}

  public ngOnInit(): void {
    this._route.data.subscribe((data: Data) => {
      this.pm = data.pm;
    });
  }
}
