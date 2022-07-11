import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

import { FolderService } from "@bitwarden/common/abstractions/folder/folder.service.abstraction";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { FolderUtils } from "@bitwarden/common/misc/folder-utils";
import { FolderView } from "@bitwarden/common/models/view/folderView";

@Component({
  selector: "app-folders",
  templateUrl: "folders.component.html",
})
export class FoldersComponent {
  folders$: Observable<FolderView[]>;

  constructor(
    private router: Router,
    private folderService: FolderService,
    i18nService: I18nService
  ) {
    this.folders$ = this.folderService.folderViews$.pipe(
      map((folders) => FolderUtils.sort(folders, i18nService))
    );
  }

  folderSelected(folder: FolderView) {
    this.router.navigate(["/edit-folder"], { queryParams: { folderId: folder.id } });
  }

  addFolder() {
    this.router.navigate(["/add-folder"]);
  }
}
