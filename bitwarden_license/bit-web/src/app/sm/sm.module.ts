import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { JslibModule } from "@bitwarden/angular/jslib.module";

import { OssModule } from "src/app/oss.module";

import { LayoutComponent } from "./layout/layout.component";
import { NavigationComponent } from "./layout/navigation.component";
import { SecretsManagerRoutingModule } from "./sm-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, OssModule, JslibModule, SecretsManagerRoutingModule],
  declarations: [LayoutComponent, NavigationComponent],
  providers: [],
})
export class SecretsManagerModule {}
