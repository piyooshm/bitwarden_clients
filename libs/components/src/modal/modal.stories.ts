import { Meta, Story } from "@storybook/angular";

import { ModalComponent } from "./modal.component";

export default {
  title: "Component Library/Modals/Modal",
  component: ModalComponent,
  args: {
    modalSize: "small",
  },
} as Meta;

const Template: Story<ModalComponent> = (args: ModalComponent) => ({
  props: args,
  template: `
  <bit-modal [modalSize]="modalSize">
    <span title> Modal Title </span>
    <span body>
    Modal body text goes here.
    </span>
    <button footer> Save </button>
    <button footer> Cancel </button>
  </bit-modal>
  `,
});

export const ExampleModal = Template.bind({});
ExampleModal.args = {
  modalSize: "default",
};

export const SmallModal = Template.bind({});
SmallModal.args = {
  modalSize: "small",
};

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  modalSize: "default",
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  modalSize: "large",
};

const TemplateScrolling: Story<ModalComponent> = (args: ModalComponent) => ({
  props: args,
  template: `
  <bit-modal [modalSize]="modalSize">
  <span title> Modal Title </span>
  <span body>
    Modal body text goes here.<br>
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters
    repeating lines of characters <br>
    end of sequence!
  </span>
  <button footer> Save </button>
  <button footer> Cancel </button>
  </bit-modal>
  `,
});

export const ScrollingTextModal = TemplateScrolling.bind({});
ScrollingTextModal.args = {
  modalSize: "small",
};
