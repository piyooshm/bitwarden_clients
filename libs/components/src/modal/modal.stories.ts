import { CommonModule } from "@angular/common";
import { Meta, Story, moduleMetadata } from "@storybook/angular";

import { ModalBodyComponent } from "./modal-body.component";
import { ModalContainerComponent } from "./modal-container.component";
import { ModalFooterComponent } from "./modal-footer.component";
import { ModalTitleComponent } from "./modal-title.component";

export default {
  title: "Component Library/Modal",
  component: ModalContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        ModalContainerComponent,
        ModalBodyComponent,
        ModalTitleComponent,
        ModalFooterComponent,
      ],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<ModalContainerComponent> = (args: ModalContainerComponent) => ({
  props: args,
  template: `
  <bit-modal-container>

    <bit-modal-title>
     Modal Title
    </bit-modal-title>
    <bit-modal-body>
      Modal body text goes here.
    </bit-modal-body>
    <bit-modal-footer>
      <button> Save </button>
      <button> Cancel </button>
    </bit-modal-footer>
  </bit-modal-container>
  `,
});

export const TestModal = Template.bind({});
