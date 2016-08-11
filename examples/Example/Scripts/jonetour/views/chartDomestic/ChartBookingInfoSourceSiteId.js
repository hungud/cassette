(function () {

    VA.views.chartDomestic.ChartBookingInfoSourceSiteId = function () {

        var _configs = {
        }


        var current_date = new Date();

        var data_booking_info_by_source_site_id = {
        };

        //var data_chart_fly_Booking_Info_By_Year = {
        //};


        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('#chart-source-site-id').css('display', 'block');
            $('.title-charts').text('Thống kê mã dịch vụ nội địa theo nguồn đặt vé');
            initChartBookingInfoSourceSiteId();

        }



        var initChartBookingInfoSourceSiteId = function () {

            initDataChartSourceSiteIdBooking();

            $('#btn_view_source_site_id_only_booking_status').unbind('click');
            $('#btn_view_source_site_id_only_booking_status').click(function () {

                is_flag_source_site_is_date_range = false;
                initDataChartSourceSiteIdBooking();

            });

            $('#btn_view_chart_source_site_id_range').unbind('click');
            $('#btn_view_chart_source_site_id_range').click(function () {

                is_flag_source_site_is_date_range = true;
                initDataChartSourceSiteIdBooking();

            });

        }

        var is_flag_source_site_control = false;

        var is_flag_source_site_is_date_range = false;//cờ xác định có lấy dữ liệu theo từ ngày đến ngày hay không (thống kê theo nguồn đặt vé) false là không, true là có



        var initDataChartSourceSiteIdBooking = function () {
            if (is_flag_source_site_is_date_range == false) {

                if (is_flag_source_site_control == false) {

                    is_flag_source_site_control = true;

                    getDataChartBookingInfoBySourceSiteId(null, null, null);

                } else {

                    var booking_status_source_site_id = $('#booking_status_source_site_id').val();

                    getDataChartBookingInfoBySourceSiteId(booking_status_source_site_id, null, null);

                }
            } else {

                var booking_status_source_site_id_range = $('#booking_status_source_site_id_range').val();

                var from_day_source_site_id = $('#from_day_source_site_id').val();

                var to_day_source_site_id = $('#to_day_source_site_id').val();

                getDataChartBookingInfoBySourceSiteId(booking_status_source_site_id_range, from_day_source_site_id, to_day_source_site_id);
            }
        }

        var getDataChartBookingInfoBySourceSiteId = function (bookingStatus, from_day_source_site_id, to_day_source_site_id) {

            getDataBookingInfoBySourceSiteId(bookingStatus, from_day_source_site_id, to_day_source_site_id, prepareDataBookingInfoBySourceSiteId);

        }


        var getDataBookingInfoBySourceSiteId = function (bookingStatus, fromDaySourceSiteId, toDaySourceSiteId, callback) {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_VIETAIR_STATISTIC_EXT001',
                    OBJECT_NAME: 'GET_DATA_BY_SOURCE_SITE_ID',
                    P_BOOKING_STATUS: bookingStatus,
                    P_FROM_DAY: fromDaySourceSiteId,
                    P_TO_DAY: toDaySourceSiteId
                },
                success: function (data) {
                    if (callback != null) {
                        jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    }
                    if (data.TypeMsg > 0) {
                        data_booking_info_by_source_site_id = data.Data.CURSOR_DATA;
                        if (callback) {
                            // jwm.Alert.ShowMsg(_configs.form_id, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');
                            callback();
                        }
                    }
                },
                error: function (http, message, exc) {
                }
            });
        }

        var prepareDataBookingInfoBySourceSiteId = function () {

            var data = [];

            var total = 0;

            if (data_booking_info_by_source_site_id.length <= 0) {
                data.push(0);
            } else {
                for (var i = 0; i < data_booking_info_by_source_site_id.length; i++) {
                    var iObj = [];
                    total += data_booking_info_by_source_site_id[i].BOOKING_COUNT
                    iObj.push(data_booking_info_by_source_site_id[i].SOURCE_BOOKING_NAME);
                    iObj.push(data_booking_info_by_source_site_id[i].BOOKING_COUNT);
                    data.push(iObj);
                }
            }

            total = jLoki.Utils.FormatNumber(total);

            if (is_flag_source_site_is_date_range == false) {

                var booking_status_source_site_id = $('#booking_status_source_site_id').val();

                if (booking_status_source_site_id == "") {
                    booking_status_source_site_id = 'mã dịch vụ';
                } else if (booking_status_source_site_id == 0) {
                    booking_status_source_site_id = 'mã dịch vụ đặt';
                } else if (booking_status_source_site_id == 3) {
                    booking_status_source_site_id = 'mã dịch vụ xuất';
                } else if (booking_status_source_site_id == 4) {
                    booking_status_source_site_id = 'mã dịch vụ hủy';
                }
                bindDataChartBookingInfoSourceSiteId(data, total, booking_status_source_site_id);

            } else {

                var booking_status_source_site_id = $('#booking_status_source_site_id_range').val();
                if (booking_status_source_site_id == "") {
                    booking_status_source_site_id = 'mã dịch vụ';
                } else if (booking_status_source_site_id == 0) {
                    booking_status_source_site_id = 'mã dịch vụ đặt';
                } else if (booking_status_source_site_id == 3) {
                    booking_status_source_site_id = 'mã dịch vụ xuất';
                } else if (booking_status_source_site_id == 4) {
                    booking_status_source_site_id = 'mã dịch vụ hủy';
                }

                var from_day_source_site_id = $('#from_day_source_site_id').val();

                var to_day_source_site_id = $('#to_day_source_site_id').val();

                bindDataChartBookingInfoSourceSiteIdDayToDay(data, total, from_day_source_site_id, to_day_source_site_id, booking_status_source_site_id)
            }

        }


        var bindDataChartBookingInfoSourceSiteId = function (data, total, bookingStatus) {
            $('#bao_cao_theo_nguon_dat_ve').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Thống kê theo nguồn đặt vé - ' + total + ' ' + bookingStatus
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
                            formatter: function () {
                                labels = '';
                                var i;
                                for (i = 0; i < data.length; i++) {
                                    if (this.point.name == data[i][0]) {
                                        labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + jLoki.Utils.FormatNumber(data[i][1]) + ' mã dịch vụ)';
                                    }
                                }
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

        var bindDataChartBookingInfoSourceSiteIdDayToDay = function (data, total, from_day_source_site_id, to_day_source_site_id, cate_ticket_input) {
            $('#bao_cao_theo_nguon_dat_ve').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Thống kê theo nguồn đặt vé từ ' + from_day_source_site_id + ' đến ngày ' + to_day_source_site_id + ' có ' + total + ' ' + cate_ticket_input
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
                            formatter: function () {
                                labels = '';
                                var i;
                                for (i = 0; i < data.length; i++) {
                                    if (this.point.name == data[i][0]) {
                                        labels = this.point.name + ': ' + Highcharts.numberFormat(this.percentage, 1) + '% (' + jLoki.Utils.FormatNumber(data[i][1]) + ' mã dịch vụ)';
                                    }
                                }
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


        var initControls = function()
        {
           // console.log(89);


            setBasicLineDark();


            initTitleChart();


            $('#from_day_source_site_id, #to_day_source_site_id').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            $('#from_day_source_site_id, #to_day_source_site_id').val($.format.date(current_date, 'dd/MM/yyyy'));
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