(function () {

    VA.views.report.ManageReportTicketingDaily = function () {

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

            grid_report_ticket_daily_configs.data = {
                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                object_name: 'GET_LIST_REPORT_TIC_DAILY',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initControlDateTime = function () {

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

            setMask();

            initInsertUpdateForm();

            initTicketing();

            initControlDateTime();

            initFilterForm();

            

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


        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

            $('#btnXuatExcel', '#filterForm').click(function () {

                return execFilterForm(true);

            });
        }

        var execFilterForm = function (exportFile) {

            var conditions = {
            };

            var from_date = $('#FROM_DATE_SEARCH').val();

            var to_date = $('#TO_DATE_SEARCH').val();

            var mb_id = $('#MB_ID_SEARCH').val();

            var amount = $('#AMOUNT_SEARCH', '#filterForm').autoNumeric('get');


            var amount_net = $('#AMOUNT_NET_SEARCH', '#filterForm').autoNumeric('get');

            var ticket_number = $('#TICKET_NUMBER_SEARCH', '#filterForm').val();

            conditions.REPORT_TICKETING_DAILY = {}; 

            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.REPORT_TICKETING_DAILY.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.REPORT_TICKETING_DAILY.TO_DATE = to_date;
            }

            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();

                conditions.REPORT_TICKETING_DAILY.MB_ID = mb_id;
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


            if (exportFile == true) {

                _configs.args = {
                };

                _configs.args.DataForm = {
                };

                var config_popup = {
                    file_url: '/html/popup/accounting/ExportFile.html',
                    args: {
                        Title: 'Nhập thông tin kết xuất file',
                        DataForm: _configs.args.DataForm,
                        FunctionCallBack: function () {


                            var data_post_download = {
                                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                                object_name: 'GET_LIST_REPORT_TIC_DAILY_EXP',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(grid_report_ticket_daily_configs.ajax_url, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {
                grid_report_ticket_daily_configs.data = {
                    package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                    object_name: 'GET_LIST_REPORT_TIC_DAILY',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: grid_report_ticket_daily_configs.page_size
                };

                renderGridReportTicketDaily();

            }

            return false;
        }

        function initTicketing() {

            var data_post = {};

            data_post.package_name = "PK_BD_REPORT_TICKETING_DAILY";

            data_post.object_name = "GET_LIST_TICKETING";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Ticketing').data('data_source', data_list);

                    jQuery('#MB_ID_SEARCH').html('<option value="">-- [ Chọn ticketing ] --</option>');

                    jQuery('#tmp_Ticketing').tmpl(data_list).appendTo('#MB_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
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
