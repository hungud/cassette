(function () {

    VA.views.report.ReportTicketingDaily = function () {

        var _configs = {
        }

        var setMask = function () {

            //http://www.decorplanit.com/plugin/    
            $('.money-mask').autoNumeric('init', { aSign: ' VND', pSign: 's' });

            $('.number-mask').autoNumeric('init');

            $('.int-mask').autoNumeric('init', { mDec: 0 });


            $("input[type=submit], input[type=button], input[type=reset], button").button();

            $('.date-mask').mask('00/00/0000');

        }

        var grid_report_ticket_daily_configs = null;

        var grid_report_ticket_daily_paged = null;

        var initGridReportTicketDaily = function () {

            grid_report_ticket_daily_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            conditions.REPORT_TICKETING_DAILY = {};

            conditions.REPORT_TICKETING_DAILY.MB_ID = $('#MB_ID').val();

            grid_report_ticket_daily_configs.data = {
                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                object_name: 'GET_LIST_REPORT_TIC_DAILY',
                p_conditions: JSON.stringify(conditions)
            };

        }

      
       
        var initControlDateTime = function () {

            $('#ISSUE_TICKET_DATE').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            //$('#DEPARTURE_DATE').datetimepicker({
            //    format: 'd/m/Y',
            //    timepicker: false,
            //    mask: true,
            //    lang: 'vn'

            //});

            $('#DEPARTURE_DATE').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });

            $('#ARRIVAL_DATE').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });

            $('#FROM_DATE_SEARCH').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });


            $('#TO_DATE_SEARCH').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                //defaultDate: 5,
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });
          
        }
        var renderGridReportTicketDaily = function (conditions) {

            if (conditions) {
                grid_report_ticket_daily_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_report_ticket_daily_paged = new SS.core.GridPaged();

            grid_report_ticket_daily_paged.init(grid_report_ticket_daily_configs);
        }


        var initControls = function () {

            initGridReportTicketDaily();

            renderGridReportTicketDaily();

            initInsertUpdateForm();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddUpdate').val('Cập nhật');
                   jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });


            setMask();

            initControlDateTime();

            initFilterForm();

        }

      
        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {
                return execFilterForm();
            });

            $('#filterForm').enter(function () {
                return execFilterForm();
            });

           
        }

        var execFilterForm = function (exportFile) {

            var conditions = {
            };


            var from_date = $('#FROM_DATE_SEARCH').val();

            var to_date = $('#TO_DATE_SEARCH').val();

            var amount = $('#AMOUNT_SEARCH', '#filterForm').autoNumeric('get');

            var amount_net = $('#AMOUNT_NET_SEARCH', '#filterForm').autoNumeric('get');

            var ticket_number = $('#TICKET_NUMBER_SEARCH', '#filterForm').val();


            conditions.REPORT_TICKETING_DAILY = {};

            conditions.REPORT_TICKETING_DAILY.MB_ID = $('#MB_ID').val();

            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.REPORT_TICKETING_DAILY.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.REPORT_TICKETING_DAILY.TO_DATE = to_date;
            }

            if (isEmpty(amount) == false) {
                amount = amount.trim();

                conditions.REPORT_TICKETING_DAILY.AMOUNT = amount;
            }

            if (isEmpty(amount_net) == false) {
                amount_net = amount_net.trim();

                conditions.REPORT_TICKETING_DAILY.AMOUNT_NET = amount_net;
            }

            if (isEmpty(ticket_number) == false) {
                ticket_number = ticket_number.trim();

                conditions.REPORT_TICKETING_DAILY.TICKET_NUMBER = ticket_number;
            }
          
            grid_report_ticket_daily_configs.data = {
                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                object_name: 'GET_LIST_REPORT_TIC_DAILY',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_report_ticket_daily_configs.page_size
            };

            grid_report_ticket_daily_paged.init(grid_report_ticket_daily_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_REPORT_TICKETING_DAILY';

            data_post.object_name = 'INSERT_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        //$("#insertUpdate").reset();
                        $('#insertUpdate').trigger("reset");

                        grid_report_ticket_daily_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_REPORT_TICKETING_DAILY';

            data_post.object_name = 'UPDATE_ROW';

            data_post.MB_ID = $('#MB_ID').val();

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                       
                        grid_report_ticket_daily_paged.renderGrid();

                        viewReportTicDailyLog(data_post.P_SQ_ID);

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewReportTicDailyLog(sq_id);
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
              
                return false;
            });
        }

        var viewReportTicDailyLog = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/Report/ViewReportTicketingDailyLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewReportTicketingDailyLog').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
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
