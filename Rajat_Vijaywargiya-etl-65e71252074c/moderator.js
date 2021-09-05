const fs = require('fs');
var groupBy = require('json-groupby')
var data = fs.readFileSync('FinalJson.json');
var myObject = JSON.parse(data);
var group = groupBy(myObject, ['Cuisine'])
var newData = JSON.stringify(group);
fs.writeFileSync('Test.json', newData, err => {
    // error checking
    if (err) throw err;

    console.log("New data added");
});