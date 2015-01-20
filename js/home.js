$(document).ready(function(){
    var currentImage,nextImage;
    var hover_pause = 1;
    var auto_slide=1;
    var timer;
    var current_img_index=1;


    /* auto_slide is global variable.when page is loads carousel starts. it rotate right so we called carousel right.*/

    if(auto_slide==1){
        /* after certain interval we call carousel right function */
         timer= setInterval(function() {carouselRight()},5000);
    }

    /* if hover then stop the carousel else start again hover_pause is global variable*/

    if(hover_pause == 1){
        //when hovered over the list
        $('.carousel-inner').hover(function(){
            //stop the interval
            clearInterval(timer);
        },function() {
            //and when mouseout start it again
           timer= setInterval(function() {carouselRight()},3000);

        });

    }
        /* when you click on left and previous link call respective functions*/

    $(".nextLink").on("click",function(e){
        carouselRight();
    });

    $(".previousLink").on("click",function(e){
        carouselLeft();
    });


    function carouselRight(){

            currentImage = $(".image-shown");
                 nextImage=currentImage.next();
                if($(nextImage).length==0) {
                    nextImage = $(".carousel-inner img").first();
                }
                    currentImage.removeClass("image-shown").addClass("image-hide").css("z-index:-10");
                    nextImage.removeClass("image-hide").addClass("image-shown").css("z-index:10");
                    $(".carousel-inner img").not([nextImage, currentImage]).css("z-index:1");
//                    e.preventDefault();

        /* to make the image rotate if the index is 4 then make it first image in a queue else increment it by 1 */

                if(current_img_index==4){
                        current_img_index=1;
                    }
                    else{
                        current_img_index=current_img_index+1;
                    }
                addActiveLink();
              }

    function carouselLeft() {

        currentImage = $(".image-shown");
        nextImage = currentImage.prev();

        if ($(nextImage).length == 0) {
            nextImage = $(".carousel-inner img").last();
        }
        currentImage.removeClass("image-shown").addClass("image-hide").css("z-index:-10");
        nextImage.removeClass("image-hide").addClass("image-shown").css("z-index:10");
        $(".carousel-inner img").not([nextImage, currentImage]).css("z-index:1");
//        e.preventDefault();

        /* to make the image rotate if the index is 1 then make it last image in a queue else decrement it by 1 */

        if(current_img_index==1){
            current_img_index=4;
        }
        else{
            current_img_index=current_img_index-1;
        }
        }
                /*Pagination slider*/
        function addActiveLink(){

            currentImage = $(".image-shown");
            /* get the current image index*/
            var imageId = parseInt(currentImage.data('index'));

            /* get the data target of each "a" tag match with current image index*/
              $("#controls>li").find("a").each(function(index) {

                   if(index == imageId) {
                        $(this).addClass('activeLink');


                        } else {
                        $(this).removeClass('activeLink');
                                }
              });

        }
                    /* Pagination controls*/



    $('#controls>li').on('click', 'a[data-target]', function(e) {

        /* this. index will be string so it need to parse into an integer.*/
        var li_control_index = parseInt($(this).data('target'));

        /* if index of li is greater then current image index then get difference and slide right that many times.*/
        if(li_control_index>current_img_index) {

            var i = li_control_index - current_img_index;
            for (var j = 0; j < i; j++) {
                /* this function helps to set interval between switching image.*/
                setTimeout(carouselRight(), 1000);
            }
        }else{
            /* if index of li is greater then current image index then get difference and slide left that many times.*/
            var i =current_img_index - li_control_index;
            for (var j = 0; j < i; j++) {
                setTimeout(carouselLeft(),1000);

            }
        }
    });
});