function init(template) {
    $.ajax({
        url: "api/metrics/",
        type: "GET"
    }).done(function(data){
        dust.renderSource(template, data, function (err, out) {
            $("#content").empty().append(out);
        });
    }).fail(function(XHR) {
        console.log("Ошибка при загрузке главной страницы");
        console.error(XHR);
    });
}