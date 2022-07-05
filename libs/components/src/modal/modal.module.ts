import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalBodyComponent } from "./modal-body.component";
import { ModalContainerComponent } from "./modal-container.component";
import { ModalFooterComponent } from "./modal-footer.component";
import { ModalTitleComponent } from "./modal-title.component";

@NgModule({
  imports: [CommonModule],
  exports: [ModalContainerComponent, ModalBodyComponent, ModalTitleComponent, ModalFooterComponent],
  declarations: [
    ModalContainerComponent,
    ModalBodyComponent,
    ModalTitleComponent,
    ModalFooterComponent,
  ],
})
export class ModalModule {}
