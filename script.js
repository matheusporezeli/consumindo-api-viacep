//RESUMO:
//identificar o fluxo de eventos do JavaScript e como ele funciona, através do Event Loop, do Task Queue e do Call Stack.
//como consumir uma API
//Fetch API, das Promises e dos métodos dessas Promises
//tratar os dados retornados de API
// manipular o DOM para captar o valor que aquele usuário colocou na tela de cadastro e depois, para autopreencher aqueles valores retornados da API, nos outros campos desse site.

//Diferenciar os termos event loop, call stack e task queue;
//JS Síncrono e Assíncrono;

//Callbacks são, basicamente, funções enviadas como parâmetro para outras funções; muito usado para requisições;
//Fetch é um método assíncriono que tem como parâmetro a url da api e retornou uma promise;
//Promise é uma promessa que algo vai acontecer;
//.then() - então faça o que está dentro dos parênteses; PROMISSE RESOLVIDA
//.json() - retornar uma resposta con valores que podem ser acessados;
//.catch - pega o erro e imprime na tela com um console.log; PROMISSE REJEITADA
//.finally - mosta a mensagem colocada independente do resultado da promise
//async await - método de declarar uma função assíncrona
//try {} - tenta realizar o que foi declarado / método pra que o async await mostre caso dê erro
//promise.all - resolve as promises e transforma em arrays novamente
//focusout - executa quando o usuario clica fora do item

//Código para testar métodos:
// .then(resposta => resposta.json())
// .then(r => {
//     if (r.erro){
//         throw Error('Esse CEP não existe!') //Mostra a mensagem caso o cep não exista
//     } else
//     console.log(r)})
// .catch(erro => console.log(erro))
// .finally(mensagem => console.log('Processamento concluído!'))

// let ceps = ['01001000', '01001001'] //monta um array com vários ceps
// let conjuntoDeCeps = ceps.map(valores => buscaEndereco(valores)) //transforma o array em promises
// Promise.all(conjuntoDeCeps).then(respostas => console.log(respostas)) //resolve as promises e transforma em arrays novamente

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ""
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente')
        }
        var logradouro = document.getElementById('endereco')
        var bairro = document.getElementById('bairro')
        var cidade = document.getElementById('cidade')
        var estado = document.getElementById('estado')

        cidade.value = consultaCEPConvertida.localidade
        bairro.value = consultaCEPConvertida.bairro
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    } catch (erro) {
        mensagemErro.innerHTML = `<p class="erro__cep">CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))