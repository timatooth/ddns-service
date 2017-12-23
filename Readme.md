# Serverless (AWS) ddns-service
> A quick way to update Route53 zone Resource Record to point to home ip.

Because most DYNDNS services tend to suck. Other lambdas online seemed too complex.

## Deployment
1. Setup AWS Route53 Hosted Zone with your domain.
2. Install serverless framework `npm i -g serverless`.


    `ZONE_ID=ZX6TTOZYNG4A RECORD_NAME=home.example.com serverless deploy --region ap-southeast-2 --stage dev`


 On your Raspberry Pi:  `crontab -e`:


    */10 * * * *  curl https://<XXXXXXXXXXXXXX>.execute-api.ap-southeast-2.amazonaws.com/dev/dns/update


  ###### SECURITY
  Dont share the endpoint url...
