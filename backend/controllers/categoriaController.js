import db from "../banco.js";
import { criarCategoriaModel, listarCategoriasModel } from "../models/CategoriaModel.js";

export async function listarCategorias(req, res) {
    
    try{
        const [categorias] = await listarCategoriasModel()
        res.json(categorias)
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
    
}

export async function criarCategoria(req, res){

    const {descricao, status} = req.body

    try{
        const [resposta] = await criarCategoriaModel(descricao, status)
         res.json({id : resposta.insertId})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}