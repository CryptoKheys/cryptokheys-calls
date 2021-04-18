import { Component, OnDestroy } from "@angular/core";

@Component({
    template: "",
})
export abstract class BaseComponent implements OnDestroy {
    protected isAlive: boolean = true;

    public ngOnDestroy(): void {
        this.isAlive = false;
    }
}
