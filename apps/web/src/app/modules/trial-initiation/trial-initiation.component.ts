import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlanType } from "@bitwarden/common/enums/planType";
import { first } from "rxjs";

@Component({
  selector: "app-trial",
  templateUrl: "trial-initiation.component.html",
})
export class TrialInitiationComponent implements OnInit {
  email = "";
  org = "teams";
  plan = PlanType.EnterpriseAnnually;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(first()).subscribe((qParams) => {
      if (qParams.email != null && qParams.email.indexOf("@") > -1) {
        this.email = qParams.email;
      }
      if (qParams.org) {
        this.org = qParams.org;
      }
    });
  }
}
