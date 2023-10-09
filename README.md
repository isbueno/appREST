# appREST
API CRUD RESTful para o gerenciamento de uma tabela relacional simples.

O objetivo final é conseguir ler uma tabela "Livro" em MySql fazendo uso de uma ORM Sequelize. Para montar a aplicação, foram usados Node.js e Express.js.



## Instalação





### Tabela Livro

![image](https://github.com/isbueno/appREST/assets/102770607/c260d8b0-b62e-4922-8921-94519275c17d)

Legenda: Tabela Livro no diagrama de Classe.

A tabela mapeada serve para representar um produto de e-commerce. Ainda não foram adicionadas outras tabelas que poderiam se relacionar com "Livro", já que o objetivo é somente mapear uma única tabela. 

Os atributos de Livro são:
* ID do Livro
* Título
* Autor
* Genero
* Editora
* Preço
* Sku
* Quantidade de Páginas


### Explicando as rotas

Para melhor entendimento, você pode acompanhar esta explicação visualizando o arquivo server.js. 

Como foi dito anteriormente, o projeto tem como objetivo criar o mapeamento de uma tabela relacional usando REST para criar as rotas. Portanto, foram criadas algumas rotas que possam ser usadas em um e-commerce de livraria. 


**GET -> /livros**

A rota principal de um e-commerce é aquela que vai levar o usuário até os produtos do e-commerce. Aqui, isso é feito na rota '/livros' com a requisição GET, onde ela chama todos os livros com a função do Sequelize 'Livro.findAll()', rendirecionando uma página .ejs e passando todos os livros como parâmetro em 'livros'.

**GET -> /livros/id**

Essa rota funciona de maneira similar a rota anterior mas com um parâmetro a mais, o id de cada livro.

![image](https://github.com/isbueno/appREST/assets/102770607/b7bfd938-e4bd-4d29-bc93-d6f6cc1916ba)

Como mostra a figura X, podemos acessar a página individual de cada livro.


**POST -> /cadastrar**

Apesar de ser sugerido fazer a rota POST na mesma rota /livros, em um contexto de e-commerce faz mais sentido criar uma rota especifica para para fazer o POST de novos livros. Sendo assim, a rota pode ser acessada com GET '/cadastrar' e depois a rota POST '/cadastrar' é responsável por adicionar novos livros no banco de dados.

![image](https://github.com/isbueno/appREST/assets/102770607/277772ee-a6a3-432e-a94f-15a758bfd4f6)

Nessa rota, foi criado um formulário que irá receber os atributos necessários e em seguida adiciona o livro no banco de dados usando a função 'Livro.create()'.


**PUT -> /livros/id/**

A rota PUT também precisa de um formulário para que os atributos sejam enviados ao banco de dados, a diferença é que um livro já existente estará sendo atualizado. Para acessar o formulário de atualização (Edição) daquele livro, primeiro foi criada uma rota GET '/livros/id/editar' que irá acessar a página de edição para um livro com base no seu id. Após preencher o formulário com o dado atualizado, a rota PUT '/livros/id' é acionada no servidor e então os dados são atualizados no banco de dados.

![image](https://github.com/isbueno/appREST/assets/102770607/15808faa-cc5a-49a5-a017-e8c9ab942d7b)


**DELETE -> /livros/id**

A rota DELETE '/livros/id' funciona quase da mesma maneira, mas aqui não teremos nenhuma rota intermediária. Quando o usuário acessar a rota GET '/livros/id' terá acesso a página individual de cada livro, como é mostrado na figura X. No final da seção, poderá encontrar o botão "Deletar", ele irá acionar o método DELETE na rota '/livros/id' no servidor e apagar o livro do banco de dados.

![image](https://github.com/isbueno/appREST/assets/102770607/40db69f3-2998-421d-9f28-e2ed1569a1fe)

