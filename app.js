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

app.get('/login/:user/:password', async (req, res) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
    for (const user of users) {
        if (user.usuario.toLowerCase() === req.params.user.toLowerCase() && user.clave.toLowerCase() === req.params.password.toLowerCase()) {
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
        id: '1',
        caso: 'caso1',
        fecha: 'fecha1',
        nombre: 'nombre1',
        edad: 1,
        sexo: 'Mujer',
        padecimiento: 'padecimiento1',
        responsable: 'responsable1',
        direccion: 'direccion1',
        municipio: 'municipio1',
        telefono: 'telefono1',
        celular: 'celular1',
        correo: 'correo1',
        nivelSocioeconomico: 'nivelSocioeconomico1',
        descripcionDelCaso: 'descripcionDelCaso1',
        activo: false,
        fechaEgreso: 'fechaDeEgreso1',
    }
    await client.db('SanaEnCasaDB').collection('paciente').insertOne(paciente)
    res.send('done')
})

app.get('/inventario/:entity/get', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
    const entities = await client.db('SanaEnCasaDB').collection(req.params.entity).find().toArray()
    res.send(entities)
})

app.get('/inevntario/:entity/post', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})
})

app.get('/inevntario/:entity/edit', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})

})

app.get('/inevntario/:entity/delete', async (req, res) => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true})

})

