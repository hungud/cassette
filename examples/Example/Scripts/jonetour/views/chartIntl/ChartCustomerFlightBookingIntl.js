(function () {

    VA.views.chartIntl.ChartCustomerFlightBookingIntl = function () {

        var _configs = {
        }


        var current_date = new Date();


        var data_chart_fly_Booking_Info_By_Customer_By_Day = {
        };

        var data_chart_fly_Booking_Info_By_Customer_By_Year = {
        };

        var data_chart_fly_Booking_Info_By_Customer_By_Month = {
        };

        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('#chart-customer-flight-booking').css('display', 'block');
            $('.title-charts').text('Thống kê tổng khách bay quốc tế');
            initChartCustomerFlightBookingStatistic();
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
                //tooltip: {
                //    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                //    style: {
                //        color: '#F0F0F0'
                //    }
                //},
                //plotOptions: {
                //    series: {
                //        dataLabels: {
                //            color: '#B0B0B3'
                //        },
                //        marker: {
                //            lineColor: '#333'
                //        }
                //    },
                //    boxplot: {
                //        fillColor: '#505053'
                //    },
                //    candlestick: {
                //        lineColor: 'white'
                //    },
                //    errorbar: {
                //        color: 'white'
                //    }
                //},
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


        var getDataFlyBookingInfoByCustomerByDay = function (chartName, fromDate, toDate, bookingStatus, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_005_NGAY',

                    P_FROM_DAY: fromDate,

                    P_TO_DAY: toDate,

                    P_BOOKING_STATUS: bookingStatus



                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Customer_By_Day[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        //du lieu lay theo thang

        var getDataFlyBookingInfoByCustomerByMonth = function (chartName, date, bookingStatus, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_005_THANG',

                    P_DATE: date,

                    P_BOOKING_STATUS: bookingStatus

                },
                success: function (resp) {


                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Customer_By_Month[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        //du lieu lay theo nam
        var getDataFlyBookingInfoByCustomerByYear = function (chartName, date, bookingStatus, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_005_NAM',

                    P_DATE: date,

                    P_BOOKING_STATUS: bookingStatus

                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Customer_By_Year[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }


        var prepareDataFlyBookingInfo = function () {
            //buoc chuan bi du lieu (3), ham nay tra ve doi tuong co cac tham so can thiet de chen vao ban do
            var data = {
            };
            //data la doi tuong ban dau
            data.DataChart_DAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_DAY;//tra du lieu vao key cua doi tuong data = {'DataChart_DAT': '......'}
            });
            data.DataChart_HUY = $.map(data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_HUY'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_DAY;
            });
            data.DataChart_XUAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_XUAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_DAY;
            });


            //ma dich vu khac
            //khoi tao mang ma dich vu khac
            data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_KHAC'] = [];
            data.DataChart_KHAC = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_XUAT'][idx];

                var item_khac = {
                    SUM_CUSTOMER_BY_DAY: item_dat.SUM_CUSTOMER_BY_DAY - item_huy.SUM_CUSTOMER_BY_DAY - item_xuat.SUM_CUSTOMER_BY_DAY,
                    DAY_COUNT: item_dat.DAY_COUNT,
                    DAY_VAL: item_dat.DAY_VAL
                };

                data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_KHAC'].push(item_khac);
                data.DataChart_KHAC.push(item_khac.SUM_CUSTOMER_BY_DAY);

            }
            //du lieu bieu do %

            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];
            data.DataChart_KHAC_PERCENT = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_XUAT'][idx];

                if (item_dat.SUM_CUSTOMER_BY_DAY == 0) {
                    var item_xuat_percent = {
                        SUM_CUSTOMER_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_huy_percent = {
                        SUM_CUSTOMER_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_khac_percent = {
                        SUM_CUSTOMER_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };
                }
                else {
                    item_xuat_percent = {
                        SUM_CUSTOMER_BY_DAY: Math.round((item_xuat.SUM_CUSTOMER_BY_DAY / item_dat.SUM_CUSTOMER_BY_DAY) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_huy_percent = {
                        SUM_CUSTOMER_BY_DAY: Math.round((item_huy.SUM_CUSTOMER_BY_DAY / item_dat.SUM_CUSTOMER_BY_DAY) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_khac_percent = {
                        SUM_CUSTOMER_BY_DAY: Math.round(100 - item_xuat_percent.SUM_CUSTOMER_BY_DAY - item_huy_percent.SUM_CUSTOMER_BY_DAY),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.SUM_CUSTOMER_BY_DAY);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.SUM_CUSTOMER_BY_DAY);
                data.DataChart_KHAC_PERCENT.push(item_khac_percent.SUM_CUSTOMER_BY_DAY);

                // console.log(data.DataChart_XUAT_PERCENT);
            }


            data.Categories = $.map(data_chart_fly_Booking_Info_By_Customer_By_Day['DataChart_DAT'], function (iRow) {

                return iRow.DAY_COUNT;
            });

            var from_day = $('#from_day_chart_customer_month').val();

            var to_day = $('#to_day_chart_customer_month').val();

            data.from_day = from_day;

            data.to_day = to_day;

            bindDataChartCustomerFlightBookingStatisticByDayToDay(data);

            bindDataChartCustomerFlightBookingStatisticByDayToDayTheoCot(data);




            //------------------Tong dat------------------------------               

            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_DAT.length; i++) {

                var count_by_d = data.DataChart_DAT[i];

                data.Sum_DAT += count_by_d;

            }

            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_dat').html(sum_dat_ph);


            //------------------Tong xuat-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_XUAT.length; i++) {

                var count_by_x = data.DataChart_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }

            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_exp_tk').html(sum_xuat_ph);

            $('#id_pt_exp_tk').html(count_ptx_tmp);


            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_HUY.length; i++) {

                var count_by_h = data.DataChart_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel_tk').html(sum_huy_ph);

            $('#id_pt_cancel_tk').html(count_pth_tmp);
        }

        var prepareDataFlyBookingInfoByYear = function () {

            //var date = $('#date_chart_year_flight_booking_value').val();
            var data = {
            };
            data.DataChart_DAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_YEAR;
            });
            data.DataChart_HUY = $.map(data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_HUY'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_YEAR;
            });
            data.DataChart_XUAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_XUAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_YEAR;
            });


            //ma dich vu khac
            //khoi tao mang ma dich vu khac
            data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_KHAC'] = [];
            data.DataChart_KHAC = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_XUAT'][idx];

                var item_khac = {
                    SUM_CUSTOMER_BY_YEAR: item_dat.SUM_CUSTOMER_BY_YEAR - item_huy.SUM_CUSTOMER_BY_YEAR - item_xuat.SUM_CUSTOMER_BY_YEAR,
                    MONTH_COUNT: item_dat.MONTH_COUNT,
                    MONTH_VAL: item_dat.MONTH_VAL
                };

                data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_KHAC'].push(item_khac);
                data.DataChart_KHAC.push(item_khac.SUM_CUSTOMER_BY_YEAR);

            }
            //du lieu bieu do %
            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];
            data.DataChart_KHAC_PERCENT = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_XUAT'][idx];

                if (item_dat.SUM_CUSTOMER_BY_YEAR == 0) {
                    var item_xuat_percent = {
                        SUM_CUSTOMER_BY_YEAR: 0,
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    var item_huy_percent = {
                        SUM_CUSTOMER_BY_YEAR: 0,
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    var item_khac_percent = {
                        SUM_CUSTOMER_BY_YEAR: 0,
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };
                }
                else {
                    item_xuat_percent = {
                        SUM_CUSTOMER_BY_YEAR: Math.round((item_xuat.SUM_CUSTOMER_BY_YEAR / item_dat.SUM_CUSTOMER_BY_YEAR) * 100),
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    item_huy_percent = {
                        SUM_CUSTOMER_BY_YEAR: Math.round((item_huy.SUM_CUSTOMER_BY_YEAR / item_dat.SUM_CUSTOMER_BY_YEAR) * 100),
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    item_khac_percent = {
                        SUM_CUSTOMER_BY_YEAR: Math.round(100 - item_xuat_percent.SUM_CUSTOMER_BY_YEAR - item_huy_percent.SUM_CUSTOMER_BY_YEAR),
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.SUM_CUSTOMER_BY_YEAR);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.SUM_CUSTOMER_BY_YEAR);
                data.DataChart_KHAC_PERCENT.push(item_khac_percent.SUM_CUSTOMER_BY_YEAR);

                // console.log(data.DataChart_XUAT_PERCENT);
            }


            var date = $('#date_chart_customer_year_flight_booking_value').val();

            data.Categories = $.map(data_chart_fly_Booking_Info_By_Customer_By_Year['DataChart_DAT'], function (iRow) {
                return iRow.MONTH_COUNT;
            });

            data.Year = date;

            bindDataChartCustomerFlightBookingStatisticByYear(data);

            bindDataChartCustomerFlightBookingStatisticByYearTheoCot(data);

            //------------------Tong dat------------------------------               

            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_DAT.length; i++) {

                var count_by_d = data.DataChart_DAT[i];

                data.Sum_DAT += count_by_d;

            }

            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_dat').html(sum_dat_ph);


            //------------------Tong xuat-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_XUAT.length; i++) {

                var count_by_x = data.DataChart_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }

            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_exp_tk').html(sum_xuat_ph);

            $('#id_pt_exp_tk').html(count_ptx_tmp);


            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_HUY.length; i++) {

                var count_by_h = data.DataChart_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel_tk').html(sum_huy_ph);

            $('#id_pt_cancel_tk').html(count_pth_tmp);
        }

        var prepareDataFlyBookingInfoByMonth = function () {
            //buoc chuan bi du lieu (3), ham nay tra ve doi tuong co cac tham so can thiet de chen vao ban do
            var data = {
            };
            //data la doi tuong ban dau
            data.DataChart_DAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_MONTH;//tra du lieu vao key cua doi tuong data = {'DataChart_DAT': '......'}
            });
            data.DataChart_HUY = $.map(data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_HUY'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_MONTH;
            });
            data.DataChart_XUAT = $.map(data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_XUAT'], function (iRow) {
                return iRow.SUM_CUSTOMER_BY_MONTH;
            });


            //ma dich vu khac
            //khoi tao mang ma dich vu khac
            data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_KHAC'] = [];
            data.DataChart_KHAC = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_XUAT'][idx];

                var item_khac = {
                    SUM_CUSTOMER_BY_MONTH: item_dat.SUM_CUSTOMER_BY_MONTH - item_huy.SUM_CUSTOMER_BY_MONTH - item_xuat.SUM_CUSTOMER_BY_MONTH,
                    DAY_COUNT: item_dat.DAY_COUNT,
                    DAY_VAL: item_dat.DAY_VAL
                };

                data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_KHAC'].push(item_khac);
                data.DataChart_KHAC.push(item_khac.SUM_CUSTOMER_BY_MONTH);

            }
            //du lieu bieu do %

            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];
            data.DataChart_KHAC_PERCENT = [];
            //tao vong lap de lay cac phan tu trong mang du lieu ma dich vu khac
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'][idx];

                var item_huy = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_HUY'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_XUAT'][idx];

                if (item_dat.SUM_CUSTOMER_BY_MONTH == 0) {
                    var item_xuat_percent = {
                        SUM_CUSTOMER_BY_MONTH: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_huy_percent = {
                        SUM_CUSTOMER_BY_MONTH: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_khac_percent = {
                        SUM_CUSTOMER_BY_MONTH: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };
                }
                else {
                    item_xuat_percent = {
                        SUM_CUSTOMER_BY_MONTH: Math.round((item_xuat.SUM_CUSTOMER_BY_MONTH / item_dat.SUM_CUSTOMER_BY_MONTH) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_huy_percent = {
                        SUM_CUSTOMER_BY_MONTH: Math.round((item_huy.SUM_CUSTOMER_BY_MONTH / item_dat.SUM_CUSTOMER_BY_MONTH) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_khac_percent = {
                        SUM_CUSTOMER_BY_MONTH: Math.round(100 - item_xuat_percent.SUM_CUSTOMER_BY_MONTH - item_huy_percent.SUM_CUSTOMER_BY_MONTH),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.SUM_CUSTOMER_BY_MONTH);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.SUM_CUSTOMER_BY_MONTH);
                data.DataChart_KHAC_PERCENT.push(item_khac_percent.SUM_CUSTOMER_BY_MONTH);

                // console.log(data.DataChart_XUAT_PERCENT);
            }

            var date = $('#date_chart_customer_month_flight_booking_value').val();


            data.Categories = $.map(data_chart_fly_Booking_Info_By_Customer_By_Month['DataChart_DAT'], function (iRow) {

                return iRow.DAY_COUNT;
            });

            data.Month = date;

            bindDataChartCustomerFlightBookingStatisticByMonth(data);

            bindDataChartCustomerFlightBookingStatisticByMonthTheoCot(data);
            //------------------Tong dat------------------------------               

            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_DAT.length; i++) {

                var count_by_d = data.DataChart_DAT[i];

                data.Sum_DAT += count_by_d;

            }

            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_dat').html(sum_dat_ph);


            //------------------Tong xuat-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_XUAT.length; i++) {

                var count_by_x = data.DataChart_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }

            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_exp_tk').html(sum_xuat_ph);

            $('#id_pt_exp_tk').html(count_ptx_tmp);


            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_HUY.length; i++) {

                var count_by_h = data.DataChart_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel_tk').html(sum_huy_ph);

            $('#id_pt_cancel_tk').html(count_pth_tmp);
        }



        var init_data_chart_customer_month_flight_booking_statistic = false;

        var flag_type_of_customer_chart = 1;//cờ xác định lấy theo gì, 0 là lấy theo năm, 1 là theo tháng, 2 là từ ngày đến ngày

        var initChartCustomerFlightBookingStatistic = function () {

            $('#btn_view_chart_customer_year_flight_booking').unbind('click')
            $('#btn_view_chart_customer_year_flight_booking').click(function () {//khi click chon xem bieu do theo nam 

                flag_type_of_customer_chart = 0;
                var year = $('#date_chart_customer_year_flight_booking_value').val();

                getDataChartFlyBookingInfoByCustomerByYear(year);//dau vao la nam

            });

            $('#btn_view_chart_customer_month_flight_booking').unbind('click')
            $('#btn_view_chart_customer_month_flight_booking').click(function () {////khi click chon xem bieu do theo thang
                flag_type_of_customer_chart = 1;
                var date = $('#date_chart_customer_month_flight_booking_value').val();
                getDataChartFlyBookingInfoByCustomerByMonth(date);//dau vao la thang

            });


            $('#btn_view_chart_customer_month_flight_booking_range').unbind('click')
            $('#btn_view_chart_customer_month_flight_booking_range').click(function () {//khi click chon xem bieu do theo ngay den ngay
                flag_type_of_customer_chart = 2;
                var from_day_chart_month = $('#from_day_chart_customer_month').val();
                var to_day_chart_month = $('#to_day_chart_customer_month').val();
                getDataChartFlyBookingInfoByCustomerByDay(from_day_chart_month, to_day_chart_month);//dau vao la tu ngay den ngay
            });

            if (init_data_chart_customer_month_flight_booking_statistic == false) {
                init_data_chart_customer_month_flight_booking_statistic = true;
                //-----------------------------------------------------------------
                //init first cho chart

                //tao bieu do cho thang hien tai                   
                var date = $.format.date(current_date, 'MM/yyyy');
                $('#date_chart_customer_month_flight_booking_value').val(date);

                var year = $.format.date(current_date, 'yyyy');
                $('#date_chart_customer_year_flight_booking_value').val(year);//tạo giá trị năm ban đầu


                $('#from_day_chart_customer_month, #to_day_chart_customer_month').val($.format.date(current_date, 'dd/MM/yyyy'));

                getDataChartFlyBookingInfoByCustomerByMonth(date);
            }



        }


        var getDataChartFlyBookingInfoByCustomerByDay = function (from_day_chart_month, to_day_chart_month) {

            //lay du lieu theo ngay
            getDataFlyBookingInfoByCustomerByDay('DataChart_DAT', from_day_chart_month, to_day_chart_month, null, null);
            getDataFlyBookingInfoByCustomerByDay('DataChart_HUY', from_day_chart_month, to_day_chart_month, 4, null);
            getDataFlyBookingInfoByCustomerByDay('DataChart_XUAT', from_day_chart_month, to_day_chart_month, 3, function () {
                setTimeout(function () { prepareDataFlyBookingInfo(); }, 1000);
            });

        }

        var getDataChartFlyBookingInfoByCustomerByMonth = function (date) {

            //lay du lieu theo thang
            getDataFlyBookingInfoByCustomerByMonth('DataChart_DAT', date, null, null);
            getDataFlyBookingInfoByCustomerByMonth('DataChart_HUY', date, 4, null);
            getDataFlyBookingInfoByCustomerByMonth('DataChart_XUAT', date, 3, function () {
                setTimeout(function () { prepareDataFlyBookingInfoByMonth(); }, 1000);
            });

        }

        var getDataChartFlyBookingInfoByCustomerByYear = function (date) {

            //lay du lieu theo nam
            getDataFlyBookingInfoByCustomerByYear('DataChart_DAT', date, null, null);
            getDataFlyBookingInfoByCustomerByYear('DataChart_HUY', date, 4, null);
            getDataFlyBookingInfoByCustomerByYear('DataChart_XUAT', date, 3, function () {
                setTimeout(function () { prepareDataFlyBookingInfoByYear(); }, 1000);
            });

        }

        var bindDataChartCustomerFlightBookingStatisticByDayToDay = function (data) {

            $('#bao_cao_theo_khach').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê tổng khách bay từ ' + data.from_day + ' đến ' + data.to_day,//title bieu do
                    x: -20 //center
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Từ ' + data.from_day + ' đến ' + data.to_day//title cot x
                    },
                    categories: data.Categories
                },
                yAxis: {
                    title: {
                        text: 'Percent'//title cot y
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                    },
                    maxPadding: 0.05,
                    showLastLabel: true

                },

                tooltip: {
                    formatter: function () {//xet chinh title cua bang popup
                        labels = '';
                        if (this.series.name == 'Khách - mã hủy') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã hủy';
                        }
                        if (this.series.name == 'Khách - mã khác') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã khác';
                        }
                        if (this.series.name == 'Khách - mã xuất') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã xuất';
                        }
                        return labels;

                    }
                    //pointFormat: '<span style="color:{series.color}">{series.name}</span>: </br><b>{point.y:.2f}%</b>',
                    //shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY_PERCENT
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC_PERCENT
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT_PERCENT
                }]
            });
        }


        var bindDataChartCustomerFlightBookingStatisticByMonth = function (data) {

            $('#bao_cao_theo_khach').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê tổng khách bay trong tháng ' + data.Month,//title bieu do
                    x: -20 //center
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Ngày trong tháng ' + data.Month//title cot x
                    },
                    tickmarkPlacement: 'on',
                    categories: data.Categories
                },
                yAxis: {
                    title: {
                        text: 'Percent'//title cot y
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                    },
                    maxPadding: 0.05,
                    showLastLabel: true

                },

                tooltip: {

                    formatter: function () {//xet chinh title cua bang popup
                        labels = '';
                        if (this.series.name == 'Khách - mã hủy') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã hủy';
                        }
                        if (this.series.name == 'Khách - mã khác') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã khác';
                        }
                        if (this.series.name == 'Khách - mã xuất') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã xuất';
                        }
                        return labels;

                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY_PERCENT
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC_PERCENT
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT_PERCENT
                }]
            });
        }


        var bindDataChartCustomerFlightBookingStatisticByYear = function (data) {

            $('#bao_cao_theo_khach').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê tổng khách bay trong năm ' + data.Year,//title bieu do
                    x: -20 //center
                },
                subtitle: {
                    text: 'VIETAIR.TV',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Tháng trong năm ' + data.Year//title cot x
                    },
                    categories: data.Categories
                },
                yAxis: {
                    title: {
                        text: 'Percent'//title cot y
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '%';
                        }
                    },
                    maxPadding: 0.05,
                    showLastLabel: true

                },

                tooltip: {

                    formatter: function () {//xet chinh title cua bang popup
                        labels = '';
                        if (this.series.name == 'Khách - mã hủy') {
                            labels = 'Tháng <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã hủy';
                        }
                        if (this.series.name == 'Khách - mã khác') {
                            labels = 'Tháng <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã khác';
                        }
                        if (this.series.name == 'Khách - mã xuất') {
                            labels = 'Tháng <b>' + this.x + '</b> có <b>' + this.y + '</b> % Khách- mã xuất';
                        }
                        return labels;

                    }


                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY_PERCENT
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC_PERCENT
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT_PERCENT
                }]
            });
        }



        var bindDataChartCustomerFlightBookingStatisticByDayToDayTheoCot = function (data) {
            $('#bao_cao_theo_khach_cot').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê tổng khách bay từ ' + data.from_day + ' đến ' + data.to_day,//title bieu do
                    //x: -20 //center
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Từ ' + data.from_day + ' đến ' + data.to_day//title cot x
                    },
                    categories: data.Categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số lượng khách'
                    },

                    //the hien so o tren cột
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    }
                },
                //so trong cot
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: '#000'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>Tổng khách bay:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT
                }]
            });
        }



        var bindDataChartCustomerFlightBookingStatisticByMonthTheoCot = function (data) {
            $('#bao_cao_theo_khach_cot').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê tổng khách bay trong tháng ' + data.Month,//title bieu do
                    //x: -20 //center
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Ngày trong tháng ' + data.Month//title cot x
                    },
                    categories: data.Categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số lượng khách'
                    },

                    //the hien so o tren cột
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    }
                },
                //so trong cot
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: '#000'
                        }
                    }
                },

                tooltip: {


                    headerFormat: '<b>Ngày {point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>Tổng khách bay:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT
                }]
            });
        }



        var bindDataChartCustomerFlightBookingStatisticByYearTheoCot = function (data) {
            $('#bao_cao_theo_khach_cot').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê tổng khách bay trong năm ' + data.Year,//title bieu do

                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    title: {
                        text: 'Tháng trong năm ' + data.Year//title cot x
                    },
                    categories: data.Categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số lượng khách'
                    },

                    //the hien so o tren cột
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: '#fff'
                        }
                    }
                },
                //so trong cot
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: '#000'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<b>Tháng {point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>Tổng khách bay:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Khách - mã hủy',
                    color: '#c0504d',
                    data: data.DataChart_HUY
                }, {
                    name: 'Khách - mã khác',
                    color: '#f7a35c',
                    data: data.DataChart_KHAC
                }, {
                    name: 'Khách - mã xuất',
                    color: '#9bbb59',
                    data: data.DataChart_XUAT
                }]
            });
        }




        var initControls = function () {
            // console.log(89);


            setBasicLineDark();


            initTitleChart();



            $('div[data-month-statistic]').each(function () {

                var $this = $(this);
                var data_month_statistic = $this.attr('data-month-statistic');
                var $input_month_statistic = $("input[data-month-statistic=" + data_month_statistic + "]");
                $this.birthdaypicker({
                    maxAge: $input_month_statistic.attr('data-max-age'),
                    minAge: $input_month_statistic.attr('data-min-age'),
                    dateFormat: 'littleEndian',
                    lang: 'vi',
                    futureDates: false,
                    defaultDate: $.format.date(current_date, 'yyyy-MM-dd'),
                    onChange: function (hiddenDate) {

                        //debugger;
                        var arr_date = hiddenDate.split('-');
                        $input_month_statistic.val(arr_date[1] + '/' + arr_date[0]);
                        $input_day.val(1);

                    }
                });

                var $input_day = $('[name="birth[day]"]', $this);
                $input_day.css('display', 'none');
                $input_day.val(1);

            });

            $('div[data-year-statistic]').each(function () {

                var $this = $(this);
                var data_year_statistic = $this.attr('data-year-statistic');
                var $input_year_statistic = $("input[data-year-statistic=" + data_year_statistic + "]");
                $this.birthdaypicker({
                    maxAge: $input_year_statistic.attr('data-max-age'),
                    minAge: $input_year_statistic.attr('data-min-age'),
                    dateFormat: 'littleEndian',
                    lang: 'vi',
                    futureDates: false,
                    defaultDate: $.format.date(current_date, 'yyyy-MM-dd'),
                    onChange: function (hiddenDate) {

                        //debugger;
                        var arr_date = hiddenDate.split('-');
                        $input_year_statistic.val(arr_date[0]);
                        $input_day.val(1);
                        $input_month.val(1);

                    }
                });

                var $input_day = $('[name="birth[day]"]', $this);
                var $input_month = $('[name="birth[month]"]', $this);
                $input_day.css('display', 'none');
                $input_month.css('display', 'none');
                $input_day.val(1);
                $input_month.val(1);

            });


            $('#from_day_chart_customer_month, #to_day_chart_customer_month').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });


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