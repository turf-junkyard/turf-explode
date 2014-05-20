var test = require('tape')
var polygon = require('turf-polygon')
var point = require('turf-point')
var featurecollection = require('turf-featurecollection')
var explode = require('./')

test('explode', function(t){
  var poly = polygon([[[0,0], [0,10], [10,10] , [10,0]]])
  var p1 = point(0,0),
      p2 = point(0,10),
      p3 = point(10,10),
      p4 = point(10,0)
  var fc = featurecollection([p1,p2,p3,p4])

  var exploded = explode(poly)

  t.ok(exploded.features, 'should take a feature or feature collection and return all vertices')
  t.deepEqual(exploded, fc)

  t.end()
})