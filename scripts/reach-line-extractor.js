const garbages = require('./reach_lines.json');
const fs = require('fs');
const path = require('path');

const reachData = garbages.features
        .map(feature => {
            return feature.geometry.coordinates;
        })

fs.writeFileSync(path.join(__dirname, 'reach-data.json'), JSON.stringify(reachData, null, 2))