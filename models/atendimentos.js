const moment = require('moment')

const conexao = require('../infra/conexao')

class Atendimento {
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data de agendamento deve ser maior ou igual a data atual!'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente deve ter no mínimo 5 caracteres!'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existeErro = erros.length

        if(existeErro){
            res.status(400).json(erros)
        }else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}



            const sql = "INSERT INTO atendimentos SET ?"
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                   res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = "SELECT * FROM atendimentos"

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`
        
        conexao.query(sql, (erro, resultados) => {
            
            if(erro){
                res.status(400).json(erro)
            } else {
                const atendimento = resultados[0]
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE atendimentos set ? WHERE id=?'
        
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = "DELETE FROM atendimentos where id = ?"

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }

        })
    }
}

module.exports = new Atendimento