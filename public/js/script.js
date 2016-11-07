$(document).ready(function() {

	$('#btn-run-test').off().on('click', function(event) {
		event.preventDefault();

		// Empty preivious results from test-results div.
		$('#test-results').empty();

		// Mock the status through progress bar while ajax request is called.
		var progress = 0;
		$('.progress-bar').css('width', progress.toString() + '%');

		var progressInterval = setInterval(function() {
			progress += 15;
			$('.progress-bar').css('width', progress.toString() + '%');
		}, 1000);

		// Diable button while ajax request is called.
		$(this).attr('disabled', 'disabled');

		// Make ajax call to mock servers.
		$.ajax({
			url: 'http://localhost:3000/run-test',
			type: 'GET',
			dataType: 'json'
		}).done(function(response) {

			console.log(response);

			var title = $('<h1>').text('- RESULTS -');
			var server = $('<h2>').text(response.url);
			var status = $('<h2>').text('Status: ' + response.statusCode);
			var priority = $('<h2>').text('Priority: ' + response.priority);

			$('#test-results').append(title, server, status, priority);

			console.log("$.ajax .done");

		}).fail(function(error) {

			console.warn(error);
			console.warn("$.ajax .fail");

		}).always(function() {

			clearInterval(progressInterval);
			$('.progress-bar').css('width', '100%');
			$('#btn-run-test').removeAttr('disabled');

			console.log("$.ajax completed.");

		});

	});

});
