const express = require("express");

const routes = express.Router();

const ProdutoController  = require("../controllers/produtoController.js");
const ProdutoModel = require("../models/produtoModel.js")

routes.get('/', ProdutoController.listar);
routes.get('/', ProdutoController.buscarPorId);
routes.post('/', ProdutoController.criar);
routes.put('/', ProdutoModel.atualizar);
routes.delete('/', ProdutoModel.excluir);


module.exports = routes;