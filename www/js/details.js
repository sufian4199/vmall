var derUser = "";
var mydata = "";
var endtime = "";
var ajaxdata ="";

function GetUserEmail(hash)
{
derUser = Android.EmailGetter();
PlotData(hash);
}

var TargetDate = "";
var BackColor = "palegreen";
var ForeColor = "navy";
var CountActive = true;
var CountStepper = -1;
var LeadingZero = true;
var DisplayFormat = "%%D%% Days %%H%%:%%M%%:%%S%%";
var FinishMessage = "Deal Expired!";
var SetTimeOutPeriod = 0;

function PlotData(obj){
	if(refresh){
		snd.play();
	}
$.ajax({
        type: "GET",
        url: "http://groupado.com/amsal/server.php",
        data: {REQUEST_TYPE:'POST_DETAIL' , POST_ID:obj , USER_EMAIL_ID:derUser},
        dataType: 'json',
		timeout: 30000,
        success: function(data) {
            if(data.STATUS=="SUCCESS")
            {
				console.log(data);
                ajaxdata = data.DATA;
                var returned_html="";
				endtime = data.DATA.POSTDETAILS.offer_expire;
                returned_html = PARSE_DETAIL_DATA(data.DATA);
				TargetDate = data.DATA.POSTDETAILS.offer_expire;
				TargetDate = parseInt(TargetDate);
                $("#page-content").html(returned_html);
				$( "#product_description" ).hide( "fast" );
            }
            else if(data.STATUS=="FAIL")
            {
                $("#page-content").html("No Deals available for current location");
            }
            else //ERROR
            {
                $("#page-content").html('<div class="row text-center" style="margin-top:50%;"><h4>No Internet Connection.</h4></div>');
            }
        },
		
		
        complete: function(){
			
            if (typeof(BackColor)=="undefined")
			  BackColor = "white";
			if (typeof(ForeColor)=="undefined")
			  ForeColor= "black";
			//if (typeof(TargetDate)=="undefined")
			//  TargetDate = "08/11/2015 5:00 AM";
			//if (typeof(DisplayFormat)=="undefined")
			//  DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
			if (typeof(CountActive)=="undefined")
			  CountActive = true;
			if (typeof(FinishMessage)=="undefined")
			  FinishMessage = "";
			if (typeof(CountStepper)!="number")
			  CountStepper = -1;
			if (typeof(LeadingZero)=="undefined")
			  LeadingZero = true;


			CountStepper = Math.ceil(CountStepper);
			if (CountStepper == 0)
			  CountActive = false;
			SetTimeOutPeriod = (Math.abs(CountStepper)-1)*1000 + 990;
			var dthen = new Date(TargetDate*1000);
			var dnow = new Date();
			if(CountStepper>0)
			  ddiff = new Date(dnow-dthen);
			else
			  ddiff = new Date(dthen-dnow);
			gsecs = Math.floor(ddiff.valueOf()/1000);
			CountBack(gsecs);
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

function formatTime(unixTimestamp) {
    var dt = new Date(unixTimestamp * 1000);
	
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    s = "" + s;
  return "" + s + "";
}

function CountBack(secs) {
  if (secs < 0) {
    document.getElementById("cntdwn").innerHTML = FinishMessage;
    return;
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60,60));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1,60));

  document.getElementById("cntdwn").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack(" + (secs+CountStepper) + ")", SetTimeOutPeriod);
}

function putspan(backcolor, forecolor) {
 document.write("<span id='cntdwn' style='background-color:" + backcolor + 
                "; color:" + forecolor + "'></span>");
}


function PARSE_DETAIL_DATA(data)
{
var postHTML="";

postHTML+='<div class="row" style="margin-left:-10px; margin-right:-10px;">';
postHTML+='<div class="modal-content" style="margin-top:1px; border:0px; background-color:#EAE7E7;">';
postHTML+='<div class="row"><img class="col-xs-12" src="'+ data.IMAGE[0] +'" alt="..."></row>';
/*
postHTML+='<div class="modal-header">';
postHTML+='<h4 class="modal-title ellipsis"><span class="glyphicon glyphicon-sunglasses"></span>'+ data.POSTDATA.post_title +'</h4>';
postHTML+='</div>';
postHTML+='<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">';
postHTML+='<!-- Indicators -->';
postHTML+='<ol class="carousel-indicators">';
for(var i=0; i< data.IMAGECOUNT; i++){
    if(i==0){
        postHTML+='<li data-target="#carousel-example-generic" data-slide-to="'+ i +'" class="active"></li>';
    }else{
        postHTML+='<li data-target="#carousel-example-generic" data-slide-to="'+ i +'"></li>';
    }
}
postHTML+='</ol>';
postHTML+='<!-- Wrapper for slides -->';
postHTML+='<div class="carousel-inner" role="listbox">';
for(var i=0; i< data.IMAGECOUNT; i++){
    if(i==0){
        postHTML+='<div class="item active">';
        postHTML+='<img src="'+ data.IMAGE[i] +'" alt="...">';
        postHTML+='<div class="carousel-caption">';
        postHTML+='';
        postHTML+='</div>';
        postHTML+='</div>';
    }else{
        postHTML+='<div class="item">';
        postHTML+='<img src="'+ data.IMAGE[i] +'" alt="...">';
        postHTML+='<div class="carousel-caption">';
        postHTML+='';
        postHTML+='</div>';
        postHTML+='</div>';
    }
}    
postHTML+='</div>';
postHTML+='<!-- Controls -->';
postHTML+='<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">';
postHTML+='<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
postHTML+='<span class="sr-only">Previous</span>';
postHTML+='</a>';
postHTML+='<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">';
postHTML+='<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
postHTML+='<span class="sr-only">Next</span>';
postHTML+='</a>';
postHTML+='</div>';
postHTML+='</div>';
*/
postHTML+='</br>';
postHTML+='<div class="row"><div class="col-xs-12" style="padding-left:35px; padding-right:30px;"><h4>'+ data.POSTDETAILS.store_name +'</h4> </div></div>';
postHTML+='<div class="row"><div class="col-xs-12" style="padding-left:35px; padding-right:30px; padding-bottom:10px;">'+ data.POSTDETAILS.post_title +' </div></div>';

postHTML+='<div class="row" style="padding-left:15px; padding-right:15px; background-color:white;">';
postHTML+='<div class="col-xs-4">';
postHTML+='<h3 class="text-center" style="margin-top:10px; margin-bottom:4px;">Rs. '+data.POSTDETAILS.deal_sale_price+'</h3>';
postHTML+='</div>';
postHTML+='<div class="col-xs-8">';
postHTML+='<div class="row">';
postHTML+='<div class="col-xs-4" style="border-right:1px solid gray;">';
postHTML+='<h6 class="text-center" style="margin-top:2px; margin-bottom:0px;">Value</h6>';
postHTML+='<h4 class="text-center" style="margin-top:4px; margin-bottom:2px;">'+ data.POSTDETAILS.deal_price +'</h4>';
postHTML+='</div>';
postHTML+='<div class="col-xs-4" style="border-right:1px solid gray;">';
postHTML+='<h6 class="text-center" style="margin-top:2px; margin-bottom:0px;">Discount</h6>';
postHTML+='<h4 class="text-center" style="margin-top:4px; margin-bottom:2px;">'+ data.POSTDETAILS.deal_discount +'</h4>';
postHTML+='</div>';
postHTML+='<div class="col-xs-4">';
postHTML+='<h6 class="text-center" style="margin-top:2px; margin-bottom:0px;">You Save</h6>';
var a = parseInt(data.POSTDETAILS.deal_price);
var b = parseInt(data.POSTDETAILS.deal_sale_price);
postHTML+='<h4 class="text-center" style="margin-top:4px; margin-bottom:2px;">'+ (a-b) +'</h4>';
postHTML+='</div>';
postHTML+='</div>';
postHTML+='</div>';
postHTML+='</div>';


postHTML+='<div class="row" style="padding-left:15px; padding-right:15px; background-color:white; margin-top:10px;">';
postHTML+='<div class="col-xs-5"  style="border-right:1px solid gray; padding:0px;">';
postHTML+='<h5 class="text-center" style="margin-top:8; margin-bottom:5px; color:#D34D11;"><img src="img/timer-icon.png"/> <span id="cntdwn"></span></h5>';
postHTML+='</div>';
postHTML+='<div class="col-xs-7" style="padding:0px;">';
postHTML+='<div class="row">';
postHTML+='<div class="col-xs-6" style="border-right:1px solid gray; padding:0px;">';
postHTML+='<h5 class="text-center" style="margin-top:8; margin-bottom:5px; color:#1D9CBD;"><img src="img/bought-icon.png"/>'+ data.POSTDETAILS.bought +' Bought!</h5>';
postHTML+='</div>';
postHTML+='<div class="col-xs-6" style="padding:0px;">';
var a = parseInt(data.POSTDETAILS.deal_items);
var b = parseInt(data.POSTDETAILS.bought);
postHTML+='<h5 class="text-left" style="margin-top:8; margin-bottom:5px;"><img style="margin-top:-2px;" src="img/remaining-icon.png"/>'+ (a- b) +' Left!</h5>';
postHTML+='</div>';
postHTML+='</div>';
postHTML+='</div>';
postHTML+='</div>';

           
postHTML+='<div class="row" style="margin-top:8px;">';
postHTML+='<div class="col-xs-3 col-xs-offset-3 text-center"><img onclick="showDescription();" src="img/description.png" /><p>Description</p></div> <div class="col-xs-3 text-center"><a style="text-decoration:none; color:black;"  href="tel:+924235239037"><img src="img/callus.png" /><p>Call Us</p></a></div>';
postHTML+='</div>';

postHTML+='<div class="row text-center" ><br>';
postHTML+='<a style="border-radius:0px; background-color:#D34D11; border-color:#D34D11;" class="btn btn-warning col-xs-6 col-xs-offset-3" onclick="DetailOrderActivity(ajaxdata)">Order Now</a>';
postHTML+='</div>  ';

postHTML+='<div id="product_description" class="row" style="position:fixed; width:100%; height:100%; overflow-y:hidden; z-index:10000; top:0px; left:0px; margin:5px; padding:5px; background-color:rgba(255,255,255, 0.9)"><img style="position:absolute; right:15px; top:5px;" src="img/cross.png" onclick="hideDescription();"><div style="max-height:100%; overflow-y:scroll;">';
var desc = data.POSTDETAILS.post_content;
desc = desc.split(".");
var description = "";
description = desc.join(".<br />");
postHTML+='';
postHTML+=description;
postHTML+='</div></div><br><br>';
return postHTML;
}

function hideDescription(){
	$( "#product_description" ).hide( "fast" );
}

function showDescription(){
	$( "#product_description" ).show( "fast" );
}

function faq()
{
Android.faq_activity();
}

 // Number of seconds in every time division
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
 
function playTimer(){
	
	
	// Creating the plugin
	$.fn.countdown = function(prop){
		
		var options = $.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);
		
		var left, d, h, m, s, positions;

		// Initialize the plugin
		init(this, options);
		
		positions = this.find('.position');
		
		(function tick(){
			
			// Time left
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			
			if(left < 0){
				left = 0;
			}
			
			// Number of days left
			d = Math.floor(left / days);
			updateDuo(0, 1, d);
			left -= d*days;
			
			// Number of hours left
			h = Math.floor(left / hours);
			updateDuo(2, 3, h);
			left -= h*hours;
			
			// Number of minutes left
			m = Math.floor(left / minutes);
			updateDuo(4, 5, m);
			left -= m*minutes;
			
			// Number of seconds left
			s = left;
			updateDuo(6, 7, s);
			
			// Calling an optional user supplied callback
			options.callback(d, h, m, s);
			
			// Scheduling another call of this function in 1s
			setTimeout(tick, 1000);
		})();
		
		// This function updates two digit positions at once
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};
	
	
	var note = $('#note'),
		ts = new Date(2012, 0, 1),
		newYear = true;
	
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		ts = endtime*1000;//(new Date()).getTime() + 10*24*60*60*1000;
		console.log(ts);
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " day" + ( days==1 ? '':'s' ) + ", ";
			message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
			message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
			message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "left to 10 days from now!";
			}
			
			note.html(message);
		}
	});

}

function init(elem, options){
		elem.addClass('countdownHolder');

		// Creating the markup inside the container
		$.each(['Days','Hours','Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}
		});

	}

	// Creates an animated transition between the two numbers
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// We are already showing this number
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		
		// The .static class is added when the animation
		// completes. This makes it run smoother.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}

