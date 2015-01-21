# turf-explode

[![build status](https://secure.travis-ci.org/morganherlocker/turf-explode.png)](http://travis-ci.org/morganherlocker/turf-explode)

turf explode module


### `turf.explode(input)`

Takes any GeoJSON object and return all positions as
a collection of {@link Point|Points}.


* `input` (`GeoJSON`): input features

```js
var poly = turf.polygon([[
 [177.396755, -17.795112],
 [177.422161, -17.783506],
 [177.439155, -17.799851],
 [177.426624, -17.826164],
 [177.404651, -17.836459],
 [177.385425, -17.812926],
 [177.381134, -17.797563],
 [177.396755, -17.795112]
]]);

var points = turf.explode(poly);

//=poly

//=points
```

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install turf-explode
```

## Tests

```sh
$ npm test
```

