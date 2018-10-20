function init(template) {
    var component = parseHash(window.location.hash);
    $.ajax({
        url: "api/courses/" + component.id,
        type: "GET"
    }).done(function(data) {
        console.log(data);
        var arrayOfDays = [];
        // Создаём массив дней равный продолжительности курса
        for (var i = 0; i < data.numOfDays; i++) {
            arrayOfDays.push(i + 1);
        }
        // Если пришел не полный массив с оценками, то дозаполняем его
        for (var i = 0; i < data.marks.length; i++) {
            var temporaryIterator = data.numOfDays - data.marks[i].values.length;
            for (var j = 0; j < temporaryIterator; j++) {
                data.marks[i].values.push(0);
            }
        }
        data.days = arrayOfDays;
        dust.renderSource(template, data, function(err, out) {
            $("#content").empty().append(out);
            delete data.freeStudents;
            // Добавляем id ячейкам
            var $studentMark = $(".student-mark");
            for (var i = 0; i < $studentMark.length / data.numOfDays; i++) {
                for (var j = 0; j < data.numOfDays; j++) {
                    $studentMark[i * data.numOfDays + j].id = i + "-" + j;
                }
            }
            $studentMark.unbind("change");
            $studentMark.on("change", function() {
                // Тут изменяем нашу оценку в data
                var idCourse = $(this).attr("id").split('-')[0];
                var idStudent = $(this).attr("id").split('-')[1];
                data.marks[idCourse].values[idStudent] = $("#" + $(this).attr("id") + " option:selected").val();
            });

            // Сохраняем наши оценки
            var $button = $(".btn-success");
            $button.unbind("click.saveClick");
            $button.on("click.saveClick", function() {
                $.ajax({
                    url: "api/courses/" + component.id,
                    type: "PUT",
                    data: JSON.stringify(data),
                    contentType: "application/json"
                }).done(function() {
                    $(this).remove();
                });
            });

            // Запись студента на курс
            var $buttons = $(".btn-primary");
            $buttons.unbind("click.addClick");
            $buttons.on("click.addClick", function() {
                $.ajax({
                    url: "api/courses/" + component.id + "/students/" + $(this).attr("id"),
                    type: "PUT"
                }).done(function() {
                    console.log("zapisalsya");
                    init(template);
                });
            });

        });
    }).fail(function(XHR) {
        console.log("We are in 1 error");
        console.log(XHR);
    });
}