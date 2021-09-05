$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $("#mycarousel").carousel({ interval: 2000 });
    $("#carouselButton").click(function() {
        if ($("#carouselButton").children('span').hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $("#carouselButton").children('span').removeClass('fa-pause');
            $("#carouselButton").children('span').addClass('fa-play');
        } else if ($("#carouselButton").children('span').hasClass('fa-play')) {
            $("#mycarousel").carousel('cycle');
            $("#carouselButton").children('span').removeClass('fa-play');
            $("#carouselButton").children('span').addClass('fa-pause');
        }

    });
});


function toggleText() {
    var points = document.getElementById("points");

    var showMoreText = document.getElementById("moreText");

    var buttonText = document.getElementById("textButton");

    if (points.style.display === "none") {
        showMoreText.style.display = "none";
        points.style.display = "inline";
        buttonText.innerHTML = "Show More";
    } else {
        showMoreText.style.display = "inline";
        points.style.display = "none";
        buttonText.innerHTML = "Show Less";
    }
}