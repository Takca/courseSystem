function init(template) {
    var component = parseHash(window.location.hash);

    $.ajax({
        url: "api/courses/" + component.id,
        type: "GET"
    }).done(function(data){
        dust.renderSource(template, data, function (err, out) {
            $("#content").empty().append(out);
        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}