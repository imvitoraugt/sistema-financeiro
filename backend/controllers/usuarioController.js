import db from "../banco.js";

export async function listarUsuarios(req, res){
    
    try{
        const [usuarios] = await db.query(`SELECT * FROM usuarios`)
        res.json(usuarios)
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}

export async function criarUsuario(req, res) {

    const {usuario, senha, nome, email} = req.body
    try{
        const [resposta] = await db.query(`INSERT INTO usuarios (usuario, senha, nome, email) VALUES(?, ?, ?, ?)`,
            [usuario, senha, nome, email]
        )
        res.json({id : resposta.insertId})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
    
}