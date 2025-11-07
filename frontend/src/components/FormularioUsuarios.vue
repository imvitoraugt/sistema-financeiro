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
    }catch(erro){
        erroMsg.value = erro.message
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