import {
  criarDepositoModel,
  criarSaqueModel,
  criarTransferenciaModel
} from '../models/TransacaoModel.js'

import db from "../banco.js";

export async function listarTransacoes(req, res){
  try{
      const [rows] = await db.query(`SELECT * FROM transacoes`)
      res.json(rows)
  }catch(erro){
      res.status(500).json({erro : erro.message})
  }
}

export async function consultarSaldo(req, res){
    const {usuario_id} = req.params
    try{
        const [usuario] = await db.query(`SELECT id FROM usuarios WHERE id = ?`, [usuario_id])
        if(usuario.length === 0){
            return res.status.json({erro : 'Usuário não encontrado'})
        }
        const saldo = await consultarSaldoModel(usuario_id)
        res.json({usuario_id: usuario_id, saldo: saldo}) 
    }catch(erro){
        res.status(500).json({erro : erro.message})
    }
}

export async function criarTransacao(req, res){
  const {descricao, valor, tipo, usuarios_id, categorias_id, usuario_destino_id} = req.body

  try{
      // verifica se o usuário existe
      const [usuario] = await db.query(`SELECT id FROM usuarios WHERE id = ?`, [usuarios_id])
      if(usuario.length === 0){
          return res.status(400).json({erro : 'Usuário não encontrado.'})
      }

      // verifica a categoria (saque, depóstio, transferencia)
      const [categoria] = await db.query(`SELECT id FROM categorias WHERE id = ?`, [categorias_id])
      if(categoria.length === 0){
          return res.status(400).json({erro : 'Categoria não encontrada.'})
      }

      if(tipo === 'Deposito'){
          await criarDepositoModel(usuarios_id, valor, descricao, categorias_id, tipo)
          return res.status(200).json({mensagem: 'Depósito realizado com sucesso.'})
      
      }else if(tipo === 'Daque'){
          await criarSaqueModel(usuarios_id, valor, descricao, categorias_id, tipo)
          return res.status(200).json({mensagem: 'Saque realizado com sucesso.'})

      }else if(tipo === 'Transferencia'){
          if(!usuario_destino_id){
              return res.status(400).json({erro : 'Usuário destino não informado para transferência.'})
          }
          // verifica se usuário que vai receber existe
          const [usuarioDestino] = await db.query(`SELECT id FROM usuarios WHERE id = ?`, [usuario_destino_id])
          if(usuarioDestino.length === 0){
              return res.status(400).json({erro : 'Usuário destino não encontrado.'})
          }
          await criarTransferenciaModel(usuarios_id, usuario_destino_id, valor, descricao, categorias_id, tipo)
          return res.status(200).json({mensagem: 'Transferência realizada com sucesso.'})

      }else{
          return res.status(400).json({erro: 'Tipo de transação inválido.'})
      }
  }catch(erro){
      res.status(500).json({erro : erro.message})
  }
}
