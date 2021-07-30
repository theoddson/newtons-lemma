 

/*~~~~~
 1) Menu: This controls the hamburger menu and nav drawer
 ~~~~~*/
$( document ).ready(function() {
    //$('.nav-drawer').hide();   
        $('.btn__menu').on('click',
        function() {
            $('.nav-drawer').toggleClass('animateIn');
            
            $('.btn__menu').toggleClass('exit-ani');
            //shows the overlay shade
            $('#shade').fadeToggle('fast');
        });
    $('#shade').on('click', function() {
       $('.nav-drawer').hide();
        $('.btn__menu').toggleClass('exit-ani');
        $('#shade').toggle();
    }); 

});

/*~~~~~
 2) Switch: 
 This controls the translation switch
 ~~~~~*/
$( document ).ready(function() {
    $('.informal').hide();
//translates the description text, changes the model style from b&w to color 
function translate(){
    $('.desc').find('.informal, .newton').fadeToggle( "fast", "linear" );
    $('.video-desktop').toggle();
    $('.label').toggle();
    $('.diff-row').toggleClass('flex');
    $('.model').toggleClass('informalcolor');
    $('.switch').toggleClass('flip');
    $('.areas').toggleClass('dull');//area labels color vs black toggle
}
    $(".switch").click(function() {
        translate();
    });
    $(".switch__track").click(function() {
        translate();
    });
});
 
 
 
 /*~~~~~
 3) Tabs: 
 This chunk of code controls the tabs (i.e 'Areas' 'Claim' 'Proof')
 ~~~~~*/
 $(".default-content").show();
 
    function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("desc-tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tab = document.getElementsByClassName("Tab");
    for (i = 0; i < tab.length; i++) {
        tab[i].className = tab[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}



/*~~~
4) Text: 
Making it so that you only have to update the copy text of the Claim
and Proof descriptions in the one place.
The mobile tab UI will grabb the innerHTML from its desktop counterpart
and populate itself
~~~~~*/
   
    var claimForMobile = document.getElementById("claim-og").innerHTML;
    document.getElementById("claim").innerHTML = claimForMobile;
    var proofForMobile = document.getElementById("proof-og").innerHTML;
    document.getElementById("proof").innerHTML = proofForMobile;


/*~~~~~
 5) Mobile video
 ~~~~~*/
 $( document ).ready(function() {
    $('.video-mobile-wrapper').hide();   
        $('.video-btn').on('click',
        function() {
            $('.video-mobile-wrapper').toggle();
            
           
        });
    $('.video-mobile-wrapper').on('click', function() {
       $('.video-mobile-wrapper').hide();
    }); 

});


