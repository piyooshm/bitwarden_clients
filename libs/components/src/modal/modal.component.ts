import { Component, Input } from "@angular/core";

@Component({
  selector: "bit-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  // Controls the size of the bit modal displayed. Needs to be implemented.
  @Input()
  modalSize: "small" | "default" | "large";

  getWidth() {
    switch (this.modalSize) {
      case "small": {
        return "tw-w-[300px]";
      }
      case "large": {
        return "tw-w-[800px]";
      }
      default: {
        return "tw-w-[500px]";
      }
    }
  }

  getBodyWidth() {
    switch (this.modalSize) {
      case "small": {
        return "tw-w-[268px]";
      }
      case "large": {
        return "tw-w-[768px]";
      }
      default: {
        return "tw-w-[468px]";
      }
    }
  }

  getTitleWidth() {
    switch (this.modalSize) {
      case "small": {
        return "tw-w-[234px]";
      }
      case "large": {
        return "tw-w-[734px]";
      }
      default: {
        return "tw-w-[434px]";
      }
    }
  }
}
