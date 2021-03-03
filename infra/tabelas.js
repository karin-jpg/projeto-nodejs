class Tabelas {
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos(){

        const sql = "CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(100) NOT NULL, pet varchar(50), servico varchar(50) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

       this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            } else{
                console.log('Tabela de atendimentos criado com sucesso')
            }
       })
    }
}

module.exports = new Tabelas