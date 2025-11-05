<script setup>
import { ref } from 'vue';
import { listarUsuarios, criarUsuario } from '../api/usuarios';

const usuarios = ref([]);
const nome = ref('');
const email = ref('');
const senha = ref('');
const loading = ref(false);
const erro = ref('');
const sucesso = ref('');
const mostrarLista = ref(false);

async function carregarUsuarios() {
  try {
    erro.value = '';
    usuarios.value = await listarUsuarios();
    mostrarLista.value = true;
  } catch (e) {
    erro.value = 'Erro ao carregar usuários';
  }
}

async function enviarFormulario() {
  loading.value = true;
  erro.value = '';
  sucesso.value = '';
  try {
    await criarUsuario({ nome: nome.value, email: email.value, senha: senha.value });
    sucesso.value = 'Usuário criado com sucesso!';
    nome.value = '';
    email.value = '';
    senha.value = '';
    if (mostrarLista.value) await carregarUsuarios();
  } catch (e) {
    erro.value = 'Erro ao criar usuário';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h2>Usuários</h2>
    <button @click="carregarUsuarios">Mostrar Usuários</button>

    <ul v-if="mostrarLista">
      <li v-for="user in usuarios" :key="user.id">
        {{ user.nome }} - {{ user.email }}
      </li>
    </ul>

    <h2>Criar Usuário</h2>
    <form @submit.prevent="enviarFormulario">
      <input v-model="nome" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="senha" type="password" placeholder="Senha" required />

      <button type="submit" :disabled="loading">{{ loading ? 'Enviando...' : 'Enviar' }}</button>
    </form>

    <p v-if="erro" style="color: red;">{{ erro }}</p>
    <p v-if="sucesso" style="color: green;">{{ sucesso }}</p>
  </div>
</template>
