turf-explode
============
[![Build Status](https://travis-ci.org/Turfjs/turf-explode.svg?branch=master)](https://travis-ci.org/Turfjs/turf-explode)

Takes a Feature or FeatureCollection and return all vertices as a collection of points.

###Install

```sh
npm install turf-explode
```

###Parameters

|name|description|
|---|---|
|fc|a geojson feature or featurecollection|

###Usage

```js
explode(fc)
```

###Example

```javascript
var explode = require('turf-explode')
var polygon = require('turf-polygon')

var poly = polygon([[[0,0], [0,10], [10,10] , [10,0]]])

var vertices = explode(poly)

console.log(vertices)
```
