(function () {

    VA.views.report.ReportTicketingIntl = function () {

        var _configs = {
        }
        var current_date = new Date();

     
        //var getDataReportTicketing = function (date, mbId) {

        //    jwm.Alert.ShowAjaxProcessing(_configs.form_id);

        //    jQuery.ajax({
        //        url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
        //        dataType: "json",
        //        type: 'POST',
        //        data: {

        //            PACKAGE_NAME: 'PK_BD_REPORT_TICKETING_INTL',

        //            OBJECT_NAME: 'GET_DATA_THONG_KE_001',

        //            P_DATE: date,

        //            P_MB_ID: mbId

        //        },
        //        success: function (resp) {

        //            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                   
        //            if (resp.TypeMsg > 0) {

        //                $('#report_ticketing').html("");

        //                jQuery('#tmp_report_ticketing').tmpl(resp.Data).appendTo('#report_ticketing');
                        
        //            }
        //        },

        //        error: function (http, message, exc) {
        //            jwm.Alert.HideAjaxProcessing(_configs.form_id);
        //            jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
        //        }
                
        //    });
        //}


        var getDataReportTicketingTheoNgay = function (from_day, to_day, mbId) {

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: {

                    PACKAGE_NAME: 'PK_BD_REPORT_TICKETING_INTL',

                    OBJECT_NAME: 'GET_DATA_THONG_KE_NGAY_001',

                    P_FROM_DAY: from_day,

                    P_TO_DAY: to_day,

                    P_MB_ID: mbId

                },
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    if (resp.TypeMsg > 0) {

                        prepareData(resp);


                        $('#report_ticketing').html("");

                        jQuery('#tmp_report_ticketing').tmpl(resp.Data).appendTo('#report_ticketing');

                    }
                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }

            });
        }


        var prepareData = function (resp) {



            var TONG_TONG_MA = 0;
            var TONG_MA_DAT_KH_CONG_TY = 0;
            var TONG_MA_HUY_KH_CONG_TY = 0;
            var TONG_MA_XUAT_KH_CONG_TY = 0;
            var TONG_MA_DAT_KH_CU = 0;
            var TONG_MA_HUY_KH_CU = 0;
            var TONG_MA_XUAT_KH_CU = 0;
            var TONG_MA_DAT_KH_MOI = 0;
            var TONG_MA_HUY_KH_MOI = 0;
            var TONG_MA_XUAT_KH_MOI = 0;


            for (var i = 0; i < resp.Data.CURSOR_DATA.length; i++) {

                var item = resp.Data.CURSOR_DATA[i];
                //tong ma
                TONG_TONG_MA = TONG_TONG_MA + item.TONG_MA;

                // tong ma dat khach hang cty
                TONG_MA_DAT_KH_CONG_TY = TONG_MA_DAT_KH_CONG_TY + item.MA_DAT_KH_CONG_TY;
                //tong ma huy khach hang cong ty
                TONG_MA_HUY_KH_CONG_TY = TONG_MA_HUY_KH_CONG_TY + item.MA_HUY_KH_CONG_TY;
                //tong ma xuat khach hang cty
                TONG_MA_XUAT_KH_CONG_TY = TONG_MA_XUAT_KH_CONG_TY + item.MA_XUAT_KH_CONG_TY;
                // tong ma dat khach hang cu
                TONG_MA_DAT_KH_CU = TONG_MA_DAT_KH_CU + item.MA_DAT_KH_CU;
                // tong ma huy khach hang cu
                TONG_MA_HUY_KH_CU = TONG_MA_HUY_KH_CU + item.MA_HUY_KH_CU;
                // tong ma xuat khach hang cu
                TONG_MA_XUAT_KH_CU = TONG_MA_XUAT_KH_CU + item.MA_XUAT_KH_CU;
                // tong ma dat khach hang moi
                TONG_MA_DAT_KH_MOI = TONG_MA_DAT_KH_MOI + item.MA_DAT_KH_MOI;
                // tong ma huy khach hang moi
                TONG_MA_HUY_KH_MOI = TONG_MA_HUY_KH_MOI + item.MA_HUY_KH_MOI;
                // tong ma xuat khach hang moi
                TONG_MA_XUAT_KH_MOI = TONG_MA_XUAT_KH_MOI + item.MA_XUAT_KH_MOI;

            }

            resp.Data.TONG_TONG_MA = TONG_TONG_MA;
            resp.Data.TONG_MA_DAT_KH_CONG_TY = TONG_MA_DAT_KH_CONG_TY;
            resp.Data.TONG_MA_HUY_KH_CONG_TY = TONG_MA_HUY_KH_CONG_TY;
            resp.Data.TONG_MA_XUAT_KH_CONG_TY = TONG_MA_XUAT_KH_CONG_TY;
            resp.Data.TONG_MA_DAT_KH_CU = TONG_MA_DAT_KH_CU;
            resp.Data.TONG_MA_HUY_KH_CU = TONG_MA_HUY_KH_CU;
            resp.Data.TONG_MA_XUAT_KH_CU = TONG_MA_XUAT_KH_CU;
            resp.Data.TONG_MA_DAT_KH_MOI = TONG_MA_DAT_KH_MOI;
            resp.Data.TONG_MA_HUY_KH_MOI = TONG_MA_HUY_KH_MOI;
            resp.Data.TONG_MA_XUAT_KH_MOI = TONG_MA_XUAT_KH_MOI;

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

                getDataReportTicketingTheoNgay(from_day, to_day, mbId);

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
