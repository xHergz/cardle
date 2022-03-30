import { isNil } from "lodash";

export type ShufleSettings = {
  allowAnalytics: "allowed" | "denied" | "unknown";
  earlyAccessAcknowledged: boolean;
};

export const DEFAULT_SETTINGS: ShufleSettings = {
  allowAnalytics: "unknown",
  earlyAccessAcknowledged: false,
};

const SETTINGS_KEY = "settings";

export const getSettings = (): ShufleSettings => {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }
  const rawSettings = window.localStorage.getItem(SETTINGS_KEY);
  let settings = {};
  try {
    settings = isNil(rawSettings) ? {} : JSON.parse(rawSettings);
  } catch (err) {
    console.error("Error parsing settings", err);
  }
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
};

export const saveSetting = <K extends keyof ShufleSettings>(
  key: K,
  value: ShufleSettings[K]
): void => {
  if (typeof window === "undefined") {
    return;
  }
  const current = getSettings();
  window.localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify({ ...current, [key]: value })
  );
};
