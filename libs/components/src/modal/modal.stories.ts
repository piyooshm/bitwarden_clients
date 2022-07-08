import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { ButtonModule } from "../button";

import { ModalComponent } from "./modal.component";

export default {
  title: "Component Library/Modals/Modal",
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
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
    <button footer bitButton buttonType="primary"> Save </button>
    <button footer bitButton buttonType="secondary"> Cancel </button>
  </bit-modal>
  `,
});

export const Default = Template.bind({});
Default.args = {
  modalSize: "default",
};

export const Small = Template.bind({});
Small.args = {
  modalSize: "small",
};

export const Large = Template.bind({});
Large.args = {
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
  <button footer bitButton buttonType="primary"> Save </button>
  <button footer bitButton buttonType="secondary"> Cancel </button>
  </bit-modal>
  `,
});

export const ScrollingContent = TemplateScrolling.bind({});
ScrollingContent.args = {
  modalSize: "small",
};
