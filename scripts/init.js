$(document).ready(function(){

    $('.arrow_btn , .add_passion_wall').click(function(e){
        e.preventDefault();
        $('.arrow_btn.arrow_down').toggle();
        $('.arrow_btn.arrow_up').toggle();
        $('#center-nav-default').toggle();
        $('#center-nav-compound').toggle();
    });
    var showStatus = false;
    $('#tag').keyup(function( event ){
        if(event.keyCode == 13){
            $('#tagCollection').append('<button type='+'"submit"'+' class='+'"button"'+'>' + $(this).val() +'</button>');
            $('.button').each(function () {
                $(this).click( function(){
                    $(this).remove();
                });
            });
            $(this).val( '' );
        }
    });
    $('#needAccount').click(function(){
        showStatus = !showStatus;
        if(showStatus){
            $('#accountRegister').css('display', 'inline');
        }else{
            $('#accountRegister').css('display', 'none');
        }
    });
    $('#signMeButton').click(function(){
        showStatus = !showStatus;
        if(showStatus){
            $('#accountRegister').css('display', 'inline');
        }else{
            $('#accountRegister').css('display', 'none');
        }
    });
});