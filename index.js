var featureCollection = require('turf-featurecollection');
var each = require('turf-meta').coordEach;
var point = require('turf-point');

/**
 * Takes any {@link GeoJSON} object and return all positions as
 * a collection of {@link Point|Points}.
 *
 * @module turf/explode
 * @param {GeoJSON} input input features
 * @return {FeatureCollection} a FeatureCollection of Point features representing the exploded input features
 * @throws {Error} if it encounters an unknown geometry type
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
module.exports = function(layer) {
  var points = [];
  each(layer, function(coord) {
    points.push(point(coord));
  });
  return featureCollection(points);
};
