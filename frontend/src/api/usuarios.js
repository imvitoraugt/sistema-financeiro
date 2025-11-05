const apiUrl = import.meta.env.VITE_API_URL

export async function listarUsuarios(){
    const resposta = await fetch(`${apiUrl}/usuarios`)
    if(!resposta.ok){
        throw new Error('Erro ao listar usuários.')
    }

    return await resposta.json()
}

export async function criarUsuario(dadosUsuario){
    const resposta = await fetch(`${apiUrl}/usuarios`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosUsuario)
    })
    if(!resposta.ok){
        throw new Error('Erro ao criar usuário.')
    }
    return await resposta.json()
}