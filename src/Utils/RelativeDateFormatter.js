export function RelativeDateFormatter(post_date, edit_date = Date.now()) {
  const deltaD = timeDifference(post_date, edit_date);
  //TODO: add months and years

  return convertTimeToReadable(deltaD);
}

const convertTimeToReadable = (time) => {
  let secs = Math.round(time / 1000);
  let mins = Math.round(time / (1000 * 60));
  let hrs = Math.round(time / (1000 * 60 * 60));
  let days = Math.round(time / (1000 * 60 * 60 * 24));

  // loop through time elements
  // check if secs is readable (1-59), mins is readable (1-59) or days is visible (1-infinity)
  if (secs > 0 && secs < 59) {
    return `${secs} second${secs > 1 ? "s" : ""} ago`;
  } else if (mins > 0 && mins < 59) {
    return `${mins} minute${mins > 1 ? "s" : ""}  ago`;
  } else if (hrs > 0 && hrs < 59) {
    return `${hrs} hour${hrs > 1 ? "s" : ""}  ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}  ago`;
  }
};

const timeDifference = (d1, d2) => {
  const postDate = new Date(d1);
  const now = new Date(d2);

  const deltaD = Math.abs(now - postDate);

  return deltaD;
};
