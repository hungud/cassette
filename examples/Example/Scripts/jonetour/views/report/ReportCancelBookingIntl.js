(function () {

    VA.views.report.ReportCancelBookingIntl = function () {

        var _configs = {
        }
        var current_date = new Date();

     
      
        var getDataReportCancelBooking = function (from_day, to_day, mbId) {

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {

                    PACKAGE_NAME: 'PK_BD_REPORT_TICKETING_INTL',

                    OBJECT_NAME: 'GET_DATA_CANCEL_BOOKING',

                    P_FROM_DAY: from_day,

                    P_TO_DAY: to_day,

                    P_MB_ID: mbId

                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    if (resp.TypeMsg > 0) {

                         prepareData(resp);

                         $('#report_cancel_booking_intl').html("");

                         jQuery('#tmp_report_ticketing').tmpl(resp.Data).appendTo('#report_cancel_booking_intl');

                    }
                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }

            });
          
        }

        var prepareData = function (resp) {

            var TONG_HUY = 0;
            var TI_LE = 0;
           

            for (var i = 0; i < resp.Data.CURSOR_DATA.length; i++) {

                var item = resp.Data.CURSOR_DATA[i];

                //tong ma huy 
                TONG_HUY = TONG_HUY + item.COUNT;
                //ti le %
                TI_LE = TI_LE + item.TI_LE;
            }

            resp.Data.TONG_HUY = TONG_HUY;
            resp.Data.TI_LE = Math.round(TI_LE);

        }


        var initControls = function () {

            initOptionFilterForm();

            $('#FROM_DAY', '#filterForm').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            $('#TO_DAY', '#filterForm').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });
        
            $('#btnSearch', '#filterForm').click(function () {

                var from_day = $('#FROM_DAY').val();

                var to_day = $('#TO_DAY').val();

                var mbId = $('#MB_ID').val();

                getDataReportCancelBooking(from_day, to_day, mbId);

                return false;

            });

            var from_date = $.format.date(current_date, 'dd/MM/yyyy');
            $('#FROM_DAY').val(from_date);

            var to_date = $.format.date(current_date, 'dd/MM/yyyy');
            $('#TO_DAY').val(to_date);
          
        }


        var initOptionFilterForm = function () {
           

            //nhan vien xu ly -> fill data
            var data_post = {};

            data_post.package_name = "PK_BD_REPORT_TICKETING_INTL";

            data_post.object_name = "GET_LIST_TICKETING";

            jwm.Alert.ShowAjaxProcessing('#filterForm');


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "jsonp",
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }
                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_MbId').data('data_source', data_list);

                    jQuery('#tmp_MbId').tmpl(data_list).appendTo('#MB_ID');
                },
                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
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
