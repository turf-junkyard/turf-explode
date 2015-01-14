var featureCollection = require('turf-featurecollection');
var point = require('turf-point');

/**
 * Takes a {@link Feature} or {@link FeatureCollection} and return all positions as
 * a collection of {@link Point|Points}.
 *
 * @module turf/explode
 * @param {GeoJSON} input input features
 * @return {FeatureCollection} a FeatureCollection of Point features representing the exploded input features
 * @example
 * var poly = turf.polygon([[
 *  [177.396755, -17.795112],
 *  [177.422161, -17.783506],
 *  [177.439155, -17.799851],
 *  [177.426624, -17.826164],
 *  [177.404651, -17.836459],
 *  [177.385425, -17.812926],
 *  [177.381134, -17.797563],
 *  [177.396755, -17.795112]
 * ]]);
 *
 * var points = turf.explode(poly);
 *
 * //=poly
 *
 * //=points
 */
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
