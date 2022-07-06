import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { PolicyService } from "@bitwarden/common/abstractions/policy.service";
import { SyncService } from "@bitwarden/common/abstractions/sync.service";
import { PlanType } from "@bitwarden/common/enums/planType";

import { OrganizationPlansComponent } from "src/app/settings/organization-plans.component";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
})
export class BillingComponent extends OrganizationPlansComponent {
  constructor(
    apiService: ApiService,
    i18nService: I18nService,
    platformUtilsService: PlatformUtilsService,
    cryptoService: CryptoService,
    router: Router,
    syncService: SyncService,
    policyService: PolicyService,
    organizationService: OrganizationService,
    logService: LogService,
    messagingService: MessagingService
  ) {
    super(
      apiService,
      i18nService,
      platformUtilsService,
      cryptoService,
      router,
      syncService,
      policyService,
      organizationService,
      logService,
      messagingService
    );
    this.plan = PlanType.EnterpriseAnnually;
  }
}
