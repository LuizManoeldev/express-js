const express = require('express'); // importando o express
const app = express(); // chamando o construtor 
const bodyParser = require('body-parser');

const saudacao = require('./saudacaoMid'); // import

const usuarioApi = require('./api/usuario');
// passando uma funcao para cada tipo de requisicao
app.get('/usuario', usuarioApi.obter)
app.post('/usuario', usuarioApi.salvar)

//passando estas funcões diretamento no outro modulo
const produtoApi = require('./api/produto')
produtoApi(app, ' realizado!')

app.use(bodyParser.text()); // qualquer texto que chegue dentro do body sera interpretado 
app.use(bodyParser.json())  // qualquer json do body sera interpretado
app.use(bodyParser.urlencoded({ extended: true })) // qualquer urlencoded(quando um forme é enviado) do body sera interpretado

app.use(saudacao("Guilherme"))


// Protocolo HTTP utiliza o padrao requisição -> resposta 
//  use responde/serve para todos os tipos de requisição(get, post, put, delete)
app.use('/opa',(req, res, next) => {
    //console.log("antes....")
    next()
})

//retornando com query, acessando parametros da propria url
app.get('/clientes/relatorio', (req, res, next) => {
    res.send(`Cliente relatorio: Completo = ${req.query.completo} ano = ${req.query.ano}`)
})

//recebendo via post e pelo corpo da requisicao / com bodyparse 
app.post('/corpo', (req, res, next) => {
    // Maneira mais dificil
   /*  let corpo = ''
    req.on('data', (parte) => {
        corpo += parte
    })

    req.on('end', () => {
       res.send(corpo)
    })  */

    //Com body parser
    res.send(req.body)
})

app.get('/clientes/:id', (req, res, next) => {
    res.send(`Cliente ${req.params.id} selecionado!`)
})



app.get('/opa',(req, res, next) => {
    //retornar array com jsons - json mais comum!
    res.json([
        {
            name: 'iphone 32gb',
            price: 2999.00,
            discount: 0.12
        },
        {
            name: 'ipad 32gb',
            price: 1899.00,
            discount: 0.12
        },
        {
            name: 'macbook 32gb',
            price: 7000.00,
            discount: 0.12
        }
    ])
    //console.log('durante...')
    next()
   
    //responde um json - mais comum
    /* res.json({
        name: 'ipad 32gb',
        price: 1899.00,
        discount: 0.12
    })
     */
    
    //res.send("Estou bem") // pode ser enviado codigo html
})

app.use('/opa',(req, res) => {
    //console.log("depois....")
})

app.listen(3000, () => { // startando o express na porta 3000 + callback para mostrar mensagem
    console.log('listening on port 3000')
}) 