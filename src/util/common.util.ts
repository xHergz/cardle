import { differenceInCalendarDays } from "date-fns";

const FIRST_DAILY_PUZZLE = 1646697600000;

// https://stackoverflow.com/a/53758827
export const shuffle = <T>(array: T[], seed: number): T[] => {
  const copy = [...array];
  let m = copy.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(random(seed) * m--);

    // And swap it with the current element.
    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
    ++seed;
  }

  return copy;
};

export const random = (seed: number) => {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const getStartOfUtcDay = (startingPoint: Date = new Date()): number => {
  return new Date(
    startingPoint.valueOf() - (startingPoint.valueOf() % 86400000)
  ).valueOf();
};

export const getDailyNumber = (): number => {
  const today = new Date(getStartOfUtcDay());
  const first = new Date(FIRST_DAILY_PUZZLE);
  return differenceInCalendarDays(today, first) + 1;
};

export const getResultMessage = (
  submissions: number,
  correct: boolean
): string => {
  switch (submissions) {
    case 1:
      return "Impossible!";
    case 2:
      return "Unbelievable!";
    case 3:
      return "Excellent";
    case 4:
      return "Great Work";
    case 5:
      return "Well Done";
    case 6:
      return correct ? "Good Stuff" : "Nice Try";
    default:
      return "Nice Try";
  }
};
