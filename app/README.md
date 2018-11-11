# API responsável pelo CRUD de produtos

## FUNCIONAMENTO

Temos uma comunicação com um banco de dados não relacional (MongoDB) cujo esquema de modelo para produto está definido em api/models.product.js

```
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    price: { type: Number, required: true },
    percentageDiscount: { type: Number, required: true },
    category: { type: String, required: true },
    photos: { type: Array, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});
```

Para a inclusão de um produto devemos criar um json que atende o modelo acima e encaminhar via metodo POST como payload. 
A cada requisição de adição e atualização de produto existe uma validação da consistência do json postado com o esperado pelo modelo.
Exemplo de um json válido:
 ```json
 {
    "category": "Classic - Beauty",
    "price": 120,
    "percentageDiscount": 10,
    "title": "outro produto",
    "photos": [
        {
            "id": 1,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/0x0/products/photos/semi-environment/t_cot1fop19prapng1534277156920.jpeg"
        },
        {
            "id": 2,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        },
        {
            "id": 3,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/l_nuhpg1p19vcpng1535547178129.jpeg"
        },
        {
            "id": 4,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        }
    ]
}
 ```

O valor do campo "product._id" é gerado de forma automática após o cadastro do produto. 
O valor do campo "createdAt" é atualizado de forma automática no momento da adição do produto.
O valor do campo "updatedAt" é atualizado de forma automática no momento da alteraçao do produto.

## ROTAS

Todas as rotas de CRUD da api estão no path /api/products

### GET ALL PRODUCTS

Está rota é reponsável por realizar uma busca no banco de dados e exibi-los.

```
curl 
http://localhost:3001/api/products/
```

Exemplo de resposta

```json
[
    {
        "photos": [
            {
                "id": 1,
                ""url"": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
            },
            {
                "id": 2,
                "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
            },
            {
                "id": 3,
                "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/l_nuhpg1p19vcpng1535547178129.jpeg"
            },
            {
                "id": 4,
                "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/0x0/products/photos/semi-environment/t_cot1fop19prapng1534277156920.jpeg"
            }
        ],
        "_id": "5be87ed871f74b0030699316",
        "title": "outro produto",
        "category": "Classic - Beauty",
        "price": 120,
        "percentageDiscount": 10,
        "createdAt": "2018-11-11T19:11:20.210Z",
        "updatedAt": "2018-11-11T19:11:20.210Z",
        "__v": 0
    }
]
```

### GET PRODUCT FROM ID

Está rota é reponsável por realizar uma busca no banco de dados de acordo com o id passado como parâmetro na url e exibir os resultados.

```
curl http://localhost:3001/api/products/5be87ed871f74b0030699316/
```

### GET PRODUCT FROM TITLE

Está rota é reponsável por realizar uma busca no banco de dados de acordo com o titulo passado como parâmetro na url e exibir os resultados.

```
curl http://localhost:3001/api/products/?title=outro
```

### CREATE PRODUCT

Está rota é reponsável por realizar o cadastro do produto no banco de dados.
Para essa rota é exigido metodo POST com o payload correto para a inserção do produto no banco.

```
curl -XPOST http://localhost:3001/api/products/ --data '{
    "category": "Classic - Beauty",
    "price": 120,
    "percentageDiscount": 10,
    "title": "outro produto",
    "photos": [
        {
            "id": 1,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/0x0/products/photos/semi-environment/t_cot1fop19prapng1534277156920.jpeg"
        },
        {
            "id": 2,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        },
        {
            "id": 3,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/l_nuhpg1p19vcpng1535547178129.jpeg"
        },
        {
            "id": 4,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        }
    ]
}'
```

Caso o payload nao esteja de acordo com o modelo de dado do produto o mesmo não será inserido no banco e teremos uma resposta com status 400 na requisição de origem, cujo o body contem o erro da negação deste payload.

Em caso de sucesso o status da requisição será 200 e no body da requisição teremos `"message": "Product created",` juntamente com o objeto encaminhado no payload na key result do json.

Em caso de algum problema interno da aplicação teremos a resposta com um status 500.


### UPDATE PRODUCT

Está rota é reponsável por realizar uma alteração do cadastro do produto no banco de dados.
Para essa rota é exigido metodo PUT com o payload correto para a inserção do produto no banco, e na url do request devemos ter o id do produto a ser atualizado

```
curl -XPUT http://localhost:3001/api/products/5be87ed871f74b0030699316/ --data '{
    "_id": "5be87ed871f74b0030699316",
    "category": "Classic - Beauty",
    "price": 120,
    "percentageDiscount": 10,
    "title": "alterando o titulo",
    "photos": [
        {
            "id": 1,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/0x0/products/photos/semi-environment/t_cot1fop19prapng1534277156920.jpeg"
        },
        {
            "id": 2,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        },
        {
            "id": 3,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/l_nuhpg1p19vcpng1535547178129.jpeg"
        },
        {
            "id": 4,
            "url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"
        }
    ]
}'
```

Caso o payload nao esteja de acordo com o modelo de dado do produto o mesmo não será inserido no banco e teremos uma resposta com status 400 na requisição de origem, cujo o body contem o erro da negação deste payload.

Em caso de sucesso o status da requisição será 200 e no body da requisição teremos `"message": "Updated",` juntamente com o objeto encaminhado no payload na key result do json.

Em caso de algum problema interno da aplicação teremos a resposta com um status 500.

### DELETE PRODUCT

Está rota é reponsável por realizar uma deleção do cadastro do produto no banco de dados.
Para essa rota é exigido metodo DELETE com o payload correto para a inserção do produto no banco, e na url do request devemos ter o id do produto a ser deletado

```
curl -XDELETE http://localhost:3001/api/products/5be87ed871f74b0030699316/
```

Em caso de sucesso o status da requisição será 200 e no body da requisição teremos `"message": "Deleted",` juntamente com o objeto encaminhado no payload na key result do json.

Em caso de algum problema interno da aplicação teremos a resposta com um status 500.


### VALIDAÇÕES

Para as validações dos payloads enviados temos uma validação via Jsonschema no processo de criação e alteração de produto, este método tenta reduzir o risco de termos documentos na base inválidos.

### TESTES

Para os testes unitários podemos rodar `npm run test` e `npm run coverage`
