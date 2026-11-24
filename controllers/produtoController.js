const ProdutoModel = require('../models/produtoModel')

const ProdutoController = {
    async listar(req, res){
        try {
            const produtos = await ProdutoModel.listarTodos();
            return res.status(200).json(produtos);
        }catch(erro){
            console.error('Erro ao listar produtos:', erro);
            return res.status(500).json({Mensagem: 'Erro ao consultar produto'});
        }
    },

    async buscarPorId(req, res){
        try{
            const id = Number(req.params.id);
            if(!Number.isInteger(id) || id <= 0) {
                return res.status(400).json ({mensagem:'id invalido'})
            }
        } catch {
            
        }
    },
}