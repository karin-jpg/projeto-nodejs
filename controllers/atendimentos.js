const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => 
        res.send('Você está na rota de atendimentos com nodemon'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}