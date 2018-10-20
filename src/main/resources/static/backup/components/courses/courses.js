function init(template) {
    $.ajax({
        url: "api/courses/",
        type: "GET"
    }).done(function(data){
        dust.renderSource(template, data, function (err, out) {
        $("#content").empty().append(out);
        var $buttons = $(".btn-danger");
        $buttons.unbind("click.deleteClick");
        $buttons.on("click.deleteClick", function() {
            var id = $(this).attr("data-id");
            $.ajax({
                url: "api/courses/" + id,
                type: "DELETE"
            }).done(function () {
                $('tr[data-id="' + id + '"]').remove();
            });
        });
    });  
  }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
  });
}