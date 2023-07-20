const csv = require('csvtojson');
const vd = require('./validation/validators');
const vdm = require('./validation/validationMaps');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  csv().fromFile('./equipment_list.csv').then(
    async (jsonArray) => {
        let errors = [];
        // console.log(jsonArray);

        await vd.validateEquipment(jsonArray, vdm.equipmentMap, errors);
        let errors_resp = JSON.stringify(errors, null, 4);
        // console.log(errors_resp);
        res.end(errors_resp);
        console.log("Endpoint reached.");
    } 
  )

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});