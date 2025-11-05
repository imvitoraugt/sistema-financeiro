import db from "../banco.js";

export async function listarCategorias(req, res) {
    
    try{
        const [categorias] = await db.query(`SELECT * FROM categorias`)
        res.json(categorias)
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
    
}

export async function criarCategoria(req, res){

    const {descricao, status} = req.body

    try{
        const [resposta] = await db.query(`INSERT INTO categorias (descricao, statu) VALUES (?, ?)`,
            [descricao, status]
         )
         res.json({id : resposta.insertId})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}