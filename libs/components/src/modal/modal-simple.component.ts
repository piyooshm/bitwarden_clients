import { Component, Input } from "@angular/core";

@Component({
  selector: "bit-simple-modal",
  templateUrl: "./modal-simple.component.html",
})
export class ModalSimpleComponent {
  @Input()
  useDefaultIcon: boolean;
}
