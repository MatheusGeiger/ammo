# Client responsável pela comunicação da API para o CRUD de produtos

## FUNCIONAMENTO

Temos um formulário simples que permite uma interface visual dos campos que a api espera para cadastro do produto, o intuito é facilitar o cadastro, alteração e deleção do produto da base de dados, isso porque o formulário realiza algumas válidações dos campos digitados pelo usuário, fazendo com que a requisição para a API ao clicar no botão de submit do formulário tenha o payload esperado pela API.

### ADD PRODUCT

Para adicionar um produto basta clicarmos no botão de adicionar ao lado da busca e após preencher os dados corretamente clicar no botão de save.

para o campo de foto usar o item abaixo como texto no campo, se preferir pode utilizar o link da image que desejar no campo url.

[{"id": 1,"url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/0x0/products/photos/semi-environment/t_cot1fop19prapng1534277156920.jpeg"},{"id": 2,"url": "https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"},{"id": 3,"url":"https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/l_nuhpg1p19vcpng1535547178129.jpeg"},{"id": 4,"url":"https://dgn7v532p0g5j.cloudfront.net/unsafe/80x80/products/photos/still/PRTGE.TREP17PT.jpeg"}]

### UPDATE PRODUCT

Para editar um produto basta clicarmos no 'lapis' ao lado do produto e após alterar os dados corretamente clicar no botão de save.

### DELETE PRODUCT

Para exlcuir um produto basta clicarmos na 'lixeirinha' ao lado do produto

### VALIDAÇÕES

Para as validações dos campos do formulário temos umas funções que são executadas a cada iteração do usuário com o campo do formulário. Caso tenha alguma campo preenchido incorretamente o botão de save fica sem funcionalidade.

### TODO

- Tornar o campo de photos visualmente 'agradável' para o usuário.
- Aprimorar testes unitários