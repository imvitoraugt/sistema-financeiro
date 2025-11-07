const apiUrl = import.meta.env.VITE_API_URL

export async function listarTransacoes(){
    try{
        const resposta = await fetch(`${apiUrl}/transacoes`)
        if(!resposta.ok){
            const erro = await resposta.json()
            throw new Error(erro || 'Erro ao buscar transações.');
        }
        return await resposta.json()
    }catch(erro){
        console.error(`Erro ao listar transações: ${erro}`)
        throw erro
    }
    
}

export async function criarTransacao(dadosTransacao){
    try{
        const respota = await fetch(`${apiUrl}/transacoes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosTransacao)
        })
        if(!respota.ok){
            const erroObj = await respota.json()
            throw new Error(erroObj.erro || 'Erro ao criar transação.')
        }
        return await respota.json()
    }catch(erro){
        console.error('Erro no serviço criarTransacao', erro);
        throw erro
        
    }
}