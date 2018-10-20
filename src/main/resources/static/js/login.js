$(document).ready(function ($) {
	$('#loginForm').submit(function (event) {
		event.preventDefault();
		var data = 'username=' + $('#inputLogin').val() + '&password=' + $('#inputPassword').val();
		$.ajax({
			data: data,
			timeout: 1000,
			type: 'POST',
			url: '/login'

		}).done(function() {
			window.location.href = '/';
		}).fail(function() {
			console.error('Не залогинился!');
		});
	});
});
