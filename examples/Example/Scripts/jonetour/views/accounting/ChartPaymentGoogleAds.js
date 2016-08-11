(function () {

    VA.views.accounting.ChartPaymentGoogleAds = function () {

        var _configs = {
        }

        //--------------------------------------------------
        //to do
        var form_input_from_date = null;
        var form_input_to_date = null;

        var initTitleChart = function () {
            $('.content-box').css('display', 'none');
            $('.choose-box').css('display', 'none');
            $('#chart_google_adwords').css('display', 'block');
            $('.title-charts').text('Thống kê thanh toán Google Adwords');
        }


        var getFormInput = function () {

            form_input_from_date = $('#from_date_google_adwords').val();

            form_input_to_date = $('#to_date_google_adwords').val();


        }


        var prepareDataChart = function (resp) {

            var data_chart = {};

            data_chart.DATA_SUM_MONEY = [];
            data_chart.DATA_ON_DATE = [];

            for (var i = 0; i < resp.Data.CURSOR_DATA.length; i++) {

                var item = resp.Data.CURSOR_DATA[i];

                data_chart.DATA_SUM_MONEY.push(item.SUM_MONEY);

                data_chart.DATA_ON_DATE.push(item.ON_DATE);

            }

            return data_chart;

        }

        var renderChart = function (dataChart) {

            $('#MarketingChartGoogleAds').highcharts({

                title: {
                    text: 'Thống kê thanh toán Google Adwords từ ' + form_input_from_date + ' đến ' + form_input_to_date
                },

                xAxis: {

                    title: {
                        text: 'Từ ' + form_input_from_date + ' đến ' + form_input_to_date
                    },
                    categories: dataChart.DATA_ON_DATE
                },

                yAxis: {
                    title: {
                        text: 'Số tiền thanh toán'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },

                tooltip: {
                    formatter: function () {
                        labels = '';

                        labels = '<b>' + Highcharts.numberFormat(this.y, 0) + '</b><br/>';

                        return labels;

                    }
                },

                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [
                    {
                        name: 'Số tiền thanh toán',
                        color: '#90ee7e',
                        data: dataChart.DATA_SUM_MONEY
                    }
                ]
            });

        }


        var getDataChart = function (fromDate, toDate) {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/accounting/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_ACC_GOOGLE_ADS',

                    OBJECT_NAME: 'GET_DATA_PAYMENT_THONG_KE',

                    P_FROM_DATE: fromDate,

                    P_TO_DATE: toDate
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {

                        var data_chart = prepareDataChart(resp);

                        renderChart(data_chart);

                    }
                },
                error: function (http, message, exc) {
                }
            });
        }

        var initFirstRun = function () {

            var current_date = new Date();
            $('#from_date_google_adwords, #to_date_google_adwords').val($.format.date(current_date, 'dd/MM/yyyy'));

            getFormInput();

            getDataChart(form_input_from_date, form_input_to_date);

        }

        //--------------------------------------------------

        var initControls = function () {


            initTitleChart();

            $('#from_date_google_adwords, #to_date_google_adwords').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });




            $('#btn_view_google_adwords_id').unbind('click');
            $('#btn_view_google_adwords_id').click(function () {

                getFormInput();

                getDataChart(form_input_from_date, form_input_to_date);

            });


            if ($('#MarketingChartGoogleAds').attr('data-highcharts-chart') == undefined) {

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