export function RelativeDateFormatter(date) {
  let stringDate = date; //date

  let postDate = new Date(stringDate);
  let now = new Date(Date.now());

  let deltaD = Math.abs(now - postDate);

  let secs = Math.round(deltaD / 1000);
  let mins = Math.round(deltaD / (1000 * 60));
  let hrs = Math.round(deltaD / (1000 * 60 * 60));
  let days = Math.round(deltaD / (1000 * 60 * 60 * 24));

  // const times = [seconds, mins, days]
  // let humanReadableTime = "";

  // loop through time elements
  // check if secs is readable (1-59), mins is readable (1-59) or days is visible (1-infinity)
  if (secs > 0 && secs < 59) {
    return `Posted ${secs} seconds ago`;
  } else if (mins > 0 && mins < 59) {
    return `Posted ${mins} minutes ago`;
  } else if (hrs > 0 && hrs < 59) {
    return `Posted ${hrs} hours ago`;
  } else if (days > 0) {
    return `Posted ${days} days ago`;
  }
}
