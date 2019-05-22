$(document).ready(function() {
    $('head').append($('<div class="kill">').load('/resources/fragments/head.html', function() {
        $('head').append($(this).find('#bootstrap').html());
        $('body').prepend($(this).find('#navbar'));
    }));
    $('.kill').remove();
});
