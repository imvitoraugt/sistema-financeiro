const apiUrl = import.meta.env.VITE_API_URL

export async function listarTransacoes(){
    const resposta = await fetch(`${apiUrl}/transacoes`)
    if(!resposta.ok){
        throw new Error('Erro ao buscar transações')
    }

    return await resposta.json()
}

export async function criarTransacao(dadosTransacao){
    const resposta = await fetch(`${apiUrl}/transacoes`, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosTransacao)
    })
    if(!resposta.ok){
        throw new Error('Erro ao criar transação.')
    } 

    return await resposta.json()
}