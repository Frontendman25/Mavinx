// https://cors-anywhere.herokuapp.com/
$(document).ready(function () {
  const formRegistration = document.querySelector('#formRegistration')
  const inputs = [...document.querySelectorAll('input')]
  const  succesBanner = document.querySelector('.succes-banner')

  inputs.forEach(el => {
    el.addEventListener('input', () => {
      el.style.borderColor = 'initial'
      el.nextElementSibling.style.display = 'none'
    })
  })

  const showErrors = (message) => {
    let names = ''
    const namesArray = []
    const namesMessageArray = []

    for (var prop in message) {
      names += `input[name=${prop}], `
      namesArray.push(prop)
      namesMessageArray.push(message[prop])
    }

    const formatedNames = names.substring(0, names.length - 2)

    const errorInputs = [...formRegistration.querySelectorAll(formatedNames)]

    errorInputs.forEach((errorInput) => {
      errorInput.nextElementSibling.style.display = 'none'
      errorInput.nextElementSibling.innerText = ''
    })

    errorInputs.forEach((errorInput, index) => {
      errorInput.style.borderColor = 'red'
      errorInput.nextElementSibling.style.display = 'block'
      errorInput.nextElementSibling.innerText = namesMessageArray[index]
    })
  }

  
  function postAJAXFormRegistration(e) {
    e.preventDefault()
    const formData = $(this).serialize()
    
    $.post('http://68.183.119.148/api/register', formData, function (response) {
      const { status, message } = response
      console.log('response from Registration - ', response)
      if (status) {
        succesBanner.classList.add('showSuccesBanner')

        setTimeout(() => {
          const loc = window.location.pathname;
          const dir = loc.substring(0, loc.lastIndexOf('/'));
          location.pathname = `${dir}/login.html`
        }, 2000);
      } else {
        showErrors(message)
      }
    })
  }

  formRegistration.addEventListener('submit', postAJAXFormRegistration)
})