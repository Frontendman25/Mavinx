$(document).ready(function () {
    const formLogin = document.querySelector('#formLogin')
    const inputs = [...document.querySelectorAll('input')]
    inputs.forEach(el => {
        el.addEventListener('input', () => {
            el.style.borderColor = 'initial'
        })
    })
    
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = $(this).serialize()
        console.log(formData)
        $.post('http://68.183.119.148/api/login', formData, function (response) {
            const { status, message, token } = response
            console.log('response from Login - ', response)
            if (status) {
                localStorage.setItem('token', token);
                const loc = window.location.pathname;
                const dir = loc.substring(0, loc.lastIndexOf('/'));
                location.pathname = `${dir}/main.html`
            }
        })
        .fail(() => {
            inputs.forEach(el => el.style.borderColor = 'red')
            alert('Something wrong :(')
        })
    })
})