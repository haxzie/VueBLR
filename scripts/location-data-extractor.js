const data = require('../src/assets/raw-location-data.json');
const fs = require('fs');
const path = require('path');

const locationData = data.locations.map(item => {
    return {
        location: [item.longitudeE7/10000000, item.latitudeE7/10000000],
        weight: 10
    }
});

fs.writeFileSync(path.join(__dirname, 'location-data.json'), JSON.stringify(locationData, null, 2));

