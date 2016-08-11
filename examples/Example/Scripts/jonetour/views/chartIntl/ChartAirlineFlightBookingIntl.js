(function () {

    VA.views.chartIntl.ChartAirlineFlightBookingIntl = function () {

        var _configs = {
        }


        var current_date = new Date();

        var data_airline = {
        };


        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('#chart-airline-flight-booking').css('display', 'block');
            $('.title-charts').text('Thống kê mã dịch vụ quốc tế theo hãng hàng không');
            initChartAirlineFlightBookingStatistic();


        }

        var setBasicLineDark = function () {//set css cho bieu do basic line

            Highcharts.createElement('link', {
                href: '//fonts.googleapis.com/css?family=Unica+One',
                rel: 'stylesheet',
                type: 'text/css'
            }, null, document.getElementsByTagName('head')[0]);

            Highcharts.theme = {
                colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                   "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#00FFFF", "#0000FF", "#0000A0", "#ADD8E6",
                   "#800080", "#FFFF00", "#00FF00", "#FF00FF", "#C0C0C0", "#FFA500", "#A52A2A", "#800000",
                   "#008000", "#808000", "#98AFC7", "#6D7B8D", "#737CA1", "#4863A0", "#2B547E", "#151B54",
                   "#342D7E", "#6960EC", "#87AFC7", "#728FCE", "#38ACEC", "#A0CFEC", "#A0CFEC", "#E0FFFF",
                   "#93FFE8", "#93FFE8", "#5E7D7E", "#008080", "#617C58", "#728C00", "#254117", "#B2C248",
                   "#7FE817", "#CCFB5D", "#EDDA74", "#FFFF00", "#FFFF00", "#F3E5AB", "#F3E5AB", "#F3E5AB",
                   "#E8A317", "#E8A317", "#C2B280", "#806517", "#493D26", "#7F462C", "#7F462C", "#FF7F50",
                   "#FF7F50", "#E55B3C", "#F70D1A", "#9F000F", "#954535", "#7E3817", "#800517", "#810541",
                   "#B38481", "#C48189", "#EDC9AF", "#FDD7E4", "#F6358A", "#D16587", "#571B7E", "#583759",
                   "#583759", "#56A5EC", "#56A5EC", "#7FFFD4", "#4EE2EC", "#3EA99F", "#728C00", "#6CC417",
                   "#EDDA74", "#FFFFCC", "#FBB117", "#966F33", "#827B60", "#E66C2C", "#E66C2C", "#9F000F",
                   "#7E3517", "#800517", "#B38481", "#E7A1B0", "#4B0082"],
                chart: {
                    backgroundColor: {
                        linearGradient: {
                            x1: 0, y1: 0, x2: 1, y2: 1
                        },
                        stops: [
                           [0, '#2a2a2b'],
                           [1, '#3e3e40']
                        ]
                    },
                    style: {
                        fontFamily: "Arial"
                    },
                    plotBorderColor: '#606063'
                },
                title: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'none',
                        fontSize: '20px'
                    }
                },
                subtitle: {
                    style: {
                        color: '#E0E0E3',
                        textTransform: 'uppercase'
                    }
                },
                xAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    title: {
                        style: {
                            color: '#A0A0A3'

                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#707073',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }
                    },
                    lineColor: '#707073',
                    minorGridLineColor: '#505053',
                    tickColor: '#707073',
                    tickWidth: 1,
                    title: {
                        style: {
                            color: '#A0A0A3'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    style: {
                        color: '#F0F0F0'
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            color: '#B0B0B3'
                        },
                        marker: {
                            lineColor: '#333'
                        }
                    },
                    boxplot: {
                        fillColor: '#505053'
                    },
                    candlestick: {
                        lineColor: 'white'
                    },
                    errorbar: {
                        color: 'white'
                    }
                },
                legend: {
                    itemStyle: {
                        color: '#E0E0E3'
                    },
                    itemHoverStyle: {
                        color: '#FFF'
                    },
                    itemHiddenStyle: {
                        color: '#606063'
                    }
                },
                credits: {
                    style: {
                        color: '#666'
                    }
                },
                labels: {
                    style: {
                        color: '#707073'
                    }
                },

                drilldown: {
                    activeAxisLabelStyle: {
                        color: '#F0F0F3'
                    },
                    activeDataLabelStyle: {
                        color: '#F0F0F3'
                    }
                },

                navigation: {
                    buttonOptions: {
                        symbolStroke: '#DDDDDD',
                        theme: {
                            fill: '#505053'
                        }
                    }
                },

                // scroll charts
                rangeSelector: {
                    buttonTheme: {
                        fill: '#505053',
                        stroke: '#000000',
                        style: {
                            color: '#CCC'
                        },
                        states: {
                            hover: {
                                fill: '#707073',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            },
                            select: {
                                fill: '#000003',
                                stroke: '#000000',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: '#505053',
                    inputStyle: {
                        backgroundColor: '#333',
                        color: 'silver'
                    },
                    labelStyle: {
                        color: 'silver'
                    }
                },

                navigator: {
                    handles: {
                        backgroundColor: '#666',
                        borderColor: '#AAA'
                    },
                    outlineColor: '#CCC',
                    maskFill: 'rgba(255,255,255,0.1)',
                    series: {
                        color: '#7798BF',
                        lineColor: '#A6C7ED'
                    },
                    xAxis: {
                        gridLineColor: '#505053'
                    }
                },

                scrollbar: {
                    barBackgroundColor: '#808083',
                    barBorderColor: '#808083',
                    buttonArrowColor: '#CCC',
                    buttonBackgroundColor: '#606063',
                    buttonBorderColor: '#606063',
                    rifleColor: '#FFF',
                    trackBackgroundColor: '#404043',
                    trackBorderColor: '#404043'
                },

                // special colors for some of the
                legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                background2: '#505053',
                dataLabelsColor: '#B0B0B3',
                textColor: '#C0C0C0',
                contrastTextColor: '#F0F0F3',
                maskColor: 'rgba(255,255,255,0.3)'
            };

            // Apply the theme
            Highcharts.setOptions(Highcharts.theme);
        }


        var getDataFlyBookingInfoByAirline = function (bookingStatus, fromDayAirline, toDayAirline, callback) {//lay du lieu tu ajax, tra ve data_member = {"booking_xuat_count":1039.0,"booking_huy_count":72.0}

            var conditions = {
            };

            conditions.booking_status = bookingStatus;
            conditions.from_day = fromDayAirline;
            conditions.to_day = toDayAirline;

            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_VIETAIR_STATISTIC_EXT001',
                    object_name: 'GET_DATA_AIRLINE_BF',
                    P_ROW_START: 0,
                    P_ROW_END: _configs.MAX_ROW,
                    P_CONDITIONS: JSON.stringify(conditions)
                },
                success: function (data) {
                    if (callback != null) {
                        jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    }
                    if (data.TypeMsg > 0) {
                        data_airline = data.Data;
                        if (callback) {
                            //jwm.Alert.ShowMsg(_configs.form_id, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');
                            callback();
                        }
                    }
                },
                error: function (http, message, exc) {
                }
            });



        }


     
        var init_data_chart_flight_booking_statistic = false;

        var is_flag_airline_is_date_range = false;//cờ xác định lấy theo gì, 0 là lấy theo năm, 1 là theo tháng, 2 là từ ngày đến ngày

        var initChartAirlineFlightBookingStatistic = function () {

            getDataChartFlyBookingInfoByAirline();

            $('#btn_view_chart_airline').unbind('click');
            $('#btn_view_chart_airline').click(function () {

                is_flag_airline_is_date_range = false;
                getDataChartFlyBookingInfoByAirline();

            });

            $('#btn_view_chart_airline_flight_booking_range').unbind('click');
            $('#btn_view_chart_airline_flight_booking_range').click(function () {

                is_flag_airline_is_date_range = true;
                getDataChartFlyBookingInfoByAirline();


            });

        }

        var getDataChartFlyBookingInfoByAirline = function () {

            if (is_flag_airline_is_date_range == false) {

                var bookingStatus = $('#booking_status_airline').val();

                getDataFlyBookingInfoByAirline(bookingStatus, null, null, prepareDataFlyBookingInfoByAirline);


            } else {

                var bookingStatus = $('#booking_status_airline_range').val();

                var from_day_airline = $('#from_day_airline').val();

                var to_day_airline = $('#to_day_airline').val();

                getDataFlyBookingInfoByAirline(bookingStatus, from_day_airline, to_day_airline, prepareDataFlyBookingInfoByAirline);

            }


        }


        var prepareDataFlyBookingInfoByAirline = function () {

            var data = [];
            var total;
            if (data_airline.CURSOR_DATA.length > 0) {
                for (var i = 0; i < data_airline.CURSOR_DATA.length; i++) {
                    var iObj = [];
                    iObj.push(data_airline.CURSOR_DATA[i].AIRLINE_NAME);
                    iObj.push(data_airline.CURSOR_DATA[i].BOOKING_COUNT);
                    data.push(iObj);
                }
            } else {
                data.push(0);
            }

            //console.log(data);
            if (is_flag_airline_is_date_range == false) {

                var booking_status = $('#booking_status_airline').val();
                if (booking_status == '') {
                    booking_status = 'mã dịch vụ đặt';

                } else if (booking_status == 3) {
                    booking_status = 'mã dịch vụ xuất';

                } else if (booking_status == 4) {
                    booking_status = 'mã dịch vụ hủy';
                }

                total = jLoki.Utils.FormatNumber(data_airline.OUTPUT_PARAMS.R_BOOKING_COUNT);

                bindDataChartAirlineFlightBookingStatistic(data, booking_status, total);

            } else {

                var from_day_airline = $('#from_day_airline').val();

                var to_day_airline = $('#to_day_airline').val();

                var booking_status = $('#booking_status_airline_range').val();

                if (booking_status == '') {
                    booking_status = 'mã dịch vụ đặt';

                } else if (booking_status == 3) {
                    booking_status = 'mã dịch vụ xuất';

                } else if (booking_status == 4) {
                    booking_status = 'mã dịch vụ hủy';
                }

                total = jLoki.Utils.FormatNumber(data_airline.OUTPUT_PARAMS.R_BOOKING_COUNT);

                bindDataChartAirlineFlightBookingStatisticDayToDay(data, booking_status, from_day_airline, to_day_airline, total);
            }


        }


        var bindDataChartAirlineFlightBookingStatistic = function (data, cate_ticket, total) {

            $('#bao_cao_theo_hang').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Thống kê ' + cate_ticket + ' theo hãng hàng không - ' + total + ' mã dịch vụ'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'

                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            formatter: function () {
                                labels = '';
                                var i;
                                for (i = 0; i < data.length; i++) {
                                    if (this.point.name == data[i][0]) {
                                        labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + jLoki.Utils.FormatNumber(data[i][1]) + ' mã dịch vụ)';
                                    }
                                }
                                // if (this.point.name == 'Jetstar Pacific') {
                                //      labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[0][1] + ' vé)';
                                //  }
                                //  if (this.point.name == 'VietJet Air') {
                                //       labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[1][1] + ' vé)'
                                //   }
                                //  if (this.point.name == 'Vietnam Airlines') {
                                //     labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[2][1] + ' vé)'
                                //  }
                                return labels;
                            },
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Tỷ lệ',
                    data: data
                }]
            });
        }

        var bindDataChartAirlineFlightBookingStatisticDayToDay = function (data, booking_status, from_day_airline, to_day_airline, total) {
            $('#bao_cao_theo_hang').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Thống kê ' + booking_status + ' theo hãng hàng không ' + 'từ ' + from_day_airline + ' đến ' + to_day_airline + ' có ' + total + ' mã dịch vụ'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'

                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            formatter: function () {
                                labels = '';
                                var i;
                                for (i = 0; i < data.length; i++) {
                                    if (this.point.name == data[i][0]) {
                                        labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + jLoki.Utils.FormatNumber(data[i][1]) + ' mã dịch vụ)';
                                    }
                                }
                                // if (this.point.name == 'Jetstar Pacific') {
                                //      labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[0][1] + ' vé)';
                                //  }
                                //  if (this.point.name == 'VietJet Air') {
                                //       labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[1][1] + ' vé)'
                                //   }
                                //  if (this.point.name == 'Vietnam Airlines') {
                                //     labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + data[2][1] + ' vé)'
                                //  }
                                return labels;
                            },
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Tỷ lệ',
                    data: data
                }]
            });
        }

     


        var initControls = function () {
            // console.log(89);


            setBasicLineDark();


            initTitleChart();



            //$('div[data-month-statistic]').each(function () {

            //    var $this = $(this);
            //    var data_month_statistic = $this.attr('data-month-statistic');
            //    var $input_month_statistic = $("input[data-month-statistic=" + data_month_statistic + "]");
            //    $this.birthdaypicker({
            //        maxAge: $input_month_statistic.attr('data-max-age'),
            //        minAge: $input_month_statistic.attr('data-min-age'),
            //        dateFormat: 'littleEndian',
            //        lang: 'vi',
            //        futureDates: false,
            //        defaultDate: $.format.date(current_date, 'yyyy-MM-dd'),
            //        onChange: function (hiddenDate) {

            //            //debugger;
            //            var arr_date = hiddenDate.split('-');
            //            $input_month_statistic.val(arr_date[1] + '/' + arr_date[0]);
            //            $input_day.val(1);

            //        }
            //    });

            //    var $input_day = $('[name="birth[day]"]', $this);
            //    $input_day.css('display', 'none');
            //    $input_day.val(1);

            //});

            //$('div[data-year-statistic]').each(function () {

            //    var $this = $(this);
            //    var data_year_statistic = $this.attr('data-year-statistic');
            //    var $input_year_statistic = $("input[data-year-statistic=" + data_year_statistic + "]");
            //    $this.birthdaypicker({
            //        maxAge: $input_year_statistic.attr('data-max-age'),
            //        minAge: $input_year_statistic.attr('data-min-age'),
            //        dateFormat: 'littleEndian',
            //        lang: 'vi',
            //        futureDates: false,
            //        defaultDate: $.format.date(current_date, 'yyyy-MM-dd'),
            //        onChange: function (hiddenDate) {

            //            //debugger;
            //            var arr_date = hiddenDate.split('-');
            //            $input_year_statistic.val(arr_date[0]);
            //            $input_day.val(1);
            //            $input_month.val(1);

            //        }
            //    });

            //    var $input_day = $('[name="birth[day]"]', $this);
            //    var $input_month = $('[name="birth[month]"]', $this);
            //    $input_day.css('display', 'none');
            //    $input_month.css('display', 'none');
            //    $input_day.val(1);
            //    $input_month.val(1);

            //});


            $(' #from_day_airline, #to_day_airline').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            $(' #from_day_airline, #to_day_airline').val($.format.date(current_date, 'dd/MM/yyyy'));
        }




        var init = function (options) {


            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }

        return ({

            "init": init

        });

    };

}());