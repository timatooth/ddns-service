'use strict';

const AWS = require('aws-sdk');
const ZONE_ID = process.env.ZONE_ID;
const RECORD_NAME = process.env.RECORD_NAME;

module.exports.updatedns = (event, context, callback) => {
  let ip = event.requestContext.identity.sourceIp;
  let message = "nothing happened"
  const route53 = new AWS.Route53();

  let params = { ChangeBatch: {Changes: [{
       Action: "UPSERT",
       ResourceRecordSet: {
        Name: RECORD_NAME,
        ResourceRecords: [
           {
          Value: ip
         }
        ],
        TTL: 30,
        Type: "A" }}],
     Comment: "Home dyn dns ip"
    },
    HostedZoneId: ZONE_ID
   };

   route53.changeResourceRecordSets(params, function(err, data) {
     if (err) {
       console.log(err, err.stack);
       message = JSON.stringify(err);
     } else {
       message = JSON.stringify(data);
     }

     const response = {
       statusCode: 200,
       body: JSON.stringify({
         message: message,
       }),
     };

     callback(null, response);
   });
};
