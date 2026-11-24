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
                return res.status(400).json ({mensagem: 'id invalido'})
            }

            const produto = await ProdutoModel.buscarPorID(id);
            if(!produto) {
                return res.status(404).json({mensagem: 'produto não encontrado'});
            }

            return res.status(200).json(produto)
                } catch(erro) {
                    console.error('Erro ao buscar produto:', erro);
                    return res.status(500).json({mensagem: 'Erro ao consultar produto'})          
        }
    },

    async criar(req, res){
        try{
        const { nome, descricao, preco } = req.body;
        const precoNumero = Number(preco);

        if(!nome || !String(nome).trim() || preco === undefined || 
    preco === '' || !Number.isFinite(precoNumero) || precoNumero < 0) {
        return res.status(400).json({mensagem: 'informe valores validos'});
    }

       const id = await ProdutoModel.criar({
        nome: String(nome).trim(),
        descricao: descricao ? String(descricao).trim() : null,
        preco: precoNumero
       });

       return res.status(201).json({mensagem: 'Produto cadastro com sucesso', id})

        }catch(erro) { 
            console.error('Erro ao cadastrar produto', erro);
            return res.status(500).json({mensagem: 'Erro ao cadastrar produto.'})
        }
    },
}

module.exports = ProdutoController