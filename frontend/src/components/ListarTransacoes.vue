<script setup>
import {ref, onMounted} from 'vue'
import { listarTransacoes } from '../api/transacoes.js';

const transacoes = ref([])
const carregando = ref(false)
const erro = ref('')

const formatarMoeda = (valor) => {
    if(valor === null || valor === undefined || isNaN(Number(valor))){
        return 'R$ 0,00'
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}

const formatarData = (data) => {
    if(!data){
        return '--/--/----'
    }
    const dataFormatada = new Date(data)
    if(isNaN(dataFormatada.getDate())){
        return 'Data inválida!'
    }
    return dataFormatada.toLocaleDateString('pt-BR')
}

const fetchTransacoes = async () => {
    carregando.value = true,
    erro.value = ''
    try{
        transacoes.value = await listarTransacoes()
    }catch(error){
        erro.value = error.message || 'Erro ao buscar transações.'
    }finally{
        carregando.value = false
    }
}

onMounted(() => {
    fetchTransacoes()
})
</script>

<template>
    <div class="list-container">
        <h2>Histórico de Transações</h2>

        <div v-if="carregando" class="carregando">Carregando transações...</div>

        <div v-if="erro" class="erro"> {{ erro }}</div>
    </div>

    <ul v-if="!carregando && !erro && transacoes.length > 0" class="listaTransacoes">
        <li class="list-header">
            <strong>Descrição: </strong>
            <strong>Data: </strong>
            <strong>Tipo: </strong>
            <strong class="valor">Valor: </strong>
        </li>

        <li v-for="transacao in transacoes" :key="transacao.id" class="list-item">
            <span>{{ transacao.descricao }}</span>
            <span>{{ formatarData(transacao.data) }}</span>
            <span>{{ transacao.tipo }}</span>

            <span class="valor" :class="transacao.valor > 0 ? 'positivo' : 'negativo'">
                {{ formatarMoeda(transacao.valor) }}
            </span>
        </li>
    </ul>

    <div v-if="!carregando && !erro && transacoes.length === 0" class="message">Nenhuma transação encontrada.</div>
</template>

<style scoped>
.list-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #555;
}

.listaTransacoes {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.list-header, .list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr; /* 4 colunas */
  gap: 10px;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.list-header {
  background-color: #f0f0f0;
  font-weight: bold;
}

.list-item:nth-child(even) {
  background-color: #fafafa;
}

.valor {
  text-align: right;
  font-weight: bold;
}

.valor.positivo {
  color: #28a745;
}

.valor.negativo {
  color: #dc3545;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>