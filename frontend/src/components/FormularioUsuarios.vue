<script setup>
import { reactive, ref } from 'vue';
import { criarUsuario } from '../api/usuarios';

const formState = reactive({
    nome: '',
    usuario: '',
    email: '',
    senha: ''
})

const carregando = ref(false)
const sucessoMsg = ref('')
const erroMsg = ref('')

const handleSubmit = async () => {
    carregando.value = true
    erroMsg.value = ''
    sucessoMsg.value = ''

    try {
        const resposta = await criarUsuario(formState)
        sucessoMsg.value = `Usuário criado com sucesso! ID: ${resposta.id}`

        formState.nome = '',
        formState.usuario = '',
        formState.email = '',
        formState.senha = ''
    }catch(error){
        erroMsg.value = error.message
    }finally{
        carregando.value = false
    }
}
</script>

<template>
    <div class="user-form-container">
        <h2>Criar Novo Usuário</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="nome">Nome Completo: </label>
                <input type="text" id="nome" v-model="formState.nome" required/>

            </div>
            <div class="form-group">
                <label for="nome">Nome de Usuário: </label>
                <input type="text" id="usuario" v-model="formState.usuario" required/>

            </div>
            <div class="form-group">
                <label for="nome">Email: </label>
                <input type="email" id="email" v-model="formState.email" required/>
            </div>
            <div class="form-group">
                <label for="nome">Senha: </label>
                <input type="password" id="senha" v-model="formState.senha" required/>
            </div>
            <button type="submit" :disabled="carregando">
                {{ carregando ? 'Carregando...' : 'Criar usuário' }}
            </button>
        </form>
        <div v-if="sucessoMsg" class="message success">
            {{ sucessoMsg }}
        </div>
        <div v-if="erroMsg" class="message error">
            {{ erroMsg }}
        </div>

    </div>
</template>

<style scoped>
.user-form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box; /* Garante que o padding não quebre o layout */
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>