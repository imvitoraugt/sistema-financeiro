import db from '../banco.js'

export async function consultarSaldoModel(usuarioId){
    const [resposta] = await db.query(`SELECT COALESCE(SUM(valor), 0) AS saldo FROM transacoes WHERE usuarios_id = ?`, [usuarioId])
    return resposta[0].saldo
}

export async function criarDepositoModel(usuarioId, valor, descricao, categoriaId, tipo){
    await db.query(`INSERT INTO transacoes (usuarios_id, valor, descricao, categorias_id, data, tipo) VALUES (?, ?, ?, ?, ?, ?)`,
        [usuarioId, valor, descricao, categoriaId, new Date(), tipo]
    )
}

export async function criarSaqueModel(usuarioId, valor, descricao, categoriaId, tipo){
    let conexao
    try{
        conexao = await db.getConnection()
        await conexao.beginTransaction()

        const [rows] = await conexao.query(`SELECT COALESCE(SUM(valor), 0) AS saldo FROM transacoes WHERE usuarios_id = ? FOR UPDATE`, [usuarioId])
        const saldo = rows[0].saldo
        if(saldo < valor){
            throw new Error('Saldo insuficiente.')
        }
        await conexao.query(`INSERT INTO transacoes (usuarios_id, valor, descricao, categorias_id, data, tipo) VALUES (?, ?, ?, ?, ?, ?)`,
            [usuarioId, -valor, descricao, categoriaId, new Date(), tipo]
        )
        await conexao.commit()
    }catch(erro){
        if(conexao){
            await conexao.rollback()
        }
        throw erro
    }finally{
        if(conexao){
            conexao.release()
        }
    }

}
export async function criarTransferenciaModel(origem_id, destino_id, valor, descricao, categoriaId, tipo ){
    let conexao
    try{
        conexao = await db.getConnection()
        await conexao.beginTransaction()

        const [rows] = await conexao.query(
            `SELECT COALESCE(SUM(VALOR), 0) AS saldo FROM transacoes WHERE usuarios_id = ? FOR UPDATE`, [origem_id]
        )
        const saldo = rows[0].saldo
        if(saldo < valor){
            throw new Error('Saldo insuficiente.')
        } 
        await conexao.query(`INSERT INTO transacoes (usuarios_id, descricao, valor, categorias_id, usuario_destino_id, data, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [origem_id,  descricao, -valor, categoriaId, destino_id, new Date(), tipo]
        )
        await conexao.query(`INSERT INTO transacoes (usuarios_id, descricao, valor, categorias_id, usuario_destino_id, data, tipo) values(?, ?, ?, ?, ?, ?, ?)`,
            [destino_id, descricao, valor, categoriaId, origem_id, new Date(), tipo]
        )
        await conexao.commit()
    }catch(erro){
        if(conexao){
            await conexao.rollback()
        }
        throw erro
    }finally{
        if(conexao){
            conexao.release()
        }
    }

}