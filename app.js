var express = require('express')
var app = express()

app.listen(process.env.PORT || 3000)

// J01GtxiiqmWVhPkC

// queries

        // // query to get all documents as array, connect to db must be an async function
        // var objects = []
        // objects = await client.db('SanaEnCasaDB').collection('Inventario').find().toArray()
        // console.log(objects)


        // query to insert One document
        // var object = {
        //     id: 1,
        //     name: 'Aspirador',
        //     user: 'Juan'
        // }
        // client.db('SanaEnCasaDB').collection('Inventario').insertOne(object)


        // query to insert multiple documents
        // client.db('SanaEnCasaDB').collection('Inventario').insertMany(
        //     [
        //         {id: 1, name: 'Cama', user: 'Juanita'},
        //         {id: 2, name: 'Colchon', user: 'Pepe'},
        //     ]
        // )


        // query to delete one or many documents
        // client.db('SanaEnCasaDB').collection('Inventario').deleteOne({
        //     id: 1
        // })


        // query to update one or many document    
        // client.db('SanaEnCasaDB').collection('Inventario').updateOne(
        //     { id: 2 },
        //     { $set: { id: 1} }
        // )
        
        
var MongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true";
// Connect to the db
MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
     if(err) {
         console.log('hubo un error')
     } else {
        //Write databse Insert/Update/Query code here..


     }
})
