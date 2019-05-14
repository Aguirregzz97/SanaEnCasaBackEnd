var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true"


uploadFile = async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    await client.db('SanaEnCasaDB').collection('paciente').updateOne(
        { id: req.body.id },
        { $set: { 'image64': req.body.image64 } }
    )
    return res.status(201).send(req.body)
}

getEntity = async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    const entities = await client.db('SanaEnCasaDB').collection(req.params.entity).find().toArray()
    res.send(entities)
}


pushEntity = async (req, res) => {
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
}

putEntity = async (req, res) => {
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
}

deleteEntity = async (req, res) => {
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
}

module.exports = {
    uploadFile: uploadFile,
    getEntity: getEntity,
    pushEntity: pushEntity,
    putEntity: putEntity,
    deleteEntity: deleteEntity
}