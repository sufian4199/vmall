var userEmailID = "";

//COMMON FUNCTIONS
/************************************************************/

function GetEmail()
{
userEmailID =  Android.EmailGetter();
}

function AccessoriesActivity()
{
Android.createAccessoriesActivity();
}

function BeautyAndSpaActivity(){
Android.createBeautyAndSpaActivity();
}

function CosmeticsActivity(){
Android.createCosmeticsActivity();
}

function FashionActivity(){
Android.createFashionActivity();
}

function FoodActivity(){
Android.createFoodActivity();
}

function KidsActivity()
{
Android.createKidsActivity();
}

function LifeStyleActivity(){
Android.createLifeStyleActivity();
}

function PerfumeActivity(){
Android.createPerfumeActivity();
}

function HomeActivity()
{
Android.createHomeActivity();
}

function conatctactivity()
{
Android.createContactActivity();
}

function howWorks()
{
Android.createHowWorksActivity();
}

function AccountActivity()
{
Android.createProfileActivity();
}

function OrderActivity()
{
Android.orderNowActivity();
}

function getLocation(location)
{
Android.locationActivity(location);
}

function faq()
{
Android.faq_activity();
}

function trackOrder()
{
Android.track_order();
}

function wishlistFunc()
{
Android.create_wishlist();
}
/************************************************************/






function SLIDER_DATA(data)
{
var sliderHTML = "";
sliderHTML+='<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">';
sliderHTML+='<ol class="carousel-indicators">';


for(var i = 0 ; i < data.SLIDER_IMAGES_COUNT; i++)
{
if(i==0)
{
sliderHTML+='<li data-target="#carousel-example-generic" data-slide-to=\"';
sliderHTML+=i;
sliderHTML+='\" class="active"></li>';
}
else if(i>0)
{
sliderHTML+='<li data-target="#carousel-example-generic" data-slide-to=\"';
sliderHTML+=i;
sliderHTML+='\"></li>';
}
}


sliderHTML+='</ol>';
sliderHTML+='<div class="carousel-inner" role="listbox">';

for(var i = 0 ; i < data.SLIDER_IMAGES_COUNT; i++)
{
if(i==0)
{
sliderHTML+='<div class="item active">';
sliderHTML+='<img src="' + data.SLIDER_IMAGES[i] + '" alt="...">';
sliderHTML+='<div class="carousel-caption">';
sliderHTML+='</div>';
sliderHTML+='</div>';
}
else if(i>0)
{
sliderHTML+='<div class="item">';
sliderHTML+='<img src="' + data.SLIDER_IMAGES[i] + '" alt="...">';
sliderHTML+='<div class="carousel-caption">';
sliderHTML+='</div>';
sliderHTML+='</div>';
}
}



sliderHTML+='<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">';
sliderHTML+='<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
sliderHTML+='<span class="sr-only">Previous</span>';
sliderHTML+='</a>';
sliderHTML+='<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">';
sliderHTML+='<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
sliderHTML+='<span class="sr-only">Next</span>';
sliderHTML+='</a>';
sliderHTML+='</div>';
sliderHTML+='</div>';

return sliderHTML;
}


function HomeRequest()
{
	if(refresh){
		snd.play();
	}
	$.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'HOME' , USER_EMAIL_ID:userEmailID},  //userEmailID
		dataType: 'json',
		timeout:30000,
        success: function(data) {
        	if(data.STATUS=="SUCCESS")
        	{
        	    //var slider_html = "";
        	    //slider_html+=SLIDER_DATA(data.SLIDER_DATA);
        	    //$("#carousel-content").html(slider_html);

        		var returned_html="";
        		for(var i = 0; i < data.TOTALPOSTS ; i++)
        		{
                    console.log(data.DATA[i]);
        			returned_html+= PARSE_DATA(data.DATA[i]);
        		}
                console.log(returned_html);
        		$("#page-content").html(returned_html);
        	}
        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Something went wrong. Slide to refresh.");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h3>No Internet Connection.</h3></div>');
			}
		}
    });
}






//Category Wise search function

function KidsRequest()
{
    	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');

    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'KIDS' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Something went wrong! Slide down to refresh.");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}




function ColognesRequest()
{
    	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');

    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'COLOGNES' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Something went wrong! Slide down to refresh.");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}


function AutoRequest()
{
    	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');

    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'AUTO' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Something went wrong! Slide down to refresh.");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}



function DentalRequest()
{
    	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');

    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'DENTAL' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Something went wrong! Slide down to refresh.");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}



function FashionRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'FASHION' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}




function AccessoriesRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'ACCESSORIES' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }
        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}





function BeautyRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'BEAUTYSPA' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}





function CosmeticsRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'COSMETICS' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}





function FoodRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'FOOD' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}




function LifestyleRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'LIFESTYLE' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}





function PerfumeRequest()
{
	$("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'CATEGORY' , CATEGORY:'PERFUMES' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {

            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}


//Location Search



function LocationRequest(location)
{
    $("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'LOCATION' , LOCATION:location , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}

function WishList()
{
    $("#page-content").html('<div class="row text-center"><img style="margin-top:30%; width:60px; height:auto;" src="img/loader.gif"/></div>');
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'WISHLIST' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
        success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html('</br></br></br><center><h3>No deals available.</h3></br></br><p class ="label label-warning">Sorry, No deals available at the moment.</p></center>');
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        },
		error:function(x, t, m){
			if(t==="timeout") {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>Timeout: Your internet connection is slow.</h4></div>');
			} else {
				$("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
			}
		}
    });
}


/*

//POST_DETAIL && POSTID

//Details Page Function

function DetailRequest()
{
    $("#page-content").html("Loading...");
    $.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'POST_DETAIL' , LOCATION:'POSTID' , USER_EMAIL_ID:userEmailID},
        dataType: 'json',
        timeout:30000,
                success: function(data) {

            if(data.STATUS=="SUCCESS")
            {
                var returned_html="";
                for(var i = 0; i < data.TOTALPOSTS ; i++)
                {
                    returned_html+= PARSE_DATA(data.DATA[i]);
                }
                $("#page-content").html(returned_html);
            }

        	else if(data.STATUS=="FAIL")
        	{
				$("#page-content").html("No Deals available at the moment");
        	}
        	else //ERROR
        	{
				$("#page-content").html("Error here");
        	}
        }
    });
}

*/
//Like and Share functionalities



function likeIt(given_id) {
    var image = document.getElementById(given_id);
    $("#"+given_id).animate({
            left: '2.5px',
            top: '2.5px',
            height: '+=5px',
            width: '+=5px'
    }, "fast");
    if (image.src.match("disheart")) {
        image.src = "img/theme-icons/heart.png";
         $.ajax({
                type: "GET",
                url: "http://groupado.com/amsal/server.php",
                data: {REQUEST_TYPE:'LIKE_STATUS' , POST_ID:given_id , USER_EMAIL_ID:userEmailID},
                dataType: 'json',
                timeout:30000,
                success: function(data) {

                    if(data.STATUS=="SUCCESS")
                    {
                        if(data.POST_STATUS=="YES")
                        {
                            image.src = "img/theme-icons/heart.png";
                        }
                        else
                        {
                            image.src = "img/theme-icons/disheart.png";
                        }
                    }
                    else if(data.STATUS=="FAIL")
                    {

                    }
                    else //ERROR
                    {

                    }
                }
            });
    } else {
        image.src = "img/theme-icons/disheart.png";
        $.ajax({
            type: "GET",
            url: "http://groupado.com/amsal/server.php",
            data: {REQUEST_TYPE:'LIKE_STATUS' , POST_ID:given_id , USER_EMAIL_ID:userEmailID},
            dataType: 'json',
            timeout:30000,
                success: function(data) {
                if(data.STATUS=="SUCCESS")
                {
                    if(data.POST_STATUS=="YES")
                    {
                        image.src = "img/theme-icons/heart.png";
                    }
                    else
                    {
                        image.src = "img/theme-icons/disheart.png";
                    }
                }
                else if(data.STATUS=="FAIL")
                {

                }
                else //ERROR
                {

                }
            }
        });
    }
    $("#"+given_id).animate({
            left: '0px',
            top: '0px',
            height: '-=5px',
            width: '-=5px'
    }, "fast");
}


function shareIt(web_url)
{
var x = web_url;
Android.androidShare(x);
}

function ViewDetails(given_id)
{
    Android.createViewActivity(given_id);
}









function PARSE_DATA(data)
{
var cimage="";
var catt="";
	var postHTML="";
if(data.CATEGORY=="Accessories")
{
cimage="s1.png";
catt="Accessories";
}
else if(data.CATEGORY=="Beauty &amp; Spa")
{
cimage="s2.png";
catt="Beauty & Spa";
}
else if(data.CATEGORY=="Cosmetics")
{
cimage="s3.png";
catt="Cosmetics";
}
else if(data.CATEGORY=="Fashion")
{
cimage="s4.png";
catt="Fashion";
}
else if(data.CATEGORY=="Food")
{
cimage ="s5.png";
catt="Food";
}
else if(data.CATEGORY=="Kids")
{
cimage="s6.png";
catt="Kids";
}
else if(data.CATEGORY=="Lifestyle")
{
cimage="s7.png";
catt="Lifestyle";
}
else if(data.CATEGORY=="Perfume"||data.CATEGORY=="Perfumes")
{
cimage="s8.png";
catt="Perfume";
}
else if(data.CATEGORY=="Dental")
{
cimage="s7.png";
catt="Dental";
}
else if(data.CATEGORY=="Auto")
{
cimage="s7.png";
catt="Auto";
}
else if(data.CATEGORY=="Cologne")
{
cimage="s7.png";
catt="Cologne";
}
else
{
catt="Not Present";
cimage="noimagehere.png"
}
if(data.IMAGE[0] != null){


return postHTML;
}else{
	return "";
}
}