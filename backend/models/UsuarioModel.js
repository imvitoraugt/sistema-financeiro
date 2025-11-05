import db from '../banco.js'

export async function criarUsuarioModel(usuario, senha, nome, email){
    const [resposta] = await db.query(`INSERT INTO usuarios (usuario, senha, nome, email) VALUES (?, ?, ?, ?)`,
        [usuario, nome, senha, email]
    )
    return resposta.insertId

}

export async function listarUsuariosModel(){
    const usuarios = await db.query(`SELECT * FROM usuarios`)
    return usuarios
}

export async function excluirUsuarioModel(id){
    await db.query(`DELETE FROM usuarios WHERE id = ?`, [id])
}