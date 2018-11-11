# Projeto agredador de três microserviços

## SOBRE ESTE REPOSITÓRIO

Este repositório contém três micro serviços cujo o intuito como um todo é permitir um CRUD de produtos em um banco de dados não relacional, propriciar uma interface para a API que fará a comunicação com o banco de dados e também ter uma interface final para o usuário.

### ./app

Projeto em microserviço que cujo sua intenção é implementar uma API para cadastro, alteração, deleção e pesquisa de produtos.
Este micro serviço realiza uma comunicação com um banco de dados não relacional (MongoDB)

mais detalhes sobre o projeto em .app/README.md

### ./client-api

Projeto em microserviço que cujo sua intenção é implementar uma interface sobre o microserviço de API para cadastro, alteração, deleção de produtos

Este micro serviço realiza uma comunicação CRUD com o microserviço de API.

mais detalhes sobre o projeto em .client-api/README.md

### ./client

Projeto em microserviço que cujo sua intenção é implementar uma página para o usuário final que acessa o site podendo pesquisar o produto,verificar todos os dados dos produtos cadastrador na api.

Este micro serviço realiza uma comunicação GET com o microserviço de API.

mais detalhes sobre o projeto em .client-api/README.md


### Executar o projeto local

Projeto em ambiente de container utilizando o docker, portanto é preciso ter o docker instalado na máquina para a execução do projeto.

Para executar o projeto localmente basta utilizar o comando `docker-compose up --build`

Após execução do processo de build e up dos containers, teremos a seguinte estrutura.

0.0.0.0:3000->3000/tcp, 0.0.0.0:9228->9228/tcp    -> client-api

0.0.0.0:3002->3002/tcp, 0.0.0.0:9227->9227/tcp   -> client-view

0.0.0.0:3001->3001/tcp, 0.0.0.0:9229->9229/tcp   -> app_api

0.0.0.0:27017->27017/tcp                        -> mongo


client-api é responsável pelo client de CRUD para produtos, o mesmo está executando na porta 3000

client-view é responsável pela tela que o  usuário final que acessa o site pode buscar produtos, e o mesmo está executando na porta 3002

app_api é a API responsável para a comunicação com os demais serviços e comunicação com o banco de dados não relacional para cadastro de produtos

mongo é o banco de dados utilizado para manter os dados dos produtos persistidos em uma base de dados