Number.prototype.toRad = function() {
    return this * Math.PI / 180;
};

export function calculDistanceKM(cord1,cord2){

    var lat2 = cord2.lat;
    var lon2 = cord2.lng;
    var lat1 = cord1.lat;
    var lon1 = cord1.lng;

    var R = 6371; // km
//has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();
    var x2 = lon2-lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
}

export function filterMarkersByDistance(cord1, cord2, maxKMDistance) {
    return Math.floor(calculDistanceKM(cord1,cord2)) <= maxKMDistance;
}

