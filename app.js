const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

//queries imported
const usersQueries = require('./UserOperations.js')
const entitiesOperations = require('./EntitiesOperations.js')


//user querie
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))


app.use(cors())


app.listen(process.env.PORT || 3000)




// user queries
app.get('/login/:user/:password', usersQueries.login)
app.get('/verifyLogin/:username/:password', usersQueries.verifyLogin)


// enytities queries
app.put('/uploadFile', entitiesOperations.uploadFile)
app.get('/inventario/:entity/get', entitiesOperations.getEntity)
app.post('/inventario/:entity/post', entitiesOperations.pushEntity)
app.put('/inventario/:entity/edit', entitiesOperations.putEntity)
app.delete('/inventario/:entity/delete', entitiesOperations.deleteEntity)
