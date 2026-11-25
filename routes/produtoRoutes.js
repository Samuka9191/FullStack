const express = require("express");

const routes = express.Router();

const ProdutoController  = require("../controllers/produtoController.js");


routes.get('/', ProdutoController.listar);
routes.get('/:id', ProdutoController.buscarPorId);
routes.post('/', ProdutoController.criar);



module.exports = routes