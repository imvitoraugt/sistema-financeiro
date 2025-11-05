import express from 'express'
import { listarUsuarios, criarUsuario, excluirUsuario } from '../controllers/usuarioController.js'

const router = express.Router()

router.get('/', listarUsuarios)
router.post('/', criarUsuario)
router.delete('/:id', excluirUsuario)

export default router