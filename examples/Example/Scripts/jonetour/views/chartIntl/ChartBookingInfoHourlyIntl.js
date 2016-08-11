(function () {

    VA.views.chartIntl.ChartBookingInfoHourlyIntl = function () {

        var _configs = {
        }

        //--------------------------------------------------
        //to do
        var form_input_from_date = null;
        var form_input_to_date = null;

        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('.choose-box').css('display', 'none');
            $('#chart-Hourly-service-code').css('display', 'block');
            $('.title-charts').text('Thống kê mã dịch vụ quốc tế theo giờ');
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

        var getFormInput = function () {

            form_input_from_date = $('#from_date_hour_service_code').val();

            form_input_to_date = $('#to_date_hour_service_code').val();


        }


        var prepareDataChart = function (resp) {

            var data_chart = {};

            data_chart.DATA_STATUS_3 = [];
            data_chart.DATA_STATUS_4 = [];


            for (var i = 0; i < resp.Data.CURSOR_DATA.length; i++) {

                var item = resp.Data.CURSOR_DATA[i];

                data_chart.DATA_STATUS_3.push(item.STATUS_3);

                data_chart.DATA_STATUS_4.push(item.STATUS_4);


            }

            data_chart.DATA_STATUS_3_PERCENT = [];
            data_chart.DATA_STATUS_4_PERCENT = [];

            for (var i = 0; i < resp.Data.CURSOR_DATA.length; i++) {

                var item = resp.Data.CURSOR_DATA[i];

                if (item.STATUS_3 == 0 && item.STATUS_4 == 0) {
                    data_chart.DATA_STATUS_3_PERCENT.push(0);
                    data_chart.DATA_STATUS_4_PERCENT.push(0);

                }
                else
                {
                    data_chart.DATA_STATUS_3_PERCENT.push(Math.round((item.STATUS_3 / (item.STATUS_3 + item.STATUS_4)) * 100));

                    data_chart.DATA_STATUS_4_PERCENT.push(Math.round((item.STATUS_4 / (item.STATUS_3 + item.STATUS_4)) * 100));
                }

            }

            var from_day = $('#from_date_hour_service_code').val();

            var to_day = $('#to_date_hour_service_code').val();

            data_chart.from_day = from_day;

            data_chart.to_day = to_day;


            data_chart.Sum_DAT = 0;
            for (var i = 0; i < data_chart.DATA_STATUS_3.length ; i++) {

                var count_by_d = data_chart.DATA_STATUS_3[i] + data_chart.DATA_STATUS_4[i];
                data_chart.Sum_DAT += count_by_d;

            }
            var sum_dat_ph = Highcharts.numberFormat(data_chart.Sum_DAT, 0);

            $('#id_sum_put').html(sum_dat_ph);


            //------------------Tong xuat-------------------------

            data_chart.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data_chart.DATA_STATUS_3.length ; i++) {

                var count_by_x = data_chart.DATA_STATUS_3[i];

                data_chart.Sum_XUAT += count_by_x;
            }


            count_ptx = (data_chart.Sum_XUAT / data_chart.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data_chart.Sum_XUAT, 0);

            $('#id_sum_export').html(sum_xuat_ph);

            $('#id_pt_exp').html(count_ptx_tmp);


            //------------------Tong huy-------------------------

            data_chart.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data_chart.DATA_STATUS_4.length ; i++) {

                var count_by_h = data_chart.DATA_STATUS_4[i];

                data_chart.Sum_HUY += count_by_h;
            }

            count_pth = (data_chart.Sum_HUY / data_chart.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data_chart.Sum_HUY, 0);

            $('#id_sum_cancel').html(sum_huy_ph);

            $('#id_pt_cancel').html(count_pth_tmp);



            return data_chart;

        }

        var renderChart = function (dataChart) {

            $('#bao_cao_theo_gio').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê MDV theo giờ từ ' + dataChart.from_day + ' đến ' + dataChart.to_day
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    categories: ['0h-1h', '1h-2h', '2h-3h', '3h-4h', '4h-5h', '5h-6h', '6h-7h', '7h-8h', '8h-9h', '9h-10h', '10h-11h', '11h-12h', '12h-13h', '13h-14h', '14h-15h', '15h-16h', '16h-17h', '17h-18h', '18h-19h', '19h-20h', '20h-21h', '21h-22h', '22h-23h', '23h']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số lượng mã dịch vụ'
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

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },


                tooltip: {
                    formatter: function () {
                        labels = '';

                        labels = '<b>' + Highcharts.numberFormat(this.y, 0) + ' (' + Highcharts.numberFormat(this.percentage, 2) + '%)' + '</b><br/>' +
                 'Trong khoảng: ' + this.x;

                        return labels;

                    }
                },

                series: [
                    {
                        name: 'MDV Hủy',
                        color: '#f45b5b',
                        data: dataChart.DATA_STATUS_4
                    },
                    {
                        name: 'MDV Xuất',
                        color: '#90ee7e',
                        data: dataChart.DATA_STATUS_3
                    }]
            });

        }

        var renderChartPercent = function (dataChart) {


            $('#bao_cao_theo_gio_percent').highcharts({

                title: {
                    text: 'Biểu đồ % thống kê MDV theo giờ từ ' + dataChart.from_day + ' đến ' + dataChart.to_day,//title bieu do
                    x: -20 //center
                },
                subtitle: {
                    text: 'VietAir.tv',
                    x: -20
                },
                xAxis: {
                    categories: ['0h-1h', '1h-2h', '2h-3h', '3h-4h', '4h-5h', '5h-6h', '6h-7h', '7h-8h', '8h-9h', '9h-10h', '10h-11h', '11h-12h', '12h-13h', '13h-14h', '14h-15h', '15h-16h', '16h-17h', '17h-18h', '18h-19h', '19h-20h', '20h-21h', '21h-22h', '22h-23h', '23h']
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
                        if (this.series.name == 'MDV Hủy') {
                            labels = 'Khoảng <b>' + this.x + '</b> có <b>' + this.y + '</b> % mã hủy';
                        }
                        if (this.series.name == 'MDV Xuất') {
                            labels = 'Khoảng <b>' + this.x + '</b> có <b>' + this.y + '</b> % mã xuất';
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
                series: [
                    {
                        name: 'MDV Hủy',
                        color: '#f45b5b',
                        data: dataChart.DATA_STATUS_4_PERCENT
                    },
                    {
                        name: 'MDV Xuất',
                        color: '#90ee7e',
                        data: dataChart.DATA_STATUS_3_PERCENT
                    }]
            });
        }
        var getDataChart = function (fromDate, toDate) {


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_001',

                    P_FROM_DATE: fromDate,

                    P_TO_DATE: toDate
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {

                        var data_chart = prepareDataChart(resp);

                        renderChart(data_chart);

                        renderChartPercent(data_chart);

                    }
                },
                error: function (http, message, exc) {
                }
            });
        }

        var initFirstRun = function () {

            var current_date = new Date();
            $('#from_date_hour_service_code, #to_date_hour_service_code').val($.format.date(current_date, 'dd/MM/yyyy'));

            getFormInput();

            getDataChart(form_input_from_date, form_input_to_date);

        }



        var initControls = function () {
            setBasicLineDark();

            initTitleChart();

            $('#from_date_hour_service_code, #to_date_hour_service_code').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });




            $('#btn_view_hourly_service_code_id').unbind('click');
            $('#btn_view_hourly_service_code_id').click(function () {

                getFormInput();

                getDataChart(form_input_from_date, form_input_to_date);

            });


            if ($('#bao_cao_theo_gio').attr('data-highcharts-chart') == undefined) {

                initFirstRun();

            }

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