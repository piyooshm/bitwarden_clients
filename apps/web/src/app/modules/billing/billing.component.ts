import { Component, Input } from "@angular/core";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
})
export class BillingComponent {
  @Input() billingPlan: string;
}
