var geojsonFixtures = require('geojson-fixtures/helper'),
  path = require('path');
geojsonFixtures(require('tape'), 'all', require('./'), path.join(__dirname, 'test'));
