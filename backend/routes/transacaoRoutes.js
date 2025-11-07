import express from 'express'

import {listarTransacoes, criarTransacao, consultarSaldo} from '../controllers/transacaoController.js'

const router = express.Router()

router.get('/', listarTransacoes)
router.post('/', criarTransacao)
router.get('/saldo/:usuario_id', consultarSaldo)

export default router

