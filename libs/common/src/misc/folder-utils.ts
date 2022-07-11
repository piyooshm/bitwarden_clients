import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { Utils } from "@bitwarden/common/misc/utils";
import { FolderView } from "@bitwarden/common/models/view/folderView";

export class FolderUtils {
  static appendNoFolder(folders: FolderView[], i18nService: I18nService) {
    const noneFolder = new FolderView();
    noneFolder.name = i18nService.t("noneFolder");
    folders.push(noneFolder);

    return folders;
  }

  static sort(folders: FolderView[], i18nService: I18nService) {
    folders.sort(Utils.getSortFunction(i18nService, "name"));

    return folders;
  }

  static sortAndAppendNoFolder(folders: FolderView[], i18nService: I18nService) {
    this.sort(folders, i18nService);
    return this.appendNoFolder(folders, i18nService);
  }
}
