function init(template) {
    $.ajax({
        url: "api/courses/",
        type: "GET"
    }).done(function(data) {
        dust.renderSource(template, data, function(err, out) {
            $("#content").empty().append(out);
            var $buttons = $(".btn-danger");
            $buttons.unbind("click.deleteClick");
            $buttons.on("click.deleteClick", function() {
                var id = $(this).attr("data-id");
                $.ajax({
                    url: "api/courses/" + id,
                    type: "DELETE"
                }).done(function() {
                    $('tr[data-id="' + id + '"]').remove();
                });
            });

            $('#addCourseForm').submit(function(event) {
                event.preventDefault();
                var course = {
                    id: '0',
                    name: $('input[id="inputName"]').val(),
                    dateStart: $('input[id="inputDateStart"]').val(),
                    dateEnd: $('input[id="inputDateEnd"]').val(),
                    numOfDays: $('input[id="inputNumOfDays"]').val(),
                    students: [],
                };
                $.ajax({
                    url: "api/courses/",
                    type: "POST",
                    data: JSON.stringify(course),
                    contentType: "application/json",
                }).done(function() {
                    init(template);
                }).fail(function(XHR) {
                    console.error(XHR);
                });
            });

        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}