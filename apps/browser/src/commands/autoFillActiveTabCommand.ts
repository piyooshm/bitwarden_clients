import AutofillPageDetails from "src/models/autofillPageDetails";
import { AutofillService, PageDetail } from "src/services/abstractions/autofill.service";

export class AutoFillActiveTabCommand {
  constructor(private autofillService: AutofillService) {}

  async doAutoFillActiveTabCommand(tab: chrome.tabs.Tab) {
    const details = await this.collectPageDetails();
    await this.autofillService.doAutoFillActiveTab(
      [
        {
          frameId: tab.id,
          tab: tab,
          details: details,
        },
      ],
      true
    );
  }

  private async collectPageDetails(): Promise<AutofillPageDetails> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          command: "collectPageDetailsImmediately",
        },
        resolve
      );
    });
  }
}
