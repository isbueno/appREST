const { Sequelize, DataTypes } = require("sequelize");

// Conexão com banco de dados
const sequelize = new Sequelize(
    'ecommerce_db', 
    'root', 
    'us3r#p4S5.1092',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// testando a conexão
sequelize.authenticate().then(() => {
    console.log('Connection OK.');
 }).catch((error) => {
    console.error('Connection Failed: ', error);
 });

// Model Livro
const Livro = sequelize.define("livro", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
    },
    genero: {
        type: DataTypes.STRING,
    },
    editora: {
        type: DataTypes.STRING,
    },
    preco: {
        type: DataTypes.FLOAT,
    },
    sku: {
        type: DataTypes.STRING,
    },
    quant_paginas: {
        type: DataTypes.INTEGER,
    }

}, {freezeTableName: true
});

sequelize.sync().then(() => {
    console.log('\nTabela Livros criada.');

 }).catch((error) => {
    console.error('\nErro: Não foi possível criar a tabela. ', error);
 });


module.exports = {
    sequelize,
    Livro: Livro // Exporte o modelo Livro
};