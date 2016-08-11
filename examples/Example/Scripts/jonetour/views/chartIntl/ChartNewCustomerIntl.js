(function () {

    VA.views.chartIntl.ChartNewCustomerIntl = function () {

        var _configs = {
        }


        var data_chart_fly_Booking_Info = {
        };

        var data_chart_fly_Booking_Info_By_Year = {
        };

        var data_chart_fly_Booking_Info_By_Month = {
        };

        var flag_type_of_fight_booking_info = 1;//cờ xác định lấy theo gì, 0 là lấy theo năm, 1 là theo tháng, 2 là từ ngày đến ngày

        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('#chart-new-customer-intl').css('display', 'block');
            $('.title-charts').text('Thống kê số lượng khách hàng đặt mới quốc tế');
            initChartFlightBookingStatistic();
        }


        // buoc 1: lay du lieu tu package

        var getDataFlyBookingInfo = function (chartName, fromDate, toDate, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_002_NGAY',

                    P_FROM_DAY: fromDate,

                    P_TO_DAY: toDate



                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        var getDataFlyBookingInfoByMonth = function (chartName, date, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_002_THANG',

                    P_DATE: date

                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Month[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }



        var getDataFlyBookingInfoByYear = function (chartName, date, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_002_NAM',

                    P_DATE: date

                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Year[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        //du lieu khach hang moi da xuat theo ngay
        var getDataFlyBookingInfoDaXuat = function (chartName, fromDate, toDate, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_003_NGAY',

                    P_FROM_DAY: fromDate,

                    P_TO_DAY: toDate



                },
                success: function (resp) {
                    //  console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        //du lieu khach hang moi da xuat theo thang
        var getDataFlyBookingInfoByMonthDaXuat = function (chartName, date, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {


                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_003_THANG',

                    P_DATE: date

                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Month[chartName] = resp.Data.CURSOR_DATA;

                        if (callBack) {
                            callBack();
                        }
                    }
                },

                error: function (http, message, exc) {
                }
            });
        }

        //du lieu khach hang moi da xuat theo nam
        var getDataFlyBookingInfoByYearDaXuat = function (chartName, date, callBack) {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_REPORT_BOOKING_INFO_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_003_NAM',

                    P_DATE: date

                },
                success: function (resp) {
                    // console.log(resp);

                    if (resp.TypeMsg > 0) {
                        data_chart_fly_Booking_Info_By_Year[chartName] = resp.Data.CURSOR_DATA;

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
            data.DataChart_KH_DAT_MOI = $.map(data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'], function (iRow) {
                //console.log(iRow);
                return iRow.COUNT_BY_DAY;//tra du lieu vao key cua doi tuong data = {'DataChart_DAT': '......'}
            });


            //khach hang dat moi da xuat
            data.DataChart_KH_DAT_MOI_DA_XUAT = $.map(data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI_DA_XUAT'], function (iRow) {

                return iRow.COUNT_BY_DAY;
            });

            //khach hnag dat moi da huy
            //khoi tao mang KH dat moi da huy
            data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI_DA_HUY'] = [];
            data.DataChart_KH_DAT_MOI_DA_HUY = [];
            //tao vong lap de lay cac phan tu trong mang du lieu KH dat moi
            for (var idx = 0; idx < data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                var item_huy = {
                    COUNT_BY_DAY: item_dat.COUNT_BY_DAY - item_xuat.COUNT_BY_DAY,
                    DAY_COUNT: item_dat.DAY_COUNT,
                    DAY_VAL: item_dat.DAY_VAL
                };

                data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI_DA_HUY'].push(item_huy);
                data.DataChart_KH_DAT_MOI_DA_HUY.push(item_huy.COUNT_BY_DAY);

            }


            //du lieu bieu do %

            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];

            //tao vong lap de lay cac phan tu trong mang du lieu
            for (var idx = 0; idx < data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                if (item_dat.COUNT_BY_DAY == 0) {
                    var item_xuat_percent = {
                        COUNT_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_huy_percent = {
                        COUNT_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };


                }
                else {
                    item_xuat_percent = {
                        COUNT_BY_DAY: Math.round((item_xuat.COUNT_BY_DAY / item_dat.COUNT_BY_DAY) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_huy_percent = {
                        COUNT_BY_DAY: Math.round(100 - item_xuat_percent.COUNT_BY_DAY),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.COUNT_BY_DAY);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.COUNT_BY_DAY);

            }

            var from_day = $('#from_day_chart_month', '#chart-new-customer-intl').val();

            var to_day = $('#to_day_chart_month', '#chart-new-customer-intl').val();

            data.from_day = from_day;

            data.to_day = to_day;

            data.Categories = $.map(data_chart_fly_Booking_Info['DataChart_KH_DAT_MOI'], function (iRow) {
                return iRow.DAY_COUNT;
            });

            //   console.log(data);

            bindDataChartFlightBookingStatisticByDayToDay(data);

            bindDataChartFlightBookingStatisticByDayToDayDaXuat(data);

            //tong khach hang dat moi
            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI.length ; i++) {

                var count_by_d = data.DataChart_KH_DAT_MOI[i];
                data.Sum_DAT += count_by_d;

            }
            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_put', '#chart-new-customer-intl').html(sum_dat_ph);

            //------------------Tong xuat moi-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_XUAT.length ; i++) {

                var count_by_x = data.DataChart_KH_DAT_MOI_DA_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }


            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_export').html(sum_xuat_ph);

            $('#id_pt_exp').html(count_ptx_tmp);

            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_HUY.length ; i++) {

                var count_by_h = data.DataChart_KH_DAT_MOI_DA_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel').html(sum_huy_ph);

            $('#id_pt_cancel').html(count_pth_tmp);


        }

        var prepareDataFlyBookingInfoByYear = function () {

            var date = $('#date_chart_year_flight_booking_value', '#chart-new-customer-intl').val();

            var data = {
            };

            data.DataChart_KH_DAT_MOI = $.map(data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'], function (iRow) {
                return iRow.COUNT_BY_MONTH;
            });

            data.DataChart_KH_DAT_MOI_DA_XUAT = $.map(data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI_DA_XUAT'], function (iRow) {

                return iRow.COUNT_BY_MONTH;//tra du lieu vao key cua doi tuong data = {'DataChart_DAT': '......'}
            });


            //khach hnag dat moi da huy
            //khoi tao mang KH dat moi da huy
            data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI_DA_HUY'] = [];
            data.DataChart_KH_DAT_MOI_DA_HUY = [];
            //tao vong lap de lay cac phan tu trong mang du lieu KH dat moi
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                var item_huy = {
                    COUNT_BY_MONTH: item_dat.COUNT_BY_MONTH - item_xuat.COUNT_BY_MONTH,
                    MONTH_COUNT: item_dat.MONTH_COUNT,
                    MONTH_VAL: item_dat.MONTH_VAL
                };

                data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI_DA_HUY'].push(item_huy);
                data.DataChart_KH_DAT_MOI_DA_HUY.push(item_huy.COUNT_BY_MONTH);

            }


            //du lieu bieu do %

            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];

            //tao vong lap de lay cac phan tu trong mang du lieu
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                if (item_dat.COUNT_BY_MONTH == 0) {
                    var item_xuat_percent = {
                        COUNT_BY_MONTH: 0,
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    var item_huy_percent = {
                        COUNT_BY_MONTH: 0,
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };


                }
                else {
                    item_xuat_percent = {
                        COUNT_BY_MONTH: Math.round((item_xuat.COUNT_BY_MONTH / item_dat.COUNT_BY_MONTH) * 100),
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                    item_huy_percent = {
                        COUNT_BY_MONTH: Math.round(100 - item_xuat_percent.COUNT_BY_MONTH),
                        MONTH_COUNT: item_dat.MONTH_COUNT,
                        MONTH_VAL: item_dat.MONTH_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.COUNT_BY_MONTH);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.COUNT_BY_MONTH);

            }



            data.Categories = $.map(data_chart_fly_Booking_Info_By_Year['DataChart_KH_DAT_MOI'], function (iRow) {
                return iRow.MONTH_COUNT;
            });

            data.Year = date;

            bindDataChartFlightBookingStatisticByYear(data);

            bindDataChartFlightBookingStatisticByYearDaXuat(data);


            //tong khach hang dat moi
            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI.length; i++) {

                var count_by_d = data.DataChart_KH_DAT_MOI[i];
                data.Sum_DAT += count_by_d;

            }

            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_put', '#chart-new-customer-intl').html(sum_dat_ph);

            //------------------Tong xuat moi-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_XUAT.length ; i++) {

                var count_by_x = data.DataChart_KH_DAT_MOI_DA_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }


            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_export').html(sum_xuat_ph);

            $('#id_pt_exp').html(count_ptx_tmp);

            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_HUY.length ; i++) {

                var count_by_h = data.DataChart_KH_DAT_MOI_DA_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel').html(sum_huy_ph);

            $('#id_pt_cancel').html(count_pth_tmp);




        }

        var prepareDataFlyBookingInfoByMonth = function () {


            var data = {
            };
            //data la doi tuong ban dau
            data.DataChart_KH_DAT_MOI = $.map(data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'], function (iRow) {
                // console.log(iRow);
                return iRow.COUNT_BY_DAY;//tra du lieu vao key cua doi tuong data = {'DataChart_DAT': '......'}
            });

            //khach hang dat moi  da xuat theo thang
            data.DataChart_KH_DAT_MOI_DA_XUAT = $.map(data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI_DA_XUAT'], function (iRow) {

                return iRow.COUNT_BY_DAY;
            });

            //khach hnag dat moi da huy
            //khoi tao mang KH dat moi da huy
            data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI_DA_HUY'] = [];
            data.DataChart_KH_DAT_MOI_DA_HUY = [];
            //tao vong lap de lay cac phan tu trong mang du lieu KH dat moi
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                var item_huy = {
                    COUNT_BY_DAY: item_dat.COUNT_BY_DAY - item_xuat.COUNT_BY_DAY,
                    DAY_COUNT: item_dat.DAY_COUNT,
                    DAY_VAL: item_dat.DAY_VAL
                };

                data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI_DA_HUY'].push(item_huy);
                data.DataChart_KH_DAT_MOI_DA_HUY.push(item_huy.COUNT_BY_DAY);

            }

            //du lieu bieu do %

            data.DataChart_XUAT_PERCENT = [];
            data.DataChart_HUY_PERCENT = [];

            //tao vong lap de lay cac phan tu trong mang du lieu
            for (var idx = 0; idx < data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'].length; idx++) {
                //lay ra object theo idx
                var item_dat = data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'][idx];

                var item_xuat = data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI_DA_XUAT'][idx];

                if (item_dat.COUNT_BY_DAY == 0) {
                    var item_xuat_percent = {
                        COUNT_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    var item_huy_percent = {
                        COUNT_BY_DAY: 0,
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };


                }
                else {
                    item_xuat_percent = {
                        COUNT_BY_DAY: Math.round((item_xuat.COUNT_BY_DAY / item_dat.COUNT_BY_DAY) * 100),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                    item_huy_percent = {
                        COUNT_BY_DAY: Math.round(100 - item_xuat_percent.COUNT_BY_DAY),
                        DAY_COUNT: item_dat.DAY_COUNT,
                        DAY_VAL: item_dat.DAY_VAL
                    };

                }


                data.DataChart_XUAT_PERCENT.push(item_xuat_percent.COUNT_BY_DAY);
                data.DataChart_HUY_PERCENT.push(item_huy_percent.COUNT_BY_DAY);

            }


            var date = $('#date_chart_month_flight_booking_value', '#chart-new-customer-intl').val();


            data.Categories = $.map(data_chart_fly_Booking_Info_By_Month['DataChart_KH_DAT_MOI'], function (iRow) {
                return iRow.DAY_COUNT;
            });

            data.Month = date;

            bindDataChartFlightBookingStatisticByMonth(data);

            bindDataChartFlightBookingStatisticByMonthDaXuat(data);

            //tong dat moi
            data.Sum_DAT = 0;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI.length; i++) {

                var count_by_d = data.DataChart_KH_DAT_MOI[i];
                data.Sum_DAT += count_by_d;

            }

            var sum_dat_ph = Highcharts.numberFormat(data.Sum_DAT, 0);

            $('#id_sum_put', '#chart-new-customer-intl').html(sum_dat_ph);



            //------------------Tong xuat moi-------------------------

            data.Sum_XUAT = 0;
            var count_ptx;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_XUAT.length ; i++) {

                var count_by_x = data.DataChart_KH_DAT_MOI_DA_XUAT[i];

                data.Sum_XUAT += count_by_x;
            }


            count_ptx = (data.Sum_XUAT / data.Sum_DAT) * 100;

            var count_ptx_tmp = Highcharts.numberFormat(count_ptx, 2)

            var sum_xuat_ph = Highcharts.numberFormat(data.Sum_XUAT, 0);

            $('#id_sum_export').html(sum_xuat_ph);

            $('#id_pt_exp').html(count_ptx_tmp);
            //------------------Tong huy-------------------------

            data.Sum_HUY = 0;
            var count_pth;
            for (var i = 0; i < data.DataChart_KH_DAT_MOI_DA_HUY.length ; i++) {

                var count_by_h = data.DataChart_KH_DAT_MOI_DA_HUY[i];

                data.Sum_HUY += count_by_h;
            }

            count_pth = (data.Sum_HUY / data.Sum_DAT) * 100;

            var count_pth_tmp = Highcharts.numberFormat(count_pth, 2)

            var sum_huy_ph = Highcharts.numberFormat(data.Sum_HUY, 0);

            $('#id_sum_cancel').html(sum_huy_ph);

            $('#id_pt_cancel').html(count_pth_tmp);




        }



        var getDataChartFlyBookingInfo = function (from_day_chart_month, to_day_chart_month) {

            //lay du lieu dat ve theo ngay

            getDataFlyBookingInfo('DataChart_KH_DAT_MOI', from_day_chart_month, to_day_chart_month, function () {
                getDataFlyBookingInfoDaXuat('DataChart_KH_DAT_MOI_DA_XUAT', from_day_chart_month, to_day_chart_month, function () {
                    setTimeout(function () { prepareDataFlyBookingInfo(); }, 1000);
                });
            });
        }


        var getDataChartFlyBookingInfoByMonth = function (date) {

            //lay du lieu dat ve theo thang

            getDataFlyBookingInfoByMonth('DataChart_KH_DAT_MOI', date, function () {

                getDataFlyBookingInfoByMonthDaXuat('DataChart_KH_DAT_MOI_DA_XUAT', date, function () {
                    setTimeout(function () { prepareDataFlyBookingInfoByMonth(); }, 1000);
                });

            });
        }


        var getDataChartFlyBookingInfoByYear = function (date) {


            //lay du lieu dat ve theo nam
            getDataFlyBookingInfoByYear('DataChart_KH_DAT_MOI', date, function () {
                getDataFlyBookingInfoByYearDaXuat('DataChart_KH_DAT_MOI_DA_XUAT', date, function () {
                    setTimeout(function () { prepareDataFlyBookingInfoByYear(); }, 1000);
                });
            });

        }



        var bindDataChartFlightBookingStatisticByDayToDay = function (data) {
            $('#bao_cao_theo_ma_dich_vu', '#chart-new-customer-intl').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê khách hàng đặt mới từ ' + data.from_day + ' đến ' + data.to_day,//title bieu do
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

                        if (this.series.name == 'KH hủy mới') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách hủy mới ';
                        }
                        if (this.series.name == 'KH xuất mới') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách xuất mới';
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
                    name: 'KH hủy mới',
                    color: '#c0504d',//set mau cho line
                    data: data.DataChart_HUY_PERCENT

                }, {
                    name: 'KH xuất mới',
                    color: '#9bbb59',//set mau cho line
                    data: data.DataChart_XUAT_PERCENT
                }

                ]
            });
        }



        var bindDataChartFlightBookingStatisticByYear = function (data) {

            $('#bao_cao_theo_ma_dich_vu', '#chart-new-customer-intl').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê khách hàng đặt mới trong năm ' + data.Year,//title bieu do
                    x: -20 //center
                },
                subtitle: {
                    text: 'Vietair.tv',
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

                        if (this.series.name == 'KH hủy mới') {
                            labels = 'Tháng <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách hủy mới ';
                        }
                        if (this.series.name == 'KH xuất mới') {
                            labels = 'Tháng <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách xuất mới';
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
                series:[{
                    name: 'KH hủy mới',
                    color: '#c0504d',//set mau cho line
                    data: data.DataChart_HUY_PERCENT

                }, {
                    name: 'KH xuất mới',
                    color: '#9bbb59',//set mau cho line
                    data: data.DataChart_XUAT_PERCENT
                }

                ]
            });
        }



        var bindDataChartFlightBookingStatisticByMonth = function (data) {

            $('#bao_cao_theo_ma_dich_vu', '#chart-new-customer-intl').highcharts({
                title: {
                    text: 'Biểu đồ % thống kê khách hàng đặt mới trong tháng ' + data.Month,//title bieu do
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

                        if (this.series.name == 'KH hủy mới') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách hủy mới ';
                        }
                        if (this.series.name == 'KH xuất mới') {
                            labels = 'Ngày <b>' + this.x + '</b> có <b>' + this.y + '</b> % khách xuất mới';
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
                series:[{
                    name: 'KH hủy mới',
                    color: '#c0504d',//set mau cho line
                    data: data.DataChart_HUY_PERCENT

                }, {
                    name: 'KH xuất mới',
                    color: '#9bbb59',//set mau cho line
                    data: data.DataChart_XUAT_PERCENT
                }

                ]
            });
        }

        var bindDataChartFlightBookingStatisticByDayToDayDaXuat = function (data) {
            $('#bao_cao_theo_ma_dich_vu_da_xuat', '#chart-new-customer-intl').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê khách hàng đặt mới từ ' + data.from_day + ' đến ' + data.to_day,//title bieu do

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
                        text: 'Số lượng khách hàng đặt mới'
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
                    pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>KH đặt mới:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'KH hủy mới',
                    color: '#f45b5b',//set mau cho line
                    data: data.DataChart_KH_DAT_MOI_DA_HUY

                }, {
                    name: 'KH xuất mới',
                    color: '#90ee7e',
                    data: data.DataChart_KH_DAT_MOI_DA_XUAT

                }
                ]
            });
        }

        var bindDataChartFlightBookingStatisticByMonthDaXuat = function (data) {
            $('#bao_cao_theo_ma_dich_vu_da_xuat', '#chart-new-customer-intl').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê khách hàng đặt mới trong tháng ' + data.Month,//title bieu do
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
                        text: 'Số lượng khách hàng đặt mới'
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
                    pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>KH đặt mới:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'KH hủy mới',
                    color: '#f45b5b',//set mau cho line
                    data: data.DataChart_KH_DAT_MOI_DA_HUY

                }, {
                    name: 'KH xuất mới',
                    color: '#90ee7e',
                    data: data.DataChart_KH_DAT_MOI_DA_XUAT

                }
                ]
            });
        }

        var bindDataChartFlightBookingStatisticByYearDaXuat = function (data) {
            $('#bao_cao_theo_ma_dich_vu_da_xuat', '#chart-new-customer-intl').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ cột thống kê khách hàng đặt mới trong năm ' + data.Year,//title bieu do

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
                        text: 'Số lượng khách hàng đặt mới'
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
                   pointFormat: '{series.name}: {point.y} ({point.percentage:.0f}%)<br/>KH đặt mới:{point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'KH hủy mới',
                    color: '#f45b5b',//set mau cho line
                    data: data.DataChart_KH_DAT_MOI_DA_HUY

                }, {
                    name: 'KH xuất mới',
                    color: '#90ee7e',
                    data: data.DataChart_KH_DAT_MOI_DA_XUAT

                }
                ]
            });
        }


        var current_date = new Date();

        var init_data_chart_flight_booking_statistic = false;

        var initChartChoice = function () {
            $('#TYPE_CHART').val(8);
        }

        var initControls = function () {
            initChartChoice();

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

                        $input_year_statistic.val(arr_date[0]);//Lay val cua nam 
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

            $('#from_day_chart_month, #to_day_chart_month').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });
        }

        var initChartFlightBookingStatistic = function () {

            $('#btn_view_chart_year_flight_booking', '#chart-new-customer-intl').unbind('click')
            $('#btn_view_chart_year_flight_booking', '#chart-new-customer-intl').click(function () {//khi click chon xem bieu do theo nam
                flag_type_of_fight_booking_info = 0;
                var year = $('#date_chart_year_flight_booking_value', '#chart-new-customer-intl').val();
                getDataChartFlyBookingInfoByYear(year);//dau vao la nam

            });

            $('#btn_view_chart_month_flight_booking', '#chart-new-customer-intl').unbind('click')
            $('#btn_view_chart_month_flight_booking', '#chart-new-customer-intl').click(function () {//khi click chon xem bieu do theo thang
                flag_type_of_fight_booking_info = 1;
                var date = $('#date_chart_month_flight_booking_value', '#chart-new-customer-intl').val();
                getDataChartFlyBookingInfoByMonth(date);//dau vao la thang

            });


            $('#btn_view_chart_month_flight_booking_range', '#chart-new-customer-intl').unbind('click')
            $('#btn_view_chart_month_flight_booking_range', '#chart-new-customer-intl').click(function () {//khi click chon xem bieu do theo ngay den ngay
                flag_type_of_fight_booking_info = 2;
                var from_day_chart_month = $('#from_day_chart_month', '#chart-new-customer-intl').val();
                var to_day_chart_month = $('#to_day_chart_month', '#chart-new-customer-intl').val();
                getDataChartFlyBookingInfo(from_day_chart_month, to_day_chart_month);//dau vao la tu ngay den ngay
            });

            if (init_data_chart_flight_booking_statistic == false) {
                init_data_chart_flight_booking_statistic = true;
                //-----------------------------------------------------------------
                //init first cho chart
                //tao bieu do cho thang hien tai    

                var date = $.format.date(current_date, 'MM/yyyy');
                $('#date_chart_month_flight_booking_value', '#chart-new-customer-intl').val(date);
                //  var date = $('#date_chart_month_flight_booking_value', '#chart-new-customer-domestic').val();

                var year = $.format.date(current_date, 'yyyy');
                $('#date_chart_year_flight_booking_value', '#chart-new-customer-intl').val(year);//tạo giá trị năm ban đầu

                var from_date = $.format.date(current_date, 'dd/MM/yyyy');
                $('#from_day_chart_month', '#chart-new-customer-intl').val(from_date);//tạo giá trị ngay ban đầu

                var to_date = $.format.date(current_date, 'dd/MM/yyyy');
                $('#to_day_chart_month', '#chart-new-customer-intl').val(to_date);


                getDataChartFlyBookingInfoByMonth(date);
            }


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




        var init = function (options) {


            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }

        return ({

            "init": init

        });

    };

}());