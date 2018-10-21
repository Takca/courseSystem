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
				$.ajax({
					url: "api/courses/" + id,
					type: "DELETE"
				}).done(function () {
					$('tr[data-id="' + id + '"]').remove();
				}).fail(function (XHR) {
					console.log("Ошибка при удалении курса");
					console.error(XHR);
				});
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
					init(template);
				}).fail(function (XHR) {
					console.log("Ошибка при создании курса");
					console.error(XHR);
				});
			});

			$('#addModal').on('hidden.bs.modal', function(event) {
                init(template);
            });
		});
	}).fail(function (XHR) {
		console.log("Ошибка загрузки курсов");
		console.error(XHR);
	});
}