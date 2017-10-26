var d = new Date();
//alert(d.setDate(15))
var arrDE = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var arrDES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dn = d.getDay();
$('.time').html(d.getFullYear() + '/' + (d.getMonth()+1) + '/'+ d.getDate() + ', ' + arrDES[d.getDay()]);
//--------------------bottomWeatherCondition------------------
$('.bottom .dayweather h3').each(function(index){ 
  $(this).html(arrDE[dn]);
  (dn == 6) ? dn=0 : dn++;
});

var countryC = "TW";
var city = "Taipei";
var curWeatherDes = "";
var curWeatherTemp = "";

//$('.time').html(arrD[d.getDay()]);


$('.menuopen ul li').click(function(){
  //alert($(this).children(".location").html());
  city = $(this).children(".location").html();
  $('.address').html(city +" "+ "Taiwan");

  $.ajax({
    //api無法使用
    url: "https://api.openweathermap.org/data/2.5/weather?q="+ city +",TW&appid=298c357c66713a1e4db11293597ac332&units=metric",
    //url: "https://dl.dropbox.com/s/v7wey0oryhblmn3/apiweather.txt?dl=0",
    //url: "https://dl.dropboxusercontent.com/s/69ce99ennra0isf/apiweather2.txt?dl=0",
    type: "GET",
    dataType: "json",
    success: function(data){
    
    //alert("SUCCESS!!!"); 
      //--------------------description----------------
      //alert(data.weather[0].decription)
      curWeatherDes = data.weather[0].description;

      $('.description').html(data.weather[0].description);
      //-----------------mainWeather--------------------
      curWeatherTemp = Math.round(data.main.temp);
      $('.temperature').html(Math.round(data.main.temp) + "<l style='font-size:20px'>°C</l>");

      changeMainIcon(data.weather[0].icon);
    },error: function(){
      //alert("SUCCESS!!!"); 
      //console.log(123);
    }
  });
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",TW&cnt=7&appid=298c357c66713a1e4db11293597ac332&units=metric",
    //url: "https://dl.dropbox.com/s/9grlmwlmex06f63/weatherTest.txt?dl=0",
    type: "GET",
    dataType: "json",
    success: function(data){
    //alert("SUCCESS!!!");
      
      
      function eveTemp(n){
        return Math.round(data.list[n].temp.eve);
      }


      //------------temp text----------------
      $('.tempsvg .txttemp').each(function(index){  
        
        $(this).html(eveTemp(index) + "°C").attr('y', 100 - eveTemp(index) * 6);
        //alert($('.txtdate')[index].html('123'));
        //alert($(this).attr('y'))
        //alert($(this).siblings('.txtdate').attr('y'))
        //alert($(this).siblings('.txtdate').html())
        //$('.tempsvg circle').attr('cy', 130 - eveTemp(index));
        //$(this).siblings('.txtdate').html('11/13').attr('y', 100 - eveTemp(index) * 6);
        //$(this).siblings('.txtdate').attr('y', 100 - eveTemp(index) * 6);
        //alert(eveTemp(index))
      });
      //--------------------svgdate-------------------------
      $('.tempsvg .txtdate').each(function(index){  
        $(this).html(getTheDate(index)).attr('y', 100 - eveTemp(index) * 6);
      });
      
      
        


      //------------points----------------
      $('.tempsvg circle').each(function(index){
        $(this).attr('cy', 100 - eveTemp(index) * 6);
      });
      //alert(eveTemp(0))


      //------------polyline-------------------------------------




      $('.tempsvg polyline').attr('points', '0 ' + (100 - eveTemp(0) * 6)+ ', 70 '+ (100 - eveTemp(1) * 6) +', 140 '+ (100 - eveTemp(2) * 6) +', 210 '+ (100 - eveTemp(3) * 6) +', 280 '+ (100 - eveTemp(4) * 6) +', 350 '+ (100 - eveTemp(5) * 6) +', 420 '+ (100 - eveTemp(6) * 6) +'');


      //-----------------dayweather conditions--------------------
      //alert(data.list[0].weather[0].description)

      function weathercondition(condition){     
        //-----------clearSky------------------
        if(condition == '01n' || condition == '01d'){
          return '<svg viewbox="-50 -50 100 100">'+
  '    <g>'+
  '      <circle cx="0" cy="0" r="15"></circle>'+
  '      <line x1="23" y1="0" x2="35" y2="0"></line>'+
  '      <line x1="-23" y1="0" x2="-35" y2="0"></line>'+
  '      <line x1="0" y1="23" x2="0" y2="35"></line>'+
  '      <line x1="0" y1="-23" x2="0" y2="-35"></line>'+
  '      <line x1="15" y1="-15" x2="24" y2="-24"></line>'+
  '      <line x1="-15" y1="15" x2="-24" y2="24"></line>'+
  '      <line x1="15" y1="15" x2="24" y2="24"></line>'+
  '      <line x1="-15" y1="-15" x2="-24" y2="-24"></line>'+
  '    </g>'+
  '  </svg>';
        }
        //--------------fewClouds-------------------
        if(condition == '02n' || condition == '02d'){
          return '  <svg viewbox="0 0 100 100">'+
  '    <path d="M70.483,47.183C70.314,41.532,65.691,37,60,37  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L70.5,67.15  c5.367-0.177,9.667-4.573,9.667-9.983C80.167,51.751,75.858,47.352,70.483,47.183z"></path>'+
  '    <path d="M77.594,50.854"></path>'+
  '    <path d="M55.342,36.398  c1.905-2.705,4.993-4.532,8.553-4.707c6.136-0.298,11.354,4.435,11.652,10.572c0.093,1.913-0.303,3.736-1.077,5.349"></path>'+
  '    <line x1="72.583" y1="33" x2="76.124" y2="29.249"></line>'+
  '    <line x1="65.5" y1="30" x2="65.5" y2="25"></line>'+
  '    <line x1="77" y1="40.5" x2="82" y2="40.5"></line>'+
  '    <line x1="57.667" y1="31.667" x2="53.875" y2="27.875"></line>'+
  '  </svg>';
        }
        //-----------scattered clouds---------
        if(condition == '03n' || condition == '03d'){
          return '  <svg viewbox="0 0 100 100">'+
  '    <path d="M70.483,46.183C70.314,40.532,65.691,36,60,36  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L70.5,66.15  c5.367-0.177,9.667-4.573,9.667-9.983C80.167,50.751,75.858,46.352,70.483,46.183z"></path>'+
  '  </svg>'+'</div>'; 
        }
        //-----------broken clouds---------
        if(condition == '04n' || condition == '04d'){
          return '  <svg viewbox="0 0 100 100">'+
  '    <path d="M66.483,47.183C66.314,41.532,61.691,37,56,37  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L66.5,67.15  c5.367-0.177,9.667-4.573,9.667-9.983C76.167,51.751,71.858,47.352,66.483,47.183z"></path>'+
  '    <path d="M78.971,56.726c4.017,0.488,7.728-2.286,8.354-6.316  c0.627-4.033-2.072-7.808-6.055-8.555c0.528-4.228-2.39-8.138-6.628-8.796c-1.111-0.173-2.203-0.102-3.224,0.167  c-1.567-2.668-4.272-4.638-7.569-5.15c-5.016-0.78-9.759,2.069-11.559,6.596"></path>'+
  '  </svg>';
        }
        //------------------showerRain---------------------
        if(condition == '09n' || condition == '09d'){
          return '<svg viewBox="0 -5 100 100">'+
  '<path d="M60.751,61.153L66.5,61.15'+
  '	c5.367-0.177,9.667-4.573,9.667-9.983c0-5.416-4.309-9.815-9.684-9.984C66.314,35.532,61.691,31,56,31'+
  '	c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167'+
  '	c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10l5.5-0.002"'+
  '	/>'+
  '<path d="M78.971,50.726'+
  '	c4.017,0.488,7.728-2.286,8.354-6.316c0.627-4.033-2.072-7.808-6.055-8.555c0.528-4.228-2.39-8.138-6.628-8.796'+
  '	c-1.111-0.173-2.203-0.102-3.224,0.167c-1.567-2.668-4.272-4.638-7.569-5.15c-5.016-0.78-9.759,2.069-11.559,6.596"/>'+
  '<line x1="38.625" y1="51.765" x2="30" y2="74"/>'+
  '<line x1="49.625" y1="51.765" x2="41" y2="74"/>'+
  '<line x1="60.625" y1="51.765" x2="52" y2="74"/>'+
  '</svg>';
        }

        if(condition == '10n' || condition == '10d'){
          return '<svg viewBox="-5 0 100 100">'+
  '<path d="M60.751,61.153L66.5,61.15'+
  '	c5.367-0.177,9.667-4.573,9.667-9.983c0-5.416-4.309-9.815-9.684-9.984C66.314,35.532,61.691,31,56,31'+
  '	c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167'+
  '	c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10l5.5-0.002"'+
  '	/>'+
  '<line x1="38.625" y1="51.765" x2="30" y2="74"/>'+
  '<line x1="49.625" y1="51.765" x2="41" y2="74"/>'+
  '<line x1="60.625" y1="51.765" x2="52" y2="74"/>'+
  '</svg>';
        }
      }
      $('.bottom svg').each(function(index){
        $(this).replaceWith(weathercondition(data.list[index].weather[0].icon)); 
      });
      //--------------------Min&Mix------------------------
      function getMinMaxTemp(obj, T){
        $(obj).each(function(index){
          $(this).html(Math.round(data.list[index].temp[T]) + "°");
          var eve = Math.round(data.list[index].temp.eve);
        }); 
      }
      getMinMaxTemp('.bottom h4 .min', 'min');
      getMinMaxTemp('.bottom h4 .max', 'max');

      //-----------------------clickDisplayTempDescrpt&Weather-----------------------
      //var arrEve = [];
      for(i=0 ; i<$('.dayweather').length ; i++){
        $('.dayweather')[i].eveIndex = Math.round(data.list[i].temp.eve);
        $('.dayweather')[i].desIndex = data.list[i].weather[0].description;
        $('.dayweather')[i].iconIndex = data.list[i].weather[0].icon;
        //alert($('.dayweather')[i].iconIndex)
      }
      //alert($('.dayweather')[2].desIndex)
      function objFadeIn(obj){
        $(obj).removeClass('opacity0 opacity1').addClass('opacity0');  
        setTimeout(function(){
          $(obj).addClass('opacity1');
        }, 50);

      }
      
      // $('.tempsvg text').each(function(index){
      //   $(this)[index].css({'stroke':'red'});
      // });
      $('.dayweather').click(function(){
        $('.dayweather').removeClass('selected');
        
        $(this).addClass('selected');
      });
      
      //getTheDate(count, data)
      $('.dayweather').each(function(index){
        
        $(this).click(function(){
          
          $('.time').html(getTheDate(index, 4))
          $('.txttemp, .txtdate').removeClass('thistemp thisdate');
          $('.txttemp').eq(index).addClass('thistemp');
          $('.txtdate').eq(index).addClass('thisdate');
          
          
          changeMainIcon($('.dayweather')[index].iconIndex);
          objFadeIn('.weatherFrame');
          objFadeIn('.temperature');
          objFadeIn('.description');
          objFadeIn('.bgimage');
          if(index == 0){
            $('.description').html(curWeatherDes);
            $('.temperature').html(curWeatherTemp + "<l style='font-size:20px'>°C</l>");
            
          }
          else{
            $('.description').html($('.dayweather')[index].desIndex);
            $('.temperature').html(Math.round($('.dayweather')[index].eveIndex) + "<l style='font-size:20px'>°C</l>");
          }
        });
      });
      $("#today").trigger("click");
      

      //---------------------------------------



    },error: function(){
    //alert("ERROR!!!");
    //alert(city)
    }
  });
});
    

    
    
function changeMainIcon(icon){
  if(icon == '01n' || icon == '01d'){
    $('.weatherFrame').replaceWith(getMainWeather('skyClear'));  
  }
  if(icon == '02n' || icon == '02d'){
    $('.weatherFrame').replaceWith(getMainWeather('fewClouds'));  
  }
  if(icon == '03n' || icon == '03d'){
    $('.weatherFrame').replaceWith(getMainWeather('scatteredClouds'));  
  }
  if(icon == '04n' || icon == '04d'){
    $('.weatherFrame').replaceWith(getMainWeather('brokenClouds'));  
  }
  if(icon == '09n' || icon == '09d'){
    $('.weatherFrame').replaceWith(getMainWeather('showerRain'));  
  }
  if(icon == '10n' || icon == '10d'){
    $('.weatherFrame').replaceWith(getMainWeather('rainDay'));  
  }  
}


//-------------------liststyle---------------------
$('.menuopen ul li .liststyle').html('<svg viewbox="0 0 200 200">'+
'  <g>'+
'    <path d="M157.553,139.855c14.542-14.644,23.523-34.739,23.523-57.026    c0-44.821-36.336-81.16-81.16-81.16s-81.16,36.164-81.16,80.988c0,22.228,8.942,41.843,23.414,56.843h-0.018l57.494,57.667    l51.836-51.749C153.598,143.676,155.625,141.797,157.553,139.855 M100.592,107.855c-13.446,0-24.348-10.901-24.348-24.348    c0-13.447,10.901-24.348,24.348-24.348c13.448,0,24.348,10.9,24.348,24.348C124.94,96.954,114.04,107.855,100.592,107.855z"></path>'+
'    <circle cx="100.592" cy="83.507" r="24.348"></circle>'+
'  </g>'+
'</svg>')
//-----------------------openmenu------------------------------
$('#menuinput').click(function(){
  if($("#menuinput").prop('checked')){
    $('.menuopen').css({'left': '0'});
    $('.top').addClass('blur');
    $('.bgimage').addClass('blur');
    $('.menubottom').css({'display': 'block'});
  }else{
    $('.menuopen').css({'left': '-200px'});
    $('.top').removeClass('blur');
    $('.bgimage').removeClass('blur');
    $('.menubottom').css({'display': 'none'});
  }
});
$('.menubottom').click(function(){
  $("#menuinput").trigger("click");  
});

//$('.bgimage').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 1), rgba(44, 62, 80, 1)'});

$('.daybox').mouseleave(function(){
  //$('#today').trigger("click");
  if($("#menuinput").prop('checked')){
    $("#menuinput").trigger("click");  
  }
  if($('#templine').prop('checked')){
    $('#templine').trigger("click");
  }
});

//var loca = "";
$('.menuopen ul li').click(function(){
  if($("#menuinput").prop('checked') == true){
    $("#menuinput").trigger("click");  
  }
});


//---------------trigger-----------------

$("#firstclick").trigger("click");

//$("#menuinput").prop('checked', true)
//----dynamic center function----
// function dynamicCenter(obj){
// var bottomObj = document.getElementById(obj);
//    $(window).resize(function() {
//       bottomObj.style.position = 'absolute';
//       bottomObj.style.top = ($(window).height()- bottomObj.offsetHeight) / 2 - 50 +'px';
//       bottomObj.style.left = ($(window).width() - bottomObj.offsetWidth) / 2 + 'px'; 
//    }).resize();
// }
// //------------------------------
// //dynamicCenter('underCard');
// dynamicCenter('daybox');










//------------------------------------------------------
function getMainWeather(condition){
	if(condition == 'skyClear'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.4), rgba(44, 62, 80, 0.4)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22688783_916318251855168_7826708116563170373_n.jpg?oh=b5866619d1660954ebfc2d1025a8b561&oe=5A7040B9');
		return '<div class="outClearSky weatherFrame">'+
'  <svg viewbox="-50 -50 100 100" class="mainClearSky">'+
'    <g>'+
'      <circle cx="0" cy="0" r="15"></circle>'+
'      <line x1="23" y1="0" x2="35" y2="0"></line>'+
'      <line x1="-23" y1="0" x2="-35" y2="0"></line>'+
'      <line x1="0" y1="23" x2="0" y2="35"></line>'+
'      <line x1="0" y1="-23" x2="0" y2="-35"></line>'+
'      <line x1="15" y1="-15" x2="24" y2="-24"></line>'+
'      <line x1="-15" y1="15" x2="-24" y2="24"></line>'+
'      <line x1="15" y1="15" x2="24" y2="24"></line>'+
'      <line x1="-15" y1="-15" x2="-24" y2="-24"></line>'+
'    </g>'+
'  </svg>'+
'</div>'
	}
	if(condition == 'fewClouds'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.4), rgba(44, 62, 80, 0.4)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22688783_916318251855168_7826708116563170373_n.jpg?oh=b5866619d1660954ebfc2d1025a8b561&oe=5A7040B9');
		return '<div class="outFewClouds weatherFrame">'+
'  <svg viewbox="0 0 100 100">'+
'    <path d="M70.483,47.183C70.314,41.532,65.691,37,60,37  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L70.5,67.15  c5.367-0.177,9.667-4.573,9.667-9.983C80.167,51.751,75.858,47.352,70.483,47.183z"></path>'+
'    <path d="M77.594,50.854"></path>'+
'    <path d="M55.342,36.398  c1.905-2.705,4.993-4.532,8.553-4.707c6.136-0.298,11.354,4.435,11.652,10.572c0.093,1.913-0.303,3.736-1.077,5.349"></path>'+
'    <line x1="72.583" y1="33" x2="76.124" y2="29.249"></line>'+
'    <line x1="65.5" y1="30" x2="65.5" y2="25"></line>'+
'    <line x1="77" y1="40.5" x2="82" y2="40.5"></line>'+
'    <line x1="57.667" y1="31.667" x2="53.875" y2="27.875"></line>'+
'  </svg>'+
'</div>'
	}
	if(condition == 'scatteredClouds'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.4), rgba(44, 62, 80, 0.4)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22528418_916318238521836_3537365760966126442_n.jpg?oh=263745f732389f4ac6c748e669d35ab4&oe=5A7234CC');
		return '<div class="outScatteredClouds weatherFrame">'+
'  <svg viewbox="0 0 100 100" class="mainScatteredCloud">'+
'    <path d="M70.483,46.183C70.314,40.532,65.691,36,60,36  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L70.5,66.15  c5.367-0.177,9.667-4.573,9.667-9.983C80.167,50.751,75.858,46.352,70.483,46.183z"></path>'+
'  </svg>'+
'</div>'
	}
	if(condition == 'brokenClouds'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.4), rgba(44, 62, 80, 0.4)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22528418_916318238521836_3537365760966126442_n.jpg?oh=263745f732389f4ac6c748e669d35ab4&oe=5A7234CC');
		return '<div class="outBrokenClouds weatherFrame">'+
'  <svg viewbox="0 0 100 100">'+
'    <path d="M66.483,47.183C66.314,41.532,61.691,37,56,37  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10L66.5,67.15  c5.367-0.177,9.667-4.573,9.667-9.983C76.167,51.751,71.858,47.352,66.483,47.183z"></path>'+
'    <path d="M78.971,56.726c4.017,0.488,7.728-2.286,8.354-6.316  c0.627-4.033-2.072-7.808-6.055-8.555c0.528-4.228-2.39-8.138-6.628-8.796c-1.111-0.173-2.203-0.102-3.224,0.167  c-1.567-2.668-4.272-4.638-7.569-5.15c-5.016-0.78-9.759,2.069-11.559,6.596"></path>'+
'  </svg>'+
'</div>'
	}

	if(condition == 'showerRain'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.6), rgba(44, 62, 80, 0.6)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22687851_916318301855163_7681721919586224217_n.jpg?oh=cc14204714d4191f6826811e87d62598&oe=5A75A772');
		return '<div class="outShowerRain weatherFrame">'+
'  <div class="rain rain1"></div>'+
'  <div class="rain rain2"></div>'+
'  <div class="rain rain3"></div>'+
'  <svg viewbox="0 8 100 100">'+
'    <path d="M60.751,67.153L66.5,67.15  c5.367-0.177,9.667-4.573,9.667-9.983c0-5.416-4.309-9.815-9.684-9.984C66.314,41.532,61.691,37,56,37  c-1.492,0-2.908,0.315-4.193,0.876c-2.598-3.179-6.547-5.21-10.973-5.21c-7.824,0-14.167,6.343-14.167,14.167  c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10l5.5-0.002"></path>'+
'    <path d="M78.594,48.854"></path>'+
'    <path d="M78.971,56.726  c4.017,0.488,7.728-2.286,8.354-6.316c0.627-4.033-2.072-7.808-6.055-8.555c0.528-4.228-2.39-8.138-6.628-8.796  c-1.111-0.173-2.203-0.102-3.224,0.167c-1.567-2.668-4.272-4.638-7.569-5.15c-5.016-0.78-9.759,2.069-11.559,6.596"></path>'+
'  </svg>'+
'</div>'
	}
	if(condition == 'rainDay'){
    $('.top').css({'background': 'linear-gradient(to bottom, rgba(52, 152, 219, 0.6), rgba(44, 62, 80, 0.6)'});
    $('.bgimage img').attr('src', 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-9/22687851_916318301855163_7681721919586224217_n.jpg?oh=cc14204714d4191f6826811e87d62598&oe=5A75A772')
		return '<div class="outRainDay weatherFrame">'+
'  <div class="rain rain1"></div>'+
'  <div class="rain rain2"></div>'+
'  <div class="rain rain3"></div>'+
'  <svg viewbox="0 0 100 100" class="mainRainDay">'+
'    <path d="M65.5,56.215l6-0.034c5.367-0.177,9.667-4.589,9.667-9.999c0-5.416-4.309-9.823-9.684-9.992C71.314,30.54,66.691,26.004,61,26.004c-1.492,0-2.908,0.313-4.193,0.875c-2.598-3.179-6.547-5.211-10.973-5.211c-7.824,0-14.167,6.342-14.167,14.166c0,0.122,0.015,0.239,0.018,0.36c-0.172-0.009-0.343-0.026-0.518-0.026c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10l6.333-0.002"></path>'+
'  </svg>'+
'</div>';
    
	}
}
function getTheDate(count, data){
  var date = new Date();
  date.setDate(date.getDate() + count);
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var ww = date.getDay();
  if(data == 4){
    return yy + '/' + mm + '/' + dd + ', ' + arrDES[ww];
  }else{
    return mm + '/' + dd;  
  } 
}
//$('.tempsvg').draggable()