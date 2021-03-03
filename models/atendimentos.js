const conexao = require('../infra/conexao')

class Atendimento {
    adiciona(atendimento){

        const sql = "INSERT INTO Atendimentos SET ?"
        console.log(sql)
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
               console.log(erro)
            } else {
                console.log(resultados)
            }
        })
    }
}

module.exports = new Atendimento