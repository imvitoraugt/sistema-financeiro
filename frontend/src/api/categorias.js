const apiUrl = import.meta.env.VITE_API_BASE_URL;

export async function listarCategorias(){
    const resposta = await fetch(`${apiUrl}/categorias`)
    if(!resposta.ok){
        throw new Error('Erro ao buscar categorias')
    }
    return await resposta.json()
}

export async function criarCategoria(dadosCategoria){
    const resposta = await fetch(`${apiUrl}/categorias`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosCategoria)
    })
    if(!resposta.ok){
        throw new Error('Erro ao criar categoria.')
    }

    return await resposta.json()
}