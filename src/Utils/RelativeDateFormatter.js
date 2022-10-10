import { DateTime } from "luxon";
// I should probably use a library for this, BUT I REFUSE
export function RelativeDateFormatter(firstDate, secondDate = DateTime.now()) {
  let adjustedDate = firstDate
    ? DateTime.fromISO(firstDate).toLocal()
    : secondDate; //get out date in a format luxor can use, then convert to users locale for calcs
  const deltas = timeDifference(adjustedDate, secondDate);

  return convertTimeToReadable(deltas);
}

const convertTimeToReadable = (deltas) => {
  const secs = Math.floor(deltas.seconds);
  const mins = Math.floor(deltas.minutes);
  const hrs = Math.floor(deltas.hours);
  const days = Math.floor(deltas.days);
  const months = Math.floor(deltas.months);
  const years = Math.floor(deltas.years);

  // brute force for now, go top down, largest to smallest time measurement to find which we should use for post/edit times
  if (years) {
    return `${years} year${years > 1 ? "s" : ""}  ago`;
  }

  if (months) {
    return `${months} month${months > 1 ? "s" : ""}  ago`;
  }

  if (days) {
    return `${days} day${days > 1 ? "s" : ""}  ago`;
  }

  if (hrs) {
    return `${hrs} hour${hrs > 1 ? "s" : ""}  ago`;
  }

  if (mins) {
    return `${mins} minute${mins > 1 ? "s" : ""}  ago`;
  }

  if (secs) {
    return `${secs} second${secs > 1 ? "s" : ""} ago`;
  }

  return `extremely recent`; //fail safe if for some reason an undefined/NaN val gets created... somehow this was happening at one point, but seemingly resolved itself. Weird. We'll keep a look out in the future
};

const timeDifference = (d1, d2) => {
  const deltas = d2.diff(d1, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ]);

  return deltas.values;
};
