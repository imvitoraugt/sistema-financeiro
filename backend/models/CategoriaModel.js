import db from "../banco.js";

export async function criarCategoriaModel(req, res){
    const  {descricao, status} = req.body
    try{

        const id = await criarCategoriaModel(descricao, status)
        res.json({id})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}

export async function listarCategoriasModel(){
    const categorias = await db.query(`SELECT * FROM categorias`)
    return categorias
}