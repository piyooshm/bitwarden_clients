import { Component, Input } from "@angular/core";

@Component({
  selector: "bit-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  // Controls the size of the bit modal displayed. Needs to be implemented.
  @Input("modalSize") modalSize: "small" | "default" | "large";
}
