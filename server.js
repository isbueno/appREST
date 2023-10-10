const express  = require('express');
const app = express();
const door = 5000; // definindo a porta

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.json());

// Configurando o EJS
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Importando as configurações do banco de dados
const { sequelize, Livro } = require('./book.model')

// Definindo home
app.get('/', (req, res)=>{
    res.render('home');
});


// Apresentar todos os livros
app.get('/livros', (req, res) => {
    console.log("livros");

    // Função que retorna todos os dados do banco
    Livro.findAll().then(livros => { 
        res.render('livros', {livros}); 
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
        res.status(500).send('Failed to retrieve data'); 
    });
    
});


// Exibindo apenas um objeto
app.get('/livros/:id', (req,res) => {
    const { id } = req.params;

    // Função para encontrar um dados de acordo com o parâmetro passado
    Livro.findOne({ where: { id: id } }
    ).then( livro => {
        res.render('livro_individual', {livro});
    }).catch((error) => {
        res.send("Nenhum livro encontrado.");
    });

    
});

// Criando um novo livro

// rota get para que '/cadastrar' seja acessível direto no navegador
app.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

// Método POST para cadastrar livros na rota '/cadastrar'
app.post('/cadastrar', (req, res) => {
    const { titulo, autor, genero, editora, preco, sku, quant_paginas } = req.body;

    // Função para adicionar novos dados ao banco
    Livro.create({
        titulo,
        autor,
        genero,
        editora,
        preco,
        sku,
        quant_paginas
    }).then(livro => {
        res.redirect(`livros/${livro.id}`)
    }).catch(error => {
        console.error('Falha ao criar novo livro: ', error);
    });
});

// Deletar um livro
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;

    // Função para apagar um livro do banco de acordo com o parâmetro passado
    Livro.destroy({ where: { id: id } })
        .then(() => {
            console.log('\n\nLIVRO APAGADO\n\n');
            res.redirect('livros');
        })
        .catch(error => {
            console.error('Erro ao excluir o livro: ', error);
            res.sendStatus(500);
        });
});


// Atualizar informações do livro

// rota GET para capturar o livro que será editado e mandar para a página de edição
app.get('/livros/:id/editar', (req, res) => {
    const { id } = req.params;

    Livro.findOne({ where: { id: id } })
        .then(livro => {
            res.render('editar_livro', { livro });
        })
        .catch(error => {
            res.send("Nenhum livro encontrado.");
        });
});


// Rota para processar a atualização de um livro
app.put('/livros/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, autor, sku, preco, genero, editora, quant_paginas } = req.body;
  
    Livro.update(
      { titulo, autor, sku, preco, genero, editora, quant_paginas }, // Novos valores a serem atualizados
      { where: { id: id } } // Condição para encontrar o livro a ser atualizado
    ).then((resultado) => {
        if (resultado[0] === 1) {
          // A atualização foi bem-sucedida
          res.redirect(`/livros/${id}`);
        } else {
          // Não foi possível encontrar o livro
          res.status(404).send('Livro não encontrado.');
        }
      })
      .catch((error) => {
        res.status(500).send('Falha ao atualizar o livro.');
      });
  });
  



app.listen(door, ()=>{
    console.log(`Listen on ${door} door`);
})
