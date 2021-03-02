const express = require('express')

const app = express()

app.listen(3000, () => console.log('Servidor ativo'))

app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos com nodemon'))