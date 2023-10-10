# LivrariaREST
API CRUD RESTful para o gerenciamento de uma tabela relacional simples.

O objetivo final é conseguir ler uma tabela "Livro" em MySql fazendo uso da ORM Sequelize. Para montar a aplicação, foram usados Node.js e Express.js.


<br>
<br>

## Tutorial para instalação

Antes de iniciar o tutorial, certifique-se de adicionar um banco de dados no seu computador. De maneira geral, basta abrir o CMD, logar no MySql e digitar:

```
mysql> CREATE DATABASE ecommerce_db;
```

Para clonar o projeto, abra o git bash em algum diretório e digite:

```
git clone git@github.com:isbueno/livrariaREST.git
git init 
```

Agora, é necessário instalar alguns pacotes para que a aplicação funcione.

Primeiro, o pacote do node precisa ser instalado.

```
npm install node
```

Instale o express: 
```
npm install express --save
```

Instale o ejs:
```
npm install ejs
```

Instale o method-override, ele foi utilizado para que o formulário pudesse aceitar um método PUT.
```
npm install method-override
```


Instale o sequelize para usar a ORM:

```
npm install sequelize
```

Instale o drive necessário para usar o mysql:
```
npm install mysql2
```

Em seguida, abra o arquivo 'book.model.js' e configure o acesso ao banco de dados da sua máquina. Adicione seu user e sua senha.

Em seguida, para criar a tabela relacional 'livro', rode:
```
node book.model.js
```

Agora, rode 'database.js' para popular o banco de dados com alguns livros:
```
node database.js
```


Após finalizar essas instruções, a aplicação poderá ser usada. Ative o servidor com: 
```
node server.js
```

No navegador, abra:
```
http://localhost:5000
```






<br>
<br>

### Tabela Livro

![image](https://github.com/isbueno/appREST/assets/102770607/c260d8b0-b62e-4922-8921-94519275c17d)

Figura 1 - Tabela Livro no diagrama de Classe.

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


<br>
<br>


## Explicação das rotas

Para melhor entendimento, você pode acompanhar esta explicação visualizando o arquivo server.js. 

Como foi dito anteriormente, o projeto tem como objetivo criar o mapeamento de uma tabela relacional usando REST para criar as rotas. Portanto, foram criadas algumas rotas que possam ser usadas em um e-commerce de livraria. 


<br>
<br>

**GET -> /livros**

A rota principal de um e-commerce é aquela que vai levar o usuário até os produtos da loja. Aqui, isso é feito na rota '/livros' com a requisição GET, onde ela chama todos os livros com a função do Sequelize 'Livro.findAll()', rendirecionando uma página 'livros.ejs' e enviando todos os livros como parâmetro.

![image](https://github.com/isbueno/appREST/assets/102770607/871ca3b6-e738-4cbc-847b-0d218073ff3b)
Figura 2



<br>
<br>

**GET -> /livros/id**

Essa rota funciona de maneira similar a rota anterior mas com um parâmetro a mais, o id de cada livro.

![image](https://github.com/isbueno/appREST/assets/102770607/b7bfd938-e4bd-4d29-bc93-d6f6cc1916ba)
Figura 3

Como mostra a figura X, podemos acessar a página individual de cada livro se adicionarmos algum id no fim do endpoint.



<br>
<br>

**POST -> /cadastrar**

Apesar de ser sugerido fazer a rota POST na mesma rota '/livros', em um contexto de e-commerce, faz mais sentido criar uma rota especifica para fazer o POST de novos produtos. Sendo assim, a rota pode ser acessada com GET '/cadastrar' e depois a rota POST '/cadastrar' é responsável por adicionar novos livros no banco de dados.

![image](https://github.com/isbueno/appREST/assets/102770607/277772ee-a6a3-432e-a94f-15a758bfd4f6)
Figura 4

Nessa rota, foi criado um formulário que irá receber os atributos necessários e em seguida adiciona o livro no banco de dados usando a função 'Livro.create()'.

<br>
<br>

**PUT -> /livros/id/**

A rota PUT também precisa de um formulário para que os atributos sejam enviados ao banco de dados, a diferença é que um livro já existente estará sendo atualizado. Para acessar o formulário de atualização (Edição) daquele livro, primeiro foi criada uma rota GET '/livros/id/editar' que irá acessar a página de edição para um livro com base no seu id. Após preencher o formulário com o dado atualizado, a rota PUT '/livros/id' é acionada no servidor e então os dados são atualizados no banco de dados com a função 'Livro.update()'.

![image](https://github.com/isbueno/appREST/assets/102770607/15808faa-cc5a-49a5-a017-e8c9ab942d7b)
Figura 5

<br>
<br>

**DELETE -> /livros/id**

A rota DELETE '/livros/id' funciona quase da mesma maneira que a PUT, mas aqui não teremos nenhuma rota intermediária. Quando o usuário acessar a rota GET '/livros/id' terá acesso a página individual de cada livro, como é mostrado na figura 3. No final da seção, poderá encontrar o botão "Deletar", ele irá acionar o método DELETE na rota '/livros/id' para que o servidor apague o livro do banco de dados utilizando 'Livro.destroy()'.

![image](https://github.com/isbueno/appREST/assets/102770607/40db69f3-2998-421d-9f28-e2ed1569a1fe)
Figura 6
