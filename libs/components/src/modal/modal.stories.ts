import { CommonModule } from "@angular/common";
import { Meta, Story, moduleMetadata } from "@storybook/angular";

import { ModalComponent } from "./modal.component";

export default {
  title: "Component Library/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [ModalComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<ModalComponent> = (args: ModalComponent) => ({
  props: args,
  template: `
  <bit-modal>
     Modal Title

    <p body>
      Modal body text goes here.
    </p>

      <button footer> Save </button>
      <button footer> Cancel </button>
  </bit-modal>
  `,
});

export const TestModal = Template.bind({});
