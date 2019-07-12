// https://cors-anywhere.herokuapp.com/
$(document).ready(function () {
    const formEdit = document.querySelector('#formEdit')

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

        const errorInputs = [...formEdit.querySelectorAll(formatedNames)]

        errorInputs.forEach((errorInput) => {
            errorInput.value = ''


            errorInputs.forEach((errorInput, index) => {
                errorInput.value = namesMessageArray[index]
            })
        })
    }

    function fillInputsValuesFromAJAx() {
        $.ajax({
            type: 'POST',
            beforeSend: function (request) {
                const token = localStorage.getItem('token')
                request.setRequestHeader('Authorization', token)
            },
            url: 'http://prozorro.test/api/edit-user',
            success: function (response, textData, request) {
                console.log('response - ', response)
            }
        });
    }

    fillInputsValuesFromAJAx()

    function postAJAXformEdit(e) {
        e.preventDefault()
        const formData = $(this).serialize()

        $.post('http://68.183.119.148/api/register', formData, function (response) {
            const { status, message } = response
            if (status) {
                const loc = window.location.pathname;
                const dir = loc.substring(0, loc.lastIndexOf('/'));
                location.pathname = `${dir}/login.html`
            } else {
                showErrors(message)
            }
        })
    }

    formEdit.addEventListener('submit', postAJAXformEdit)
})