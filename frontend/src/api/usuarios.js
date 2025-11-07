const apiUrl = import.meta.env.VITE_API_URL

export async function criarUsuario(userData){
    try{
        const resposta = await fetch(`${apiUrl}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if(!resposta.ok){
            const erro = await resposta.json()
            throw new Error(erro || 'Erro ao criar usuário');
        }
        return await resposta.json()
    }catch(erro){
        console.error(`Erro ao criar usuário: ${erro}`)
        throw erro
    }
    
}

export async function listarUsuarios(){
    try{
        const resposta = await fetch(`${apiUrl}/usuarios`)
        if(!resposta.ok){
            const errorD = await resposta.json()
            throw new Error(errorD || 'Erro ao buscar usuários')
        }
        return await resposta.json()
    }catch(error){
        console.error('Erro no serviço listarUsuarios', error);
        throw error
        
    }

}


export async function deletarUsuario(id){

}