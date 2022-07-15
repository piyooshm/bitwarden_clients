import { StateService } from "@bitwarden/common/abstractions/state.service";
import { sequentialize } from "@bitwarden/common/misc/sequentialize";
import { EnvironmentService } from "@bitwarden/common/services/environment.service";

type GroupPolicyEnvironment = {
  base?: string;
  webVault?: string;
  api?: string;
  identity?: string;
  icons?: string;
  notifications?: string;
  events?: string;
};

export class BrowserEnvironmentService extends EnvironmentService {
  private _loaded = false;
  private _cached: GroupPolicyEnvironment = null;

  constructor(stateService: StateService) {
    super(stateService);
    // Loading managed environment is a very slow operation, so to avoid
    //  performance issues we load it directly.
    this.getManagedEnvironment();
  }

  async hasManagedEnvironment(): Promise<boolean> {
    return (await this.getManagedEnvironment()) != null;
  }

  async settingsHaveChanged() {
    const env = await this.getManagedEnvironment();

    return (
      env.base != this.baseUrl ||
      env.webVault != this.webVaultUrl ||
      env.api != this.webVaultUrl ||
      env.identity != this.identityUrl ||
      env.icons != this.iconsUrl ||
      env.notifications != this.notificationsUrl ||
      env.events != this.eventsUrl
    );
  }

  getManagedEnvironment(): Promise<GroupPolicyEnvironment> {
    if (this._loaded) {
      return Promise.resolve(this._cached);
    }

    return new Promise((resolve) => {
      chrome.storage.managed.get("environment", (result) => {
        this._loaded = true;
        this._cached = result.environment;

        resolve(result.environment);
      });
    });
  }

  async setUrlsToManagedEnvironment() {
    const env = await this.getManagedEnvironment();
    await this.setUrls({
      base: env.base,
      webVault: env.webVault,
      api: env.api,
      identity: env.identity,
      icons: env.icons,
      notifications: env.notifications,
      events: env.events,
    });
  }
}
