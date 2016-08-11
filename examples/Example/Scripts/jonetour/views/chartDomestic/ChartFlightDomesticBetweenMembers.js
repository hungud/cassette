(function () {

    VA.views.chartDomestic.ChartFlightDomesticBetweenMembers = function () {

        var _configs = {
        }


        var current_date = new Date();

        var data_all_member = [];

        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('#chart-all-flight-booking').css('display', 'block');
            $('.title-charts').text('Thống kê chặng bay nội địa giữa các nhân viên');
            initChartBookingBetweenMembers();
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

        var initChartBookingBetweenMembers = function () {

            if (is_flag_init_all_members_pickList_control == false) {
                getDataMemberBookingInfo(initControlChartBookingBetweenMembers);
            }
            else {
                initControlChartBookingBetweenMembers();
            }

        }

        var getDataMemberBookingInfo = function (callback) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/listinfo.asmx/GetDataMembers",
                dataType: "jsonp",
                data: null,
                success: function (data) {

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_all_member').data('data_source', data_list);
                    //clear event
                    jQuery('#all_members').empty();

                    jQuery('#tmp_all_member').tmpl(data_list).appendTo('#all_members');

                    if (callback) callback();
                },
                error: function (http, message, exc) {
                }
            });
        }

        var is_flag_init_all_members_pickList_control = false;


        var initControlChartBookingBetweenMembers = function () {

            if (is_flag_init_all_members_pickList_control == false) {
                is_flag_init_all_members_pickList_control = true;

                $("#all_members").pickList({
                    sortItems: false
                });//khoi tao list to list                    
            }

            $('.pickList_sourceListLabel').text('Nhân viên chưa chọn');
            $('.pickList_targetListLabel').text('Nhân viên đã chọn');
            $('#btn_view_chart_all_flight_booking').unbind('click');
            $('#btn_view_chart_all_flight_booking').bind('click', function () {

                var date = $('#date_chart_all_flight_booking_value').val();
                var ary_mb_id = $('#all_members').val();

                var from_date = $('#date_start').val();
                var to_date = $('#date_end').val();

                getDataChartFlightDomesticBetweenMembers(ary_mb_id, from_date, to_date);

            });
        }

        var getDataChartFlightDomesticBetweenMembers = function (aryMbId, fromDate, toDate) {
            var func_callback = null;
            data_all_member = [];//khoi tao lai mang du lieu
            for (var idx = 0 ; idx < aryMbId.length; idx++) {
                var mb_id = aryMbId[idx];
                //cuoi mang du lieu thi moi goi ham callback
                if (idx == aryMbId.length - 1) {
                    func_callback = prepareDataFlightDomesticBetweenMembers;
                }
                else {
                    func_callback = null;
                }
                getDataFlightDomesticBetweenMembers(mb_id, fromDate, toDate, func_callback);
            }
        }

        var getDataFlightDomesticBetweenMembers = function (mb_id, from_date, to_date, callback) {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                async: false, //dung dong bo trong truong hop nay vi lay nhieu mb_id tong hop du lieu
                data: {

                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_006_NGAY',

                    P_FROM_DAY: from_date,

                    P_TO_DAY: to_date,

                    P_MB_ID: mb_id


                    // mb_ids: mb_id, from_date: from_date, to_date: to_date
                },
                success: function (resp) {
                    if (callback != null) {
                        jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    }
                    if (resp.TypeMsg > 0) {

                        data_all_member.push(resp.Data.CURSOR_DATA[0]);

                        //  console.log(data_all_member);
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


        var prepareDataFlightDomesticBetweenMembers = function () {
            var data = {
            };
            data.from_date = $('#date_start').val();
            data.to_date = $('#date_end').val();

            data.Data_XUAT = $.map(data_all_member, function (iRow) {
                return iRow.SO_CHANG_BAY_XUAT;
            });
            data.Data_HUY = $.map(data_all_member, function (iRow) {
                return iRow.SO_CHANG_BAY_HUY;
            });
            data.Data_TEN = $.map(data_all_member, function (iRow) {
                return iRow.NK_NM;
            });

            bindDataChartBookingBetweenMembers(data);
        }

        var bindDataChartBookingBetweenMembers = function (data) {
            $('#bao_cao_tong').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Thống kê giữa các nhân viên từ ' + data.from_date + ' đến ' + data.to_date
                },
                xAxis: {
                    categories: data.Data_TEN,
                    title: {
                        text: 'Nhân viên'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Số chặng bay'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + Math.round(this.y * 100 / this.point.stackTotal) + '% (' + this.y + ' chặng bay)<br/>' +
                            'Tổng: ' + this.point.stackTotal + ' chặng bay';
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            //style: {

                            //    textShadow: '0 0 3px black', style cho chu trong cot, xoa di se thay khac biet
                            // },
                            formatter: function () {
                                return '<span style="color: white">' + Math.round(this.y * 100 / this.point.stackTotal) + '% (' + this.y + ' chặng bay)</span><br/>'

                            }
                        }
                    }
                },
                series: [{
                    name: 'Chặng bay hủy',
                    color: '#f45b5b',
                    data: data.Data_HUY
                }, {
                    name: 'Chặng bay xuất',
                    color: 'green',
                    data: data.Data_XUAT
                }]
            });
        }


        var initControls = function () {

            setBasicLineDark();

            initTitleChart();

            $('#date_start, #date_end').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            $('#date_start, #date_end').val($.format.date(current_date, 'dd/MM/yyyy'));
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