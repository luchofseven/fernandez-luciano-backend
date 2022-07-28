const express = require('express')

const app = express()

app.get('/productos', (req, res) => {
    res.send([])
})

app.get('/productoRandom', (req, res) => {
    res.send(`Se visito la pagina ${contador++} veces`)
})


const server = app.listen(8080, () => {
    console.log(`Servidor hhtp escuchando en el puerto ${server.address().port}`)
})


server.on('error', error => console.log(`Error en servidor ${error}`))