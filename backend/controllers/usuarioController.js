import db from "../banco.js";
import { listarUsuariosModel, criarUsuarioModel, excluirUsuarioModel } from "../models/UsuarioModel.js";

export async function listarUsuarios(req, res){
    try{
        const [usuarios] = await listarUsuariosModel()
        res.json(usuarios)
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}

export async function criarUsuario(req, res) {

    const {usuario, senha, nome, email} = req.body
    try{
        const id = await criarUsuarioModel(usuario, senha, nome, email)
        res.json({id})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
    
}

export async function excluirUsuario(req, res){
    const {id} = req.params
    try {
        await excluirUsuarioModel(id)
        res.json({mensagem : 'Usuário excluído com sucesso.'})
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}