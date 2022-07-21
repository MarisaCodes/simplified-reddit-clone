function calcTimeDiffInHours(timeThen, timeNow) {
  // each of the time values is in the formaat hh:mm (hours:minutes, example 11:56)
  timeThen = timeThen.split(":");
  timeNow = timeNow.split(":");
  let hoursElapsed = ((timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1])) / 60
  if(hoursElapsed<1){
    let minsElapsed = (timeNow[0] - timeThen[0]) * 60 + (timeNow[1] - timeThen[1]);
    if(!minsElapsed){
        return 'Now';
    } else if(minsElapsed<60){
        return `${minsElapsed} minutes ago`;
    } 
  } else {
    return `${Math.trunc(hoursElapsed)} hours go`
}
}