var todayWeatherController = (function(){
    var model = {
        city : "Taipei",
        country : "TW"
    };

    var view = {
        $city : $("#city"),
        $country : $("#country"),
        $search : $("#search"),
        $error : $("#error"),
        $weatherIcon : $("#weatherIcon"),
        $weatherMain : $("#weatherMain"),
        $weatherDesc : $("#weatherDesc"),
        $tempMin : $("#tempMin"),
        $tempMax : $("#tempMax"),
        $humidity : $("#humidity"),

        render : function(data){
            var description = "";
            if( data.cod === 200 ){
                description = data.weather[0].description;
                view.$weatherMain.text( data.weather[0].main );
                view.$weatherDesc.text( description );
                view.$tempMin.text( Math.round(data.main.temp_min) );
                view.$tempMax.text( Math.round(data.main.temp_max) );
                view.$humidity.text( data.main.humidity );

                if( description.indexOf("cloud") > -1 ) {
                    view.$weatherIcon.removeClass().addClass('icon cloud');
                } else if( description.indexOf("rain") > -1 ) {
                    view.$weatherIcon.removeClass().addClass('icon rain');
                } else if( description.indexOf("clear") > -1 ) {
                    view.$weatherIcon.removeClass().addClass('icon sun');
                } else {
                    view.$weatherIcon.removeClass().addClass('icon none');
                }

                view.$error.hide();
            } else {
                view.$error.show().find('span').text(data.message);
            }
        }
    };

    var query = function(data){
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + data.city + ',' + data.country + "&units=metric";

        $.newAjax({
            type: 'GET',
            url: url,
            data:{todo:"jsonp"},
            dataType: "jsonp",
            crossDomain: true,
            cache:false,
            mask:true,    /* new property */
            success: view.render,
            error:function(jqXHR, textStatus, errorThrown){
                alert(errorThrown);
            }
        });
    };

    var bindEvents = function () {
        view.$search.click(function(){
            query(model);
        });

        view.$city.change(function(){
            model.city = $(this).val();
        });

        view.$country.change(function(){
            model.country = $(this).val();
        });
    };

    return {
        init : function(){
            bindEvents();
        }
    };

})();

//擴充 ajax 新增 mask 屬性
;(function( $ ) {
    $.newAjax = function (param) {
        var mask,
            new_param = $.extend( {
                "mask" : false
            }, param );

        if( new_param.mask ){
            if( !mask ) {
                //已經被新增過，直接取用
                mask = $("#loading");

                //未被新增過，新增
                if( mask.length === 0 ){
                    mask =  $('<div id="loading"></div>');
                    mask.append('<div><img src="img/loading.gif"></div>').appendTo("body");
                }
            }

            if( "beforeSend" in param ){
                new_param.beforeSend = function(){
                    param.beforeSend();

                    mask.show();
                }
            } else {
                new_param.beforeSend = function(){
                    mask.show();
                }
            }

            if( "complete" in param ){
                new_param.complete = function(){
                    param.complete();

                    mask.hide();
                }
            } else {
                new_param.complete = function(){
                    mask.hide();
                }
            }
        }

        return $.ajax(new_param);
    };

}( jQuery ));