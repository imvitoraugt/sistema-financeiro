<script setup>
import FormularioUsuarios from './components/FormularioUsuarios.vue'
import ListarTransacoes from './components/ListarTransacoes.vue';
import FormularioTransacao from './components/FormularioTransacao.vue';
</script>
<template>
    <FormularioTransacao/>
    <ListarTransacoes/>
    <FormularioUsuarios/>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #eef;
}
main {
  padding: 1rem;
}
</style>