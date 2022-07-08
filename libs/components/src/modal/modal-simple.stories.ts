import { Meta, Story } from "@storybook/angular";

import { ModalSimpleComponent } from "./modal-simple.component";

export default {
  title: "Component Library/Modals/Simple Modal",
  component: ModalSimpleComponent,
} as Meta;

const Template: Story<ModalSimpleComponent> = (args: ModalSimpleComponent) => ({
  props: args,
  template: `
  <bit-simple-modal [useDefaultIcon]="useDefaultIcon">
      <span title> Alert Modal Title
      </span>
      <span message> Message Content
      </span>
      <button footer> Yes </button>
      <button footer> No </button>
  </bit-simple-modal>
  `,
});

export const ExampleSimpleModal = Template.bind({});
ExampleSimpleModal.args = {
  useDefaultIcon: true,
};

const TemplateWithIcon: Story<ModalSimpleComponent> = (args: ModalSimpleComponent) => ({
  props: args,
  template: `
  <bit-simple-modal [useDefaultIcon]="useDefaultIcon">
      <i icon class="bwi bwi-star tw-text-3xl tw-text-success" aria-hidden="true"></i>
      <span title> Premium Subscription Available
      </span>
      <span message> Message Content
      </span>
      <button footer> Yes </button>
      <button footer> No </button>
  </bit-simple-modal>
  `,
});

export const ExampleSimpleModalWithCustomIcon = TemplateWithIcon.bind({});
ExampleSimpleModalWithCustomIcon.args = {
  useDefaultIcon: false,
};

const TemplateScroll: Story<ModalSimpleComponent> = (args: ModalSimpleComponent) => ({
  props: args,
  template: `
  <bit-simple-modal [useDefaultIcon]="useDefaultIcon">
      <span title> Alert Modal Title
      </span>
      <span message> Message Content
      Message text goes here.<br>
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
      <button footer> Yes </button>
      <button footer> No </button>
  </bit-simple-modal>
  `,
});

export const ExampleScrollingSimpleModal = TemplateScroll.bind({});
ExampleScrollingSimpleModal.args = {
  useDefaultIcon: true,
};
