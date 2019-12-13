const garbages = require('./garbage.json');
const fs = require('fs');
const path = require('path');

const garbageData = garbages.features
        .filter(feature => feature.geometry.type === "Point" )
        .map(feature => {
            return feature.geometry.coordinates;
        })

fs.writeFileSync(path.join(__dirname, 'garbage-data.json'), JSON.stringify(garbageData, null, 2))