import db from "../banco.js";

export async function criarCategoriaModel(descricao, status){
    const [resposta] = await db.query(`INSERT INTO categorias (descricao, status) VALUES(?, ?)`,
        [descricao, status]
    )
    return resposta.insertId
}

export async function listarCategoriasModel(){
    const categorias = await db.query(`SELECT * FROM categorias`)
    return categorias
}