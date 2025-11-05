<script setup>
import { ref, onMounted } from 'vue';
import { listarUsuarios } from '../api/usuarios';

const usuarios = ref([]);

onMounted(async () => {
  usuarios.value = await listarUsuarios();
});
</script>

<template>
  <div>
    <h1>Lista de Usuários</h1>
    <ul>
      <li v-for="user in usuarios" :key="user.id">
        {{ user.nome }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
