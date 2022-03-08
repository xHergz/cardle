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

export const getStartOfUtcDay = (): number => {
  const now = new Date();
  return new Date(now.valueOf() - (now.valueOf() % 86400000)).valueOf();
};

export const getDailyNumber = (): number => {
  const today = new Date(getStartOfUtcDay());
  const first = new Date(FIRST_DAILY_PUZZLE);
  return differenceInCalendarDays(today, first) + 1;
};
