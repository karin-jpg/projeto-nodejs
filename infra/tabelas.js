class Tabelas {
    init(conexao){
        console.log('Acesso a tabelas')
        this.conexao = conexao
    }
}

module.exports = new Tabelas