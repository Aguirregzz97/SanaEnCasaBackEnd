var express = require('express')
var app = express()

app.listen(process.env.PORT || 3000)

// J01GtxiiqmWVhPkC

var MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true";
// Connect to the db
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
     if(err) {
         console.log('hubo un error')
     } else {
        //Write databse Insert/Update/Query code here..
        // client.db('SanaEnCasaDB').collection('Inventario').insertOne({
        //     id: [1, 2, 3, 4, 5],
        //     name: ['Andres', 'Mauricio', 'Jorge', 'Pepe', 'Juan'],
        // })
     }
})

