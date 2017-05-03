
function defaultClass()
{
fullName.style.borderColor = "blue";
age.style.borderColor = "";
phone.style.borderColor = "";
address.style.borderColor = "";
city.style.borderColor = "";
country.style.borderColor = "";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}
function defaultClass2()
{
fullName.style.borderColor = "";
age.style.borderColor = "blue";
phone.style.borderColor = "";
address.style.borderColor = "";
city.style.borderColor = "";
country.style.borderColor = "";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}
function defaultClass3()
{
fullName.style.borderColor = "";
age.style.borderColor = "";
phone.style.borderColor = "blue";
address.style.borderColor = "";
city.style.borderColor = "";
country.style.borderColor = "";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}
function defaultClass4()
{
fullName.style.borderColor = "";
age.style.borderColor = "";
phone.style.borderColor = "";
address.style.borderColor = "blue";
city.style.borderColor = "";
country.style.borderColor = "";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}
function defaultClass5()
{
fullName.style.borderColor = "";
age.style.borderColor = "";
phone.style.borderColor = "";
address.style.borderColor = "";
city.style.borderColor = "blue";
country.style.borderColor = "";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}
function defaultClass6()
{
fullName.style.borderColor = "";
age.style.borderColor = "";
phone.style.borderColor = "";
address.style.borderColor = "";
city.style.borderColor = "";
country.style.borderColor = "blue";

phone.style.borderWidth = "1.5px 1.5px 1.5px 1.5px";
resetter();
}

function resetter()
{
$("#showAlert").html("");
}

$(function(){
   $(".close").click(function(){
      $("#myAlert").alert();
   });
});