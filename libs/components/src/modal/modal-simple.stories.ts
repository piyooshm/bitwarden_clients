import { Meta, Story } from "@storybook/angular";

import { ModalSimpleComponent } from "./modal-simple.component";

export default {
  title: "Component Library/Modals/Simple Modal",
  component: ModalSimpleComponent,
} as Meta;

const Template: Story<ModalSimpleComponent> = (args: ModalSimpleComponent) => ({
  props: args,
  template: `
  <bit-simple-modal>
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

const TemplateScroll: Story<ModalSimpleComponent> = (args: ModalSimpleComponent) => ({
  props: args,
  template: `
  <bit-simple-modal>
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
