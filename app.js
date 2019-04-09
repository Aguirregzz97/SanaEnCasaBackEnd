var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true";

app.listen(process.env.PORT || 3000)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

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

app.get('/login/:user/:password', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
        if(err) {
            console.log(error)
        } else {
            var users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
            for (const user of users) {
                if (user.usuario.toLowerCase() === req.params.user.toLowerCase() && user.clave.toLowerCase() === req.params.password.toLowerCase()) {
                    res.send(true)
                }
            }
            res.send(false)
        }
   })
})
        

// Connect to the db

