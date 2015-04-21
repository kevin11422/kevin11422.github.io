var dataAnalysisController = (function(){
    var model = [
        {
            year : 2007,
            male : 106898,
            female : 97516
        },
        {
            year : 2008,
            male : 103937,
            female : 94796
        },
        {
            year : 2009,
            male : 99492,
            female : 91818
        },
        {
            year : 2010,
            male : 87213,
            female : 79673
        },
        {
            year : 2011,
            male : 101943,
            female : 94684
        },
        {
            year : 2012,
            male : 118848,
            female : 110633
        },
        {
            year : 2013,
            male : 103120,
            female : 95993
        }
    ];

    var view = function(data) {
        var maleData = [],
            femaleData = [],
            minYear = Number.MAX_VALUE,
            maxYear = Number.MIN_VALUE,
            minPeople = Number.MAX_VALUE,
            maxPeople = Number.MIN_VALUE,
            i, dataLen, dataset, options;

        for(i = 0, dataLen = data.length ; i < dataLen ; i++){
            maleData.push( [ data[i].year, data[i].male ] );
            femaleData.push( [ data[i].year, data[i].female ] );
            minYear = Math.min(minYear, data[i].year);
            maxYear = Math.max(maxYear, data[i].year);
            minPeople = Math.min(minPeople, data[i].male, data[i].female);
            maxPeople = Math.max(maxPeople, data[i].male, data[i].female);
        }

        dataset = [
            {
                label: "Male",
                data: maleData,
                points: {
                    symbol: "circle"
                }
            },
            {
                label: "Female",
                data: femaleData,
                points: {
                    symbol: "triangle"
                }
            }
        ];

        options = {
            series: {
                lines: { show: true },
                points: {
                    radius: 3,
                    show: true
                }
            },
            xaxis: {
                    axisLabel: "Year",
                    min: minYear - 1,
                    max: maxYear + 1,
                    tickSize : 1,
                    tickFormatter: function (v) {
                        return v;
                    }
            },
            yaxis: {
                    axisLabel: "People",
                    min: ( Math.round(minPeople / 10000) - 1 ) * 10000,
                    max: ( Math.round(maxPeople / 10000) + 1 ) * 10000,
                    tickFormatter: function (v) {
                        return ( v / 1000 ) + "K";
                    }
            },
            colors: ["#00DDDD", "#000000"]
        };

        $.plot($("#flot-placeholder"), dataset, options);
    };

    return {
        init : function(){
            view(model);
        }
    };

})();
