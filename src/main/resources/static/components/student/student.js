function init(template) {
    var component = parseHash(window.location.hash);
    $.ajax({
        url: "api/students/" + component.id,
        type: "GET"
    }).done(function(data) {
        dust.renderSource(template, data, function(err, out) {
            $("#content").empty().append(out);
            $('#updateStudentForm').submit(function(event) {
                event.preventDefault();
                data.name = $('input[name="name"]').val();
                data.email = $('input[name="email"]').val();
                data.phone = $('input[name="phone"]').val();
                $.ajax({
                    url: "api/students/" + component.id,
                    type: "PUT",
                    data: JSON.stringify(data),
                    contentType: "application/json"
                }).done(function() {
                }).fail(function(XHR) {
                    console.log("Ошибка при обновлении студента");
                    console.error(XHR);
                });
            });
            var $buttons = $(".btn-success");
            $buttons.unbind("click.updateClick");
            $buttons.on("click.updateClick", function() {
            });
        });
    }).fail(function(XHR) {
        console.log("Ошибка при загрузке студента");
        console.error(XHR);
    });
}
