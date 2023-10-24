// trabalhando as requisições no arquivo separado
module.exports = (app, texto) => {
    function salvar(req, res){
        res.send("Produto > salvar" + texto)
    }
    
    function obter(req, res){
        res.send("Produto > obter" + texto)
    }

    app.get('/produto', obter)
    app.post('/produto', salvar)

    return {salvar, obter}
}