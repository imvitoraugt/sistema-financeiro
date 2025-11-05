<script setup>
import {ref, onMounted} from 'vue'
import {listarTransacoes} from '../api/transacoes.js'

const transacoes = ref([])

onMounted(async() =>{
    try{
        transacoes.value = await listarTransacoes()
    }catch(erro){
        console.log(erro)
    }
})
</script>

<template>
    <div>
        <h1>Transações: </h1>
        <ul>
            <li v-for="tx in transacoes" key="tx.id">
                {{ tx.descricao }} - {{ tx.valor }}

            </li>
        </ul>
    </div>

</template>