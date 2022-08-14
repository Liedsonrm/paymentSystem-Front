const animated = document.getElementById('animated')

animated.addEventListener('animationend', () => {
  console.log('Animation ended');
  var gaia = document.getElementById('galinhos')
  var pagar = document.createElement("a")
  var emprestar = document.createElement("a")
  pagar.innerText = "Pagar"
  pagar.setAttribute('onclick','paymentPage()')
  pagar.classList.add('galinho')
  gaia.appendChild(pagar)
  emprestar.innerText = "Extrato"
  emprestar.classList.add('galinho')

  gaia.appendChild(emprestar)

});

