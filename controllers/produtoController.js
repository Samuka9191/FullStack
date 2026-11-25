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

    async atualizar(req, res){
        try{ 
        const id = Number(req.params.id);
        const { nome, descricao, preco } = req.body;
        const precoNumero = Number(preco)

        if(!Number.isInteger(id) || id <=0){
            return res.status(400).json({mensagem: 'ID Invalido'})
        }

        if(!nome || !String(nome).trim() || preco == undefined ||
         preco == '' || Number.isFinite(precoNumero) || precoNumero < 0){
            return res.status(400).json({mensagem: 'Nome e/ou preco invalido'})
         }

         const produtoExiste = await ProdutoModel.buscarPorId(id);

         if(!produtoExiste) {
            return res.status(400).json({mensagem: 'Produto não encontrado'})

         }

         await ProdutoModel.atualizar(id, {
            nome: String(nome).trim(),
            descricao: descricao ? String(descricao).trim() : null,
            preco: precoNumero
         });

         return res.status(200).json({mensagem: 'Produto atualizado com sucesso'})

         }catch(erro){
            console.error('Erro ao atualizar produto', erro)
            return res.status(500).json({ mensagem: 'Erro ao atualizar produto'})
         }
    },

    async excluir (req, res){
        try{
            const id = Number(req.params.id);

            if(!Number.isInteger(id) || id <= 0){
                return res.status(400).json({mensagem: 'ID Invalido'})
            }

            const quantidadeExcluida = await ProdutoModel.excluir(id);

            if(quantidadeExcluida === 0) {
                return res.status(400).json({mensagem: 'produto nao encontrado'})
            }

            return res.status(200).json({mensagem: 'Produto excluido com sucesso!'})
        } catch (erro){
            console.error('Erro ao excluir produto', erro)
            return res.status(500).json({mensagem: 'Erro ao excluir produto'})
        }
    }
}

module.exports = ProdutoController