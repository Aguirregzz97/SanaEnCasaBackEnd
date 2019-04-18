const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true'


mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// pendejada que despluraliza
// mi coleccion de user va a tener este formato
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const yo = new User({
    name: 'Andres',
    age: 28
})


async () => {
    const yoTmp = await yo.save()
    console.log(yoTmp)
}

yo.save().then(() => {
    console.log(yo)
}).catch(() => {

})
