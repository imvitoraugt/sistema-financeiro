import db from "../banco.js";

export async function listarTransacoes(req, res){
    try{
        const [rows] = await db.query(`SELECT * FROM transacoes`)
        res.json(rows)
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}

export async function criarTransacao(req, res){
    const {descricao, data, valor, tipo, usuarios_id, categorias_id} = req.body
    try{
        //verificar se o usuário existe
        const [usuario] = await db.query(`SELECT id FROM usuarios WHERE id = ?`, [usuarios_id])
        if(usuario.length === 0){
            return res.status(400).json({erro : 'Usuário não encontrado.'})
        }

        //verificar a categoria
        const [categoria] = await db.query(`SELECT id FROM categorias WHERE id = ?`, [categorias_id])
        if(categoria.length === 0){
            return res.json({erro : 'Categoria não encontrada.'})
        }
        
        //inserir transação
        const [resposta] = await db.query(`INSERT INTO transacoes (descricao, data, valor, tipo, usuarios_id, categorias_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [descricao, data, valor, tipo, usuarios_id, categorias_id])
        res.status(200).json({id : resposta.insertId})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}