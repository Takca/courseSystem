function init(template) {
	$.ajax({
		url: "api/courses/",
		type: "GET"
	}).done(function (data) {
		dust.renderSource(template, data, function (err, out) {
			$("#content").empty().append(out);
			var $buttons = $(".btn-danger");
			$buttons.unbind("click.deleteClick");
			$buttons.on("click.deleteClick", function () {
				var id = $(this).attr("data-id");
				deleteModal(template, id)
			});

			$('#addCourseForm').submit(function (event) {
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
				}).done(function () {
					$("#myModal").modal();
				}).fail(function (XHR) {
					console.log("Ошибка при создании курса");
					console.error(XHR);
				});
			});

			$('#myModal').on('hidden.bs.modal', function(event) {
                init(template);
            });
		});
	}).fail(function (XHR) {
		console.log("Ошибка загрузки курсов");
		console.error(XHR);
	});
}

function deleteModal(template, id) {
	$("#myModal").find(".modal-title").text("Удаление курса");
	var listOfCourses = $('tr[data-id="' + id + '"]').contents()[5].textContent;
	var message = "";
	if (!listOfCourses == "") {
		message += "На данный курс записано: " + listOfCourses + " студент(ов)";
	} else {
		message += "На данный курс никто не записан";
	}
	message += ". Выполнить удаление?";
	$("#myModal").find("p").text(message);
	var html = "<button id=\"acceptDelete\" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Да</button><button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Отмена</button>";
	$("#myModal").find(".modal-footer")[0].innerHTML = html;
	var $acceptButton = $("#acceptDelete");
	$acceptButton.unbind("click.deleteClick");
	$acceptButton.on("click.deleteClick", function () {
		$.ajax({
			url: "api/courses/" + id,
			type: "DELETE"
		}).done(function (result) {
			init(template);
		}).fail(function (XHR) {
			console.log("Ошибка при удалении куоса");
			console.error(XHR);
		});
	});
	$("#myModal").modal();
}