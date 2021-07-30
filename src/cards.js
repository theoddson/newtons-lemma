//Autor
//https://codepen.io/sdthornton/pen/JRqQWb/
//by Samuel Thornton



    document.querySelectorAll('.btn--pagination').forEach(function (arrow) {
        var target = document.querySelector(arrow.dataset.target);
        arrow.addEventListener('click', function (e) {
          document.querySelector('.visible-card').classList.remove('visible-card');
          target.classList.add('visible-card');
        }, false);
     
    
        
    
    });

    $('.onboard-trigger').on('click', function() {
        $('.how-to').show();
});

$('.close-how-to').on('click', function() {
    $('.how-to').hide().css("display","none");
    

});
$('.shade').on('click', function() {
    $('.how-to').hide().css("display","none");
});