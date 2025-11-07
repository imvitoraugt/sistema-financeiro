<script setup>
import { onMounted, reactive, ref } from 'vue';
import { criarTransacao } from '../api/transacoes';
import { listarUsuarios } from '../api/usuarios';

const CATEGORIAS = {
    transferencia : 1,
    deposito : 2,
    saque : 3
}

const formState = reactive({
    tipo : 'deposito',
    valor: 0,
    descricao: '',
    usuarios_id: '',
    usuarios_destino_id: '',
    categorias_id: CATEGORIAS.deposito
})

const usuarios = ref([])
const carregando = ref(false)
const sucesso = ref('')
const erro = ref('')

onMounted( async () =>{
    try{
        const resposta = await listarUsuarios()
        console.log('Dados recebidos pela API: ', resposta);
        
        if (Array.isArray(resposta) && Array.isArray(resposta[0])) {
            usuarios.value = resposta[0]
        } else {
            usuarios.value = resposta
        }
    }catch(error){
        erro.value = "Erro ao carregar lista de usuários: " + error.message
        console.error(error);
        
    }
})

const handleSubmit = async () =>{
    carregando.value = true
    sucesso.value = ''
    erro.value = ''

    try{
        formState.categorias_id = CATEGORIAS[formState.tipo]

        const dadosEnvio = { ...formState}
        if(dadosEnvio.tipo !== "transferencia"){
            delete dadosEnvio.usuarios_destino_id
        }
        console.log('Enviando a API', dadosEnvio);
        

        const resposta = await criarTransacao(dadosEnvio)
        sucesso.value = resposta.message || 'Transação realizada com sucesso!'

        formState.valor = 0
        formState.descricao = ''
    }catch(error){
        erro.value = error.message
    }finally{
        carregando.value = false
    }
}
</script>

<template>
  <div class="form-container">
    <h2>Nova Transação</h2>
    <form @submit.prevent="handleSubmit">
      
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select id="tipo" v-model="formState.tipo">
          <option value="deposito">Depósito</option>
          <option value="saque">Saque</option>
          <option value="transferencia">Transferência</option>
        </select>
      </div>

      <div class="form-group">
        <label for="usuario-origem">Usuário (Origem):</label>
        <select id="usuario-origem" v-model="formState.usuarios_id" required>
          <option value="" disabled>Selecione um usuário</option>
          <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
            {{ usuario.nome }} (ID: {{ usuario.id }})
          </option>
        </select>
      </div>

      <div v-if="formState.tipo === 'transferencia'" class="form-group">
        <label for="usuario-destino">Usuário (Destino):</label>
        <select id="usuario-destino" v-model="formState.usuario_destino_id" required>
          <option value="" disabled>Selecione o destino</option>
          <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
            {{ usuario.nome }} (ID: {{ usuario.id }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="valor">Valor (R$):</label>
        <input type="number" id="valor" v-model.number="formState.valor" min="0.01" step="0.01" required />
      </div>

      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <input type="text" id="descricao" v-model="formState.descricao" required />
      </div>

      <button type="submit" :disabled="carregando">
        {{ carregando ? "Processando..." : "Realizar Transação" }}
      </button>
    </form>

    <div v-if="sucesso" class="message success">
      {{ sucesso }}
    </div>
    <div v-if="erro" class="message error">
      {{ erro }}
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
h2 { text-align: center; margin-bottom: 20px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button:disabled { background-color: #aaa; }
.message { margin-top: 15px; padding: 10px; border-radius: 4px; text-align: center; }
.success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
</style>