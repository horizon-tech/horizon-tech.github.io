/**
 * Created by Nitin on 18/05/2014.
 */
    /* Get image current index and globally declared.*/
var current_img_index=1;
$(document).ready(function(){

    var auto_slide = 1;
    var hover_pause = 1;
    var key_slide = 1;


    //speed of auto slide(
    var auto_slide_seconds = 5000;
    /* IMPORTANT: i know the variable is called ...seconds but it's
     in milliseconds ( multiplied with 1000) '*/

    /*move the last list item before the first item. The purpose of this is
     if the user clicks to slide left he will be able to see the last item.*/
    $('#carousel_ul li:first').before($('#carousel_ul li:last'));

    //check if auto sliding is enabled
    if(auto_slide == 1){
        /*set the interval (loop) to call function slide with option 'right'
         and set the interval time to the variable we declared previously */
        var timer = setInterval('slide("right")', auto_slide_seconds);

        /*and change the value of our hidden field that hold info about
         the interval, setting it to the number of milliseconds we declared previously*/
        $('#hidden_auto_slide_seconds').val(auto_slide_seconds);
    }

    //check if hover pause is enabled
    if(hover_pause == 1){
        //when hovered over the list
        $('#carousel_ul').hover(function(){
            //stop the interval
            clearInterval(timer);
        },function(){
            //and when mouseout start it again
            timer = setInterval('slide("right")', auto_slide_seconds);
        });

    }

    $(".slicknav_icon").click(function () {

        $("#menu").slideToggle();


    });


    //check if key sliding is enabled
    var key_slide=1;
    if(key_slide == 1){

        //binding keypress event type
        $(document).bind('keypress', function(e) {
            //keyCode for left arrow is 37 and for right it's 39 '
            if(e.keyCode==37){
                //initialize the slide to left function
                slide('left');
            }else if(e.keyCode==39){
                //initialize the slide to right function
                slide('right');
            }
        });

    }
//    for small control for carousel. counting all li in carousel and putting id's to li for "controls".


//        var count = 0;
//        $('#carousel_ul>li').each(function () {
//
//            count++;
//            /* using data index is custom variable.it will store index for each image. */
//             li = "<li>"+"<a href=" + "#" +count + "data-index=" + count + "> Page " + count + "</a></li>";
//
//            $('#controls').append(li);
//
//
//        });


        $('#controls>li').on('click', 'a[data-target]', function(e) {

            /* this. index will be string so it need to parse into an integer.*/
            var li_control_index = parseInt($(this).data('index'));
            /* if index of li is greater then current image index then get difference and slide right that many times.*/
            if(li_control_index>current_img_index) {
                var i = li_control_index - current_img_index;
                for (var j = 0; j < i; j++) {
                    /* this function helps to set interval between switching image.*/
                    setTimeout(slide("right"), 1000);

                }
            }else{
                /* if index of li is greater then current image index then get difference and slide left that many times.*/
                var i =current_img_index - li_control_index;
                for (var j = 0; j < i; j++) {
                    setTimeout(slide("left"),1000);
                }
            }


//            $('#carousel_ul li').animate({"scrollLeft":item_width});
//            $("#carousel_ul>li").fadeOut();
//           $("#carousel_ul li:nth-child("+id+")").addClass("active").fadeIn();

        });

    });
function slide(where){

    //get the item width
    var item_width = $('#carousel_ul li').outerWidth() + 10;


    /* using a if statement and the where variable check
     we will check where the user wants to slide (left or right)*/
    if(where == 'left'){
        //...calculating the new left indent of the unordered list (ul) for left sliding
        var left_indent = parseInt($('#carousel_ul').css('left')) + item_width;
        /* if current image index is 1 then go to 4 else decrement it.*/
        if(current_img_index==1){
            current_img_index=4;
        }
        else{
            current_img_index = current_img_index-1;
        }
//        console.log(current_img_index);

    }else{
        //...calculating the new left indent of the unordered list (ul) for right sliding
        var left_indent = parseInt($('#carousel_ul').css('left')) - item_width;
        /* if current image index is 1 then go to 4 else increment it.*/
        if(current_img_index==4){
            current_img_index=1;
        }
        else{
            current_img_index=current_img_index+1;
        }
//        console.log(current_img_index);

    }

    //make the sliding effect using jQuery's animate function... '
    $('#carousel_ul:not(:animated)').animate({'left' : left_indent},500,function(){

        /* when the animation finishes use the if statement again, and make an ilussion
         of infinity by changing place of last or first item*/
        if(where == 'left'){
            //...and if it slided to left we put the last item before the first item
            $('#carousel_ul li:first').before($('#carousel_ul li:last'));
        }else{
            //...and if it slided to right we put the first item after the last item
            $('#carousel_ul li:last').after($('#carousel_ul li:first'));
        }

        //...and then just get back the default left indent
        $('#carousel_ul').css({'left' : '0px'});
    });

}
