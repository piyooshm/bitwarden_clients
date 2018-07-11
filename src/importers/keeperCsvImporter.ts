import { BaseImporter } from './baseImporter';
import { Importer } from './importer';

import { ImportResult } from '../models/domain/importResult';

import { FolderView } from '../models/view/folderView';

export class KeeperCsvImporter extends BaseImporter implements Importer {
    parse(data: string): ImportResult {
        const result = new ImportResult();
        const results = this.parseCsv(data, false);
        if (results == null) {
            result.success = false;
            return result;
        }

        results.forEach((value) => {
            if (value.length < 6) {
                return;
            }

            let folderIndex = result.folders.length;
            const hasFolder = !this.isNullOrWhitespace(value[0]);
            let addFolder = hasFolder;

            if (hasFolder) {
                for (let i = 0; i < result.folders.length; i++) {
                    if (result.folders[i].name === value[0]) {
                        addFolder = false;
                        folderIndex = i;
                        break;
                    }
                }
            }

            if (addFolder) {
                const f = new FolderView();
                f.name = value[0];
                result.folders.push(f);
            }
            if (hasFolder) {
                result.folderRelationships.push([result.ciphers.length, folderIndex]);
            }

            const cipher = this.initLoginCipher();
            cipher.notes = this.getValueOrDefault(value[5]) + '\n';
            cipher.name = this.getValueOrDefault(value[1], '--');
            cipher.login.username = this.getValueOrDefault(value[2]);
            cipher.login.password = this.getValueOrDefault(value[3]);
            cipher.login.uris = this.makeUriArray(value[4]);

            if (value.length > 7) {
                // we have some custom fields.
                for (let i = 7; i < value.length; i = i + 2) {
                    this.processKvp(cipher, value[i], value[i + 1]);
                }
            }

            this.cleanupCipher(cipher);
            result.ciphers.push(cipher);
        });

        if (this.organization) {
            this.moveFoldersToCollections(result);
        }

        result.success = true;
        return result;
    }
}
