function init(template) {
	$.ajax({
		url: "api/students/",
		type: "GET"
	}).done(function (data) {
		dust.renderSource(template, data, function (err, out) {
			$("#content").empty().append(out);
			var $buttons = $(".btn-danger");
			$buttons.unbind("click.deleteClick");
			$buttons.on("click.deleteClick", function () {
				var id = $(this).attr("data-id");
				deleteModal(template, id);
			});
			$('#addStudentForm').submit(function (event) {
				event.preventDefault();
				var student = {
					id: 0,
					name: $('input[id="inputName"]').val(),
					email: $('input[id="inputEmail"]').val(),
					phone: $('input[id="inputPhone"]').val(),
					courses: []
				};
				$.ajax({
					url: "api/students/",
					type: "POST",
					data: JSON.stringify(student),
					contentType: "application/json",
				}).done(function () {
					$("#myModal").modal();
				}).fail(function (XHR) {
					console.log("Ошибка при создании студента");
					console.error(XHR);
				});
			});
			$('#myModal').on('hidden.bs.modal', function (event) {
				init(template);
			});
		});
	}).fail(function (XHR) {
		console.log("We are in 1 error");
		console.error(XHR);
	});
}

function deleteModal(template, id) {
	$("#myModal").find(".modal-title").text("Удаление студента");
	var listOfCourses = $('tr[data-id="' + id + '"]').contents()[2].textContent;
	var message = "";
	if (listOfCourses != "") {
		message += "Данный студент записан на: " + listOfCourses;
	} else {
		message += "Данный студент не записан на курсы";
	}
	message += ". Выполнить удаление?";
	$("#myModal").find("p").text(message);
	var html = "<button id=\"acceptDelete\" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Да</button><button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Отмена</button>";
	$("#myModal").find(".modal-footer")[0].innerHTML = html;
	var $acceptButton = $("#acceptDelete");
	$acceptButton.unbind("click.deleteClick");
	$acceptButton.on("click.deleteClick", function () {
		$.ajax({
			url: "api/students/" + id,
			type: "DELETE"
		}).done(function (result) {
			init(template);
		}).fail(function (XHR) {
			console.log("Ошибка при удалении студента");
			console.error(XHR);
		});
	});
	$("#myModal").modal();
}