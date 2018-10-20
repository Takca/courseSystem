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
                    console.log("otpravilos'");
                }).fail(function(XHR) {
                    console.log("We are in 1 error");
                    console.log(XHR);
                });
            });

            var $buttons = $(".btn-success");
            $buttons.unbind("click.updateClick");
            $buttons.on("click.updateClick", function() {

            });
        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}

//                // Дополняем контент страницы списком курсов
//                var addTempalete = '';
//                var checked = false;
//                var templateObjectCourse = '';
//                for (var i = 0; i < listOfCourses.length; i++) {
//                    checked = false;
//                    for (var j = 0; j < data.courses.length; j++) {
//                        if (data.courses[j].id == listOfCourses[i].id) {
//                            checked = true;
//                            break;
//                        }
//
//                    }
//                        if (!checked) {
//                            addTempalete += '<p><input type="checkbox" id="' + listOfCourses[i].id + '>' + listOfCourses[i].name + '</p>';
//                        }
//                }
//                if(addTempalete != '') {
//                    addTempalete += '<br/><div>' + addTempalete + '</div>'
//                }
//                $("#content").prepend(addTempalete);
//            }).fail(function(XHR) {
//                console.log("Error in block get list of courses")
//                console.log(XHR);
//             });
//
//
//                var $temporaryList = $('input[type="checkbox"]');
//                $temporaryList.unbind("click.getCourseClick");
//                $temporaryList.on("click.getCourseClick", function() {
//
//                    $.ajax({
//                        url: "courses/" + $(this).attr("id")  + "/students/"+ component.id,
//                        type: "GET",
//
//                    }).done(function (result) {
//                                              $('input[id="' + id + '"]').remove();
//                                          }).fail(function (XHR) {
//                                              console.log(XHR);
//                                          });