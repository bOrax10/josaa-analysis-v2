const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = 'sample.csv'

const file = fs.createReadStream(csvFilePath);

var csvData=[];
Papa.parse(file, {
  header: true,
  step: function(result) {
    csvData.push(result.data)
  },
  complete: function(results, file) {
    console.log('Complete', csvData.length, 'records.'); 
  }
});