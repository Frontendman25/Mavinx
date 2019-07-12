$(document).ready(function () {
    // exit from account
    const $exit_btn = $('.menu-rigt__exit')

    $exit_btn.on('click', (e) => {
        $.ajax({
            type: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', localStorage.getItem('token'));
            },
            url: 'http://prozorro.test/api/logout',
            success: function (response) {
                console.log(response)
                localStorage.removeItem('token')
                const loc = window.location.pathname;
                const dir = loc.substring(0, loc.lastIndexOf('/'));
                location.pathname = `${dir}/login.html`
            }
        });
    })

    // slider-range
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [75, 300],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
})