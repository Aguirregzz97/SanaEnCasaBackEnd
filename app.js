var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')


var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true";



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(process.env.PORT || 3000)

app.use(cors())

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

app.get('/login/:user/:password', async (req, res) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
    for (const user of users) {
        if (user.usuario === req.params.user && user.clave === req.params.password) {
            res.send(true)
        }
    }
    res.send(false)
})

app.get('/test', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    var equipoMedico = {
        id: '3',
        codigo: 3,
        tipoDeEquipoMedico: 'tipoEquipoMedico3',
        descripcion: 'desc3',
        caso: 'caso3',
        donador: 'donador3',
        factura: 'factura3',
        fechaDeCompra: 'fechaDeCompra3',
        casosAnteriores: 'CasosAnterirores3',
        activo: true,
        fechaDeBaja: 'fechaDeBaja3',
        razonDeBaja: 'razonDeBaja3',
    }
    await client.db('SanaEnCasaDB').collection('equipoMedico').insertOne(equipoMedico)
    res.send('done')
})

app.get('/addPaciente', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    var paciente = {
        id: '2',
        caso: 'caso2',
        fecha: 'fecha2',
        nombre: 'nombre2',
        edad: 2,
        sexo: 'Hombre',
        padecimiento: 'padecimiento2',
        responsable: 'responsable2',
        direccion: 'direccion2',
        municipio: 'municipio2',
        telefono: 'telefono2',
        celular: 'celular2',
        correo: 'correo2',
        nivelSocioeconomico: 'nivelSocioeconomico2',
        descripcionDelCaso: 'descripcionDelCaso2',
        activo: false,
        fechaEgreso: 'fechaDeEgreso2',
    }
    await client.db('SanaEnCasaDB').collection('paciente').insertOne(paciente)
    res.send('done')
})

app.get('/inventario/:entity/get', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    const entities = await client.db('SanaEnCasaDB').collection(req.params.entity).find().toArray()
    res.send(entities)
})

app.post('/inventario/:entity/post', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    try {
        const objToAdd = req.body
        await client.db('SanaEnCasaDB').collection(req.params.entity).insertOne(objToAdd)
    } catch (error) {
        console.log(error)
    }
    return res.status(201).send(req.body)
})

app.get('/inevntario/:entity/edit', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
})

app.get('/inevntario/:entity/delete', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})

})

