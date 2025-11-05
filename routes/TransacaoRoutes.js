import express from 'express'

import {listarTransacoes, criarTransacao} from '../controllers/TransacaoController.js'

const router = express.Router()

router.get('/', listarTransacoes)
router.post('/', criarTransacao)

export default router

