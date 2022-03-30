import { getSettings, saveSetting } from "../lib/settings";

export const analyticsAllowed = (): boolean => {
  const settings = getSettings();
  return settings.allowAnalytics === "allowed";
};

export const analyticsSet = (): boolean => {
  const settings = getSettings();
  return settings.allowAnalytics !== "unknown";
};

export const allowAnalytics = (): void => {
  saveSetting("allowAnalytics", "allowed");
};

export const denyAnalytics = (): void => {
  saveSetting("allowAnalytics", "denied");
};

export const earlyAccessAcknowledged = (): boolean => {
  const settings = getSettings();
  return settings.earlyAccessAcknowledged;
};

export const acknowledgeEarlyAccess = (): void => {
  saveSetting("earlyAccessAcknowledged", true);
};
