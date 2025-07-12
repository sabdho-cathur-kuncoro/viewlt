var rad = function (x: number) {
  return (x * Math.PI) / 180;
};

var getDistance = function (p1: any, p2: any) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

export const compare = (currentLocation: any, zonaAllow: any, radArea: any) => {
  let dist = getDistance(currentLocation, zonaAllow);

  if (dist > radArea) {
    return false;
  } else {
    return true;
  }
};
