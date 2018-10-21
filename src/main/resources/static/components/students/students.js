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
				var id = $(this).attr("data-id")
				var listOfCourses = $('tr[data-id="' + id + '"]').contents()[2].textContent;
				var message = "";
				if (!listOfCourses == "") {
					message += "Данный студент записан на: <br/>" + listOfCourses;
				} else {
					message += "Данный студент не записан на курсы";
				}
				message += ".<br/> Выполнить удаление?";
				var text = $("#deleteModal")[0].innerHTML;
				var startText = text.substring(0, text.indexOf("<p>"))
				var endText = text.substring(text.indexOf("</p>"), text.length)
				var newText = startText + message + endText;
				$("#deleteModal")[0].innerHTML = newText;
				$("#deleteModal").modal();
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
					$("#addModal").modal();
				}).fail(function (XHR) {
					console.log("Ошибка при создании студента");
					console.error(XHR);
				});
			});

			$('#addModal').on('hidden.bs.modal', function (event) {
				init(template);
			});
		});
	}).fail(function (XHR) {
		console.log("We are in 1 error");
		console.error(XHR);
	});
}