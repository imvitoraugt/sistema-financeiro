import db from './banco.js'

export async function consultarSaldoModel(usuarioId){
    const [resposta] = await db.query(`SELECT COALESCE(SUM(valor), 0) AS saldo FROM transacoes WHERE usuarios_id = ?`, [usuarioId])
    return resposta[0].saldo
}

export async function criarDepositoModel(usuarioId, valor, descricao, categoriaId){
    await db.query(`INSERT INTO transacoes (usuarios_id, valor, descricao, categorias_id) VALUES (?, ?, ?, ?)`,
        [usuarioId, valor, descricao, categoriaId]
    )
}

export async function criarSaqueModel(usuarioId, valor, descricao, categoriaId){
    const saldo = await consultarSaldoModel(usuarioId)
    if(saldo < valor){
        throw new Error('Saldo insuficiente.')
    }
    await db.query(`INSERT INTO transacoes (usuarios_id, valor, descricao, categorias_id) VALUES (?, ?, ?, ?)`,
        [usuarioId, -valor, descricao, categoriaId]
    )

}
export async function criarTransferenciaModel(origem_id, destino_id, valor, descricao, categoriaId ){
    const saldo = await consultarSaldoModel(origem_id)
    if(saldo < valor){
        throw new Error('Saldo insuficiente.')
    } 
    await db.query(`INSERT INTO transacoes (usuarios_id, descricao, valor, categorias_id, usuario_destino_id) VALUES (?, ?, ?, ?, ?)`,
        [origem_id, -valor, descricao, categoriaId, destino_id]
    )
    await db.query(`INSERT INTO transacoes (usuarios_id, descricao, valor, categorias_id, usuario_destino_id) values(?, ?, ?, ?, ?)`,
        [destino_id, valor, descricao, categoriaId, origem_id]
    )

}