import express from 'express'
import db from './banco.js'
import 'dotenv/config'
import cors from 'cors'

import transacaoRoutes from './routes/transacaoRoutes.js'
import categoriaRoutes from './routes/categoriaRoutes.js'
import usuarioRoutes from './routes/usuarioRouter.js'


const app = express()
app.use(cors())
app.use(express.json())


//home por enquanto :)
app.get('/', (req, res) =>{
  res.send('API Sistema Financeiro truando...')
})

//rotas de acesso
app.use('/transacoes', transacaoRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/categorias', categoriaRoutes)

app.listen(process.env.PORTA, () => {
    console.log(`http://localhost:${process.env.PORTA}`)
})