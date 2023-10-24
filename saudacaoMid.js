// Funcao que retorna funcao middleware
// retornar funcao midle possibilita o uso de parametros passados no arquivo principal
function saudacao(nome){
    return function (req, res, next){
        console.log(`Seja bem vindo ${nome}`)
        next()
    }
}

module.exports = saudacao