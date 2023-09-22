import { isNil } from "lodash";
import mixpanel from "mixpanel-browser";

import { ShufleEvent } from "../constants/analytics";
import { analyticsAllowed } from "../util/settings";

class Analytics {
  private _initialized: boolean;
  private _skipAnalytics: boolean;

  constructor() {
    this._initialized = false;
    this._skipAnalytics =
      process.env.NEXT_PUBLIC_SHUFLE_ENVIRONMENT !== "prod" &&
      process.env.NEXT_PUBLIC_SHUFLE_ENVIRONMENT !== "alpha";
    if (!isNil(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)) {
      mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
      this._initialized = true;
    }
  }

  public get performAnalytics(): boolean {
    return this._initialized && !this._skipAnalytics && analyticsAllowed();
  }

  public trackEvent(event: ShufleEvent, data?: Object): void {
    if (!this.performAnalytics) {
      console.warn(`Skipping ${event}`);
      return;
    }
    mixpanel.track(event, data);
  }
}

export default new Analytics();
