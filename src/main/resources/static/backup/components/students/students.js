function init(template) {
    $.ajax({
        url: "api/students/",
        type: "GET"
    }).done(function(data){
        dust.renderSource(template, data, function (err, out) {
            $("#content").empty().append(out);
            var $buttons = $(".btn-danger");
            $buttons.unbind("click.deleteClick");
            $buttons.on("click.deleteClick", function() {
                var resultActionUser = confirm("Данный студент записан на: " + $('tr[data-id="' + $(this).attr("data-id") + '"]').contents()[2].textContent + ". Выполнить удаление?");
                if (resultActionUser) {
                    var id = $(this).attr("data-id")
                    $.ajax({
                        url: "api/students/" + id,
                        type: "DELETE"
                    }).done(function (result) {
                        $('tr[data-id="' + id + '"]').remove();
                    }).fail(function (XHR) {
                        console.log(XHR);
                    });
                }
            });
            $buttons = $(".btn-success");
            $buttons.unbind("click.saveClick");

        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}