import { GameMode } from "../components/GameModeOption";

export const getGameModeLabel = (mode: GameMode): string => {
  switch (mode) {
    case "classic":
      return "Classic";
    case "daily":
      return "Daily";
    case "hilo":
      return "Hi/Lo";
    case "poker":
      return "Poker";
    case "unique":
      return "Unique";
    default:
      return "";
  }
};
