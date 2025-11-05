<script setup>
import {ref, onMounted} from 'vue'
import {listarCategorias} from '../api/categorias.js'

const categorias = ref([])

onMounted(async () => {
    try{
        categorias.value = await listarCategorias()
    }catch(erro){
        console.log(erro)
    }
})
</script>


<template>
    <div>
        <h1>Categorias: </h1>
        <ul>
            <li v-for="ctg in categorias" key="ctg.id">
                {{ ctg.descricao }} - {{ ctg.status }}
            </li>
        </ul>

    </div>
</template>
