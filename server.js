import express from 'express'
import db from './banco.js'
import TransacaoRoutes from './routes/transacaoRoutes.js'


const porta = 3000
const app = express()
app.use(express.json())

app.get('/transacoes', (req, res) =>{
  res.send('Hello, world!')
})

app.use('/transacoes', TransacaoRoutes)

app.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})