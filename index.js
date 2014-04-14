var flatten = require('flatten')
var featureCollection = require('turf-featurecollection')
var point = require('turf-point')

module.exports = function(features, done){
  var coordinates = []
  if(features.type === 'FeatureCollection'){
    for(var i in features.features){
      switch(features.features[i].geometry.type){
        case 'Point':
          coordinates.push([features.features[i].geometry.coordinates])
          break
        case 'LineString':
          coordinates.push(features.features[i].geometry.coordinates)
          break
        case 'Polygon':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          break
        case 'MultiPoint':
          coordinates.push(features.features[i].geometry.coordinates)
          break
        case 'MultiLineString':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          break
        case 'MultiPolygon':
          coordinates.push(features.features[i].geometry.coordinates)
          coordinates.push(_.flatten(coordinates, true))
          coordinates.push(_.flatten(coordinates, true))
          break
      }
      if(!features.features[i].geometry && features.features[i].properties){
        return new Error('Unknown Geometry Type')
      }
    }
    coordinates = _.flatten(coordinates, true)
  }
  else{
    var geometry
    if(features.type === 'Feature'){
      geometry = features.geometry
    }
    else{
      geometry = features
    }
    switch(geometry.type){
      case 'Point':
        coordinates = [geometry.coordinates]
        break
      case 'LineString':
        coordinates = geometry.coordinates
        break
      case 'Polygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPoint':
        coordinates = geometry.coordinates
        break
      case 'MultiLineString':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        break
      case 'MultiPolygon':
        coordinates = geometry.coordinates
        coordinates = _.flatten(coordinates, true)
        coordinates = _.flatten(coordinates, true)
        break
    }
    if(!geometry){
      return new Error('No Geometry Found')
    }
  }
  var fc = t.featurecollection([])
  _.each(coordinates, function(c){
    fc.features.push(t.point(c[0], c[1]))
  })
  return fc
}

function flatCoords(coords){
  var newCoords = []
  coords = flatten(coords)
  coords.forEach(function(c, i){
    if(i % 2 == 0) // if is even
    newCoords.push([c, coords[i+1]])
  })
  return newCoords
}



