var flatten = require('flatten');
var featureCollection = require('turf-featurecollection');
var point = require('turf-point');

module.exports = function(layer){

  var points = [];
  if (layer.type === 'FeatureCollection') features = layer.features;
  else if (layer.type === 'Feature') features = [layer];
  else features = [{ geometry: layer }];

  for(var i = 0; i < features.length; i++){
    var coords = features[i].geometry.coordinates;
    switch(features[i].geometry.type){
      case 'Point':
        depth0(coords, points);
        break;
      case 'LineString':
      case 'MultiPoint':
        depth1(coords, points);
        break;
      case 'Polygon':
      case 'MultiLineString':
        depth2(coords, points);
        break;
      case 'MultiPolygon':
        depth3(coords, points);
        break;
      default:
        return new Error('Unknown Geometry Type');
    }
  }
  return featureCollection(points);
};

function depth0(coord, features) {
  features.push(point(coord[0], coord[1]));
}

function depth1(coords, features) {
  for(var i = 0; i < coords.length; i++){
    var coord = coords[i];
    features.push(point(coord[0], coord[1]));
  }
}

function depth2(coords, features) {
  for(var i = 0; i < coords.length; i++){
    for(var j = 0; j < coords[i].length; j++){
      var coord = coords[i][j];
      features.push(point(coord[0], coord[1]));
    }
  }
}

function depth3(coords, features) {
  for(var i = 0; i < coords.length; i++){
    for(var j = 0; j < coords[i].length; j++){
      for(var k = 0; k < coords[i][j].length; k++){
        var coord = coords[i][j][k];
        features.push(point(coord[0], coord[1]));
      }
    }
  }
}
