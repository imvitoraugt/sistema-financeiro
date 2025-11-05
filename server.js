import express from 'express'
import db from './banco.js'
import 'dotenv/config'

import transacaoRoutes from './routes/transacaoRoutes.js'
import categoriaRoutes from './routes/categoriaRoutes.js'
import usuarioRoutes from './routes/usuarioController.js'


const app = express()
app.use(express.json())

app.get('/', (req, res) =>{
  res.send('API Sistema Financeiro truando...')
})


app.use('/transacoes', transacaoRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/categorias', categoriaRoutes)

app.listen(process.env.PORTA, () => {
    console.log(`http://localhost:${process.env.PORTA}`)
})