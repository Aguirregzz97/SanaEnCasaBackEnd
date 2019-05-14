var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true"

login = async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    const users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
    for (const user of users) {
        if (user.usuario === req.params.user && user.clave === req.params.password) {
            return res.send(true)
        }
    }
    return res.send(false)
}

verifyLogin = async (req, res) => {
    const client = await MongoClient.connect(url, {
        useNewUrlParser: true
    })
    const users = await client.db('SanaEnCasaDB').collection('Usuarios').find().toArray()
    for (const user of users) {
        if (user.usuario === req.params.username && user.clave === req.params.password) {
            return res.send(true)
        }
    }
    return res.send(false)
}

module.exports = {
    login: login,
    verifyLogin: verifyLogin
}