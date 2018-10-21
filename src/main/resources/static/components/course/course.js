function init(template) {
	var component = parseHash(window.location.hash);
	$.ajax({
		url: "api/courses/" + component.id,
		type: "GET"
	}).done(function (data) {
		var arrayOfDays = [];
		// Создаём массив дней равный продолжительности курса
		for (var i = 0; i < data.numOfDays; i++) {
			arrayOfDays.push(i + 1);
		}
		data.days = arrayOfDays;
		dust.renderSource(template, data, function (err, out) {
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
			$studentMark.on("change", function () {
				// Тут изменяем нашу оценку в data
				var idCourse = $(this).attr("id").split('-')[0];
				var idStudent = $(this).attr("id").split('-')[1];
				data.marks[idCourse].values[idStudent] = $("#" + $(this).attr("id") + " option:selected").val();
			});
			// Сохраняем наши оценки
			var $button = $(".btn-success");
			$button.unbind("click.saveClick");
			$button.on("click.saveClick", function () {
				$.ajax({
					url: "api/courses/" + component.id,
					type: "PUT",
					data: JSON.stringify(data),
					contentType: "application/json"
				}).done(function () {
				    saveModal();
				}).fail(function (XHR) {
					console.log("Ошибка при сохранении оценок");
					console.error(XHR);
				});
			});
			// Запись студента на курс
			var $buttons = $(".btn-warning");
			$buttons.unbind("click.addClick");
			$buttons.on("click.addClick", function () {
				$.ajax({
					url: "api/courses/" + component.id + "/students/" + $(".free-students option:selected").val(),
					type: "PUT"
				}).done(function () {
					$("#myModal").modal();
				}).fail(function (XHR) {
					console.log("Ошибка записи студента на курс");
					console.error(XHR);
				});
			});
			$('#myModal').on('hidden.bs.modal', function(event) {
                init(template);
            });
		});
	}).fail(function (XHR) {
		console.log("Ошибка загрузки курса");
		console.error(XHR);
	});
}

function saveModal() {
	$("#myModal").find(".modal-title").text("Сохранение оценок");
	$("#myModal").find("p").text("Оценки успешно сохранены!");
	$("#myModal").modal();
}