const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true";



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


app.use(cors())


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

app.put('/uploadFile', async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    await client.db('SanaEnCasaDB').collection('paciente').updateOne(
        { id: req.body.id },
        { $set: { 'image64': req.body.image64 } }
    )
    return res.status(201).send(req.body)
})

app.get('/login/:user/:password', async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    const users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
    for (const user of users) {
        if (user.usuario === req.params.user && user.clave === req.params.password) {
            res.send(true)
        }
    }
    res.send(false)
})

app.get('/inventario/:entity/get', async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    const entities = await client.db('SanaEnCasaDB').collection(req.params.entity).find().toArray()
    res.send(entities)
})

app.post('/inventario/:entity/post', async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    try {
        var isInPaciente = false
        if (req.params.entity === 'equipoMedico') {
            await client.db('SanaEnCasaDB').collection('paciente').find().forEach((paciente) => {
                if (paciente.id === req.body.caso) {
                    isInPaciente = true
                }
            })
            if (!isInPaciente) {
                return res.status(501).send('Foreign key not exist')
            }
        }
        var isUnique = true
        const objToAdd = req.body
        await client.db('SanaEnCasaDB').collection(req.params.entity).find().forEach((document) => {
            if (document.id === objToAdd.id) {
                isUnique = false
            }
        })
        if (isUnique) {
            await client.db('SanaEnCasaDB').collection(req.params.entity).insertOne(objToAdd)
        }
    } catch (error) {
        console.log(error)
    }
    if (isUnique) {
        return res.status(201).send(req.body)
    } else {
        return res.status(500).send('Non unique ID')
    }
})

app.put('/inventario/:entity/edit', async (req, res) => {
    delete req.body._id
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    var isInPaciente = false
    if (req.params.entity === 'equipoMedico') {
        await client.db('SanaEnCasaDB').collection('paciente').find().forEach((paciente) => {
            if (paciente.id === req.body.caso) {
                isInPaciente = true
            }
        })
        if (!isInPaciente) {
            return res.status(501).send('Foreign key not exist')
        }
    }
    await client.db('SanaEnCasaDB').collection(req.params.entity).updateOne({
        id: req.body.id
    }, {
        $set: req.body
    })
    return res.status(202).send(req.body)
})

app.delete('/inventario/:entity/delete', async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    var shouldErase = true
    if (req.params.entity === 'paciente') {
        await client.db('SanaEnCasaDB').collection('equipoMedico').find().forEach((equipoMedico) => {
            if (equipoMedico.caso === req.body.id) {
                shouldErase = false
            }
        })
        if (!shouldErase) {
            return res.status(503).send('this entity is being used somewhere else')
        }
    }
    client.db('SanaEnCasaDB').collection(req.params.entity).deleteOne({
        id: req.body.id
    })
    return res.status(202).send(req.body)
})
