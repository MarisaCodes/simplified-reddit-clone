function calcTimeDiffInHours(timeThen, timeNow) {
  // each of the time values is in the formaat hh:mm (hours:minutes, example 11:56)
  timeThen = timeThen.split(":");
  timeNow = timeNow.split(":");
  let hoursElapsed =
    ((timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1])) / 60;
  if (hoursElapsed < 1) {
    let minsElapsed =
      (timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1]);
    if (!minsElapsed) {
      return "Now";
    } else if (minsElapsed < 60) {
      return `${minsElapsed} minutes ago`;
    }
  } else {
    return Math.trunc(hoursElapsed) == 1
      ? `${Math.trunc(hoursElapsed)} hour ago`
      : `${Math.trunc(hoursElapsed)} hours ago`;
  }
}

function timeSinceCalc(created) {
  let time = new Date();
  console.log(time.getDate());
  let timeNow = `${time.getHours()}` + `:${time.getMinutes()}`;
  let spaceBeforeDay = created.indexOf(" ");
  let dayCreated = created.slice(spaceBeforeDay, created.length);
  if (time.getDate() == dayCreated) {
    let timeCreated = created.substring(0, spaceBeforeDay);
    // console.log(timeCreated);
    return calcTimeDiffInHours(timeCreated, timeNow);
  } else {
    // if (arrCurrentPosts.length) {
    //     for (let i = 0; i < arrCurrentPosts.length; i++) {
    //       arrCurrentPosts[i].remove();
    //     }
    //   }
  }
}
console.log(timeSinceCalc("13:1 21"));
