function init(template) {
    var component = parseHash(window.location.hash);

    $.ajax({
        url: "api/students/" + component.id,
        type: "GET"
    }).done(function(data){
        dust.renderSource(template, data, function (err, out) {
            $("#content").empty().append(out);
            var $buttons = $(".btn-success");
            $buttons.unbind("click.updateClick");
            $buttons.on("click.updateClick", function() {
                data.name = $('input[name="name"]').val();
                data.email = $('input[name="email"]').val();
                data.phone = $('input[name="phone"]').val();
                // Курсы сюда
                $.ajax({
                    url: "api/students/" + component.id,
                    type: "PUT",
                    data: JSON.stringify(data),
                    contentType: "application/json"
                }).done(function() {
                    console.log("otpravilos'");
                }).fail(function(XHR) {
                    console.log("We are in 1 error");
                    console.log(XHR);
                });
            });
        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}