var flatten = require('flatten')
var featureCollection = require('turf-featurecollection')
var point = require('turf-point')

module.exports = function(fc){
  if(fc.type === 'FeatureCollection'){
    for(var i in fc.features){
      var coordinates 
      switch(fc.features[i].geometry.type){
        case 'Point':
          coordinates = [fc.features[i].geometry.coordinates]
          break
        case 'LineString':
          coordinates = fc.features[i].geometry.coordinates
          break
        case 'Polygon':
          coordinates = fc.features[i].geometry.coordinates
          coordinates = flatCoords(coordinates)
          break
        case 'MultiPoint':
          coordinates = fc.features[i].geometry.coordinates
          break
        case 'MultiLineString':
          coordinates = fc.features[i].geometry.coordinates
          coordinates = flatCoords(coordinates)
          break
        case 'MultiPolygon':
          coordinates = fc.features[i].geometry.coordinates
          coordinates = flatCoords(coordinates)
          break
      }
      if(!fc.features[i].geometry && fc.features[i].properties){
        return new Error('Unknown Geometry Type')
      }
    }
      
    var exploded = featureCollection([])

    coordinates.forEach(function(coords){
      exploded.features.push(point(coords[0], coords[1]))
    })

    return exploded
  }
  else{
    var coordinates 
    var geometry
    if(fc.type === 'Feature'){
      geometry = fc.geometry
    }
    else{
      geometry = fc
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
        coordinates = flatCoords(coordinates)
        break
      case 'MultiPoint':
        coordinates = geometry.coordinates
        break
      case 'MultiLineString':
        coordinates = geometry.coordinates
        coordinates = flatCoords(coordinates)
        break
      case 'MultiPolygon':
        coordinates = geometry.coordinates
        coordinates = flatCoords(coordinates)
        break
    }
    if(!geometry){
      return new Error('No Geometry Found')
    }

    var exploded = featureCollection([])

    coordinates.forEach(function(coords){
      exploded.features.push(point(coords[0], coords[1]))
    })

    return exploded
  }
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