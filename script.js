const url = "http://localhost:5500"
const urlExterna = "https://5000-liedsonrm-paymentsystem-i91xw3ppber.ws-us60.gitpod.io"

const logar = () => {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    axios.post(urlExterna + "/login", {
        email,
        password: senha
    })
    .then(async (content) => {
        var token = content.data.user.token
        window.location.href = `${url}/pages/secretpage.html?tok=${token}`
        console.log(token)
    })
    .catch(err => console.error(err))
}

const registrar = () => {
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    if(!(nome || sobrenome || email || senha)){
        document.getElementById("alert").innerHTML = "Todos os campos devem estar preenchidos."
        return
    }
    axios.post(urlExterna+"/register", {
        first_name: nome, 
        last_name: sobrenome, 
        email: email, 
        password: senha,
    })
    .then(async (content) => {
        
        window.location.href = `${url}/secretpage.html?tok=${token}`
        console.log(content.data)
        
    })
    .catch(err => {
        const message = err.response.data        
        document.getElementById("alert").innerHTML = message
    }
    )

}

const loadSecret = () => {
    var token = window.location.href.split('=')[1]
    console.log(token)

    axios.get(urlExterna + "/paginasecreta", { params: { token: token } })
    .then(content => {
        var { first_name, liMoney } = content.data
        console.log(first_name, liMoney)
        document.getElementById('p').innerHTML = `Ola ${first_name}, seja bem vindo ao nosso site.\n Seu saldo é de R$${liMoney}`
    })
    
}

const paymentPage = () => {
    var token = window.location.href.split('=')[1]
    console.log(token)
    window.location.href = `${url}/pages/pagar.html?tok=${token}`
}

const pagar = () => {
    var token = window.location.href.split('=')[1]
    console.log(token)

    const email = document.getElementById("email").value
    const value = document.getElementById("value").value
    axios.post(urlExterna+"/payment",{
        destinatary: email, 
        value,
    }, {
        params: { token: token }
    })
    .then(content => {
        console.log(content)
        document.getElementById("done").innerHTML =  ""
        document.getElementById("alert").innerHTML = ""
        document.getElementById("done").innerHTML =  content.data
    })
    .catch(err => {
        console.log(err)
        document.getElementById("done").innerHTML =  ""
        document.getElementById("alert").innerHTML = ""
        document.getElementById("alert").innerHTML = err.response.data
})
}