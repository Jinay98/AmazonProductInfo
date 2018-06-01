var AWS = require('aws-sdk');
var amazonAsin = require('amazon-asin');
var region = "us-east-2";
var accessKeyId = "AKIAJJOE6AEHPUZBHOPA";
var secretAccessKey = "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" ;
var tableName = "Amazon";
var amazon = require('amazon-product-api');
var express = require('express')
var app = express()
var temp;
app.get('/', function (req, res) {
  temp=req.query.url;
  console.log(temp);
  
  main();
  res.send(temp);
})
 
app.listen(3000)
var ASIN,title,url;


function main()
{
var ans=amazonAsin.syncParseAsin("https://www.amazon.com/Royal-20-Piece-Silverware-Set-Stainless/dp/B01120Q6O0/ref=br_msw_pdt-4?_encoding=UTF8&smid=A1TAB9STHMJYHV&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=AZF05JTMM4HN3M8EMDQR&pf_rd_t=36701&pf_rd_p=9b5dfc49-bc18-4ded-84d4-6a2f86dabe91&pf_rd_i=desktop");
console.log(ans.ASIN);
var client = amazon.createClient({
    awsId: "AKIAJMQJC7YXV6BBEUJA",
    awsSecret: "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",
    awsTag: "qwikby0b-20"
  });

  var indexi,indexj;
  client.itemLookup({  //API used to find the information about a product using the ASIN no.
    idType: 'ASIN',
    itemId: ans.ASIN,
    responseGroup: 'ItemAttributes,Offers,Images,Accessories'
  }, function(err, results, response) {
    if (err) {
      
      console.log(JSON.stringify(err));
    } else {

          for(var i=0;i<results.length;i++){

          for( var j=0;j<results[i].ItemAttributes.length;j++ ){
           
            indexj=j;
            break;
        }
        indexi=i;
        break;
        }
        ASIN=results[indexi].ASIN[0];
        url=results[indexi].LargeImage[0].URL[0];
        title=results[indexi].ItemAttributes[indexj].Title[0];
        display();

    }
  }
    
  ); 
}

 

    function display(){  //Used to display the ASIN no, URL and the title of the Product
    
    console.log("ASIN value is "+ASIN);
    console.log("The URL is as follows =");
    console.log(url);
    console.log("The Title is as follows =");
    console.log(title);

    inserttoDB();
  }

function inserttoDB()  // Used to insert into a Dynamo Database
{
  var dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });
  
  
  var params = {
    Item: {
      ASIN: ASIN,
      title: title,
      url:url
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: tableName,
  };
  console.log(params);
   dynamoDB.put(params, function(err, data) {
     if (err) {
       console.error(err);
     }
     else {
       console.log(data);
       console.log("Successfully inserted");
     }
   });
} 
