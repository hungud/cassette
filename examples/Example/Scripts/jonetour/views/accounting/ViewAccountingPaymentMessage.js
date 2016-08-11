(function () {

    VA.views.accounting.ViewAccountingPaymentMessage = function () {

        var _configs = {
        }


        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {

            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url  + "/service03/accounting/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            }

            var conditions = {

            };

            _grid_paged_config.data = {
                package_name: 'PK_BD_ACC_PAY_MSG_TICKETING',
                object_name: 'GET_LIST_ACC_PAYMENT_MESSAGE',
                p_conditions: JSON.stringify(conditions)
            };


        }

      
        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var status = context.getQueryString('status');
            var conditions = {};

            conditions.ACCOUNTING_PAYMENT_MESSAGE = {};

           


            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.ACCOUNTING_PAYMENT_MESSAGE.STATUS = status;
            }

            _grid_paged_config.data = {
                package_name: 'PK_BD_ACC_PAY_MSG_TICKETING',
                object_name: 'GET_LIST_ACC_PAYMENT_MESSAGE',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };
            _grid_paged_config.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;
                window.location.hash = 'action_complete';

            };
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



            //initDate
            $('#FROM_DATE', '#filterForm').datepick({
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

            $('#TO_DATE', '#filterForm').datepick({
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

        var execFilterForm = function (exportFile) {

            var conditions = {
            };



            var sq_id = $('#SQ_ID', '#filterForm').val();
            var bank_name = $('#BANK_NAME', '#filterForm').val();
            var message = $('#MESSAGE', '#filterForm').val();
            var amount_min = $('#AMOUNT_MIN', '#filterForm').autoNumeric('get');
            var amount_max = $('#AMOUNT_MAX', '#filterForm').autoNumeric('get');
            //var insert_date = $('#IDATE', '#filterForm').val();
            var status = $('#STATUS', '#filterForm').val();
            var notes = $('#NOTES', '#filterForm').val();
            var nk_nm_submit = $('#NK_NM_SUBMIT', '#filterForm').val();

            var from_date = $('#FROM_DATE', '#filterForm').val();
            var to_date = $('#TO_DATE', '#filterForm').val();


            conditions.ACCOUNTING_PAYMENT_MESSAGE = {};

            conditions.ACTION_LOG = {};

            //--------------------------------------------------------
            //Check input
            if (isEmpty(sq_id) == false) {
                sq_id = sq_id.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.SQ_ID = sq_id;
            }

            if (isEmpty(bank_name) == false) {
                bank_name = bank_name.trim();
                conditions.ACCOUNTING_PAYMENT_MESSAGE.BANK_NAME = bank_name;
            }

            if (isEmpty(message) == false) {
                message = message.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.MESSAGE = message;
            }

            if (isEmpty(amount_min) == false) {
                amount_min = amount_min.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.AMOUNT_MIN = amount_min;
            }

            if (isEmpty(amount_max) == false) {
                amount_max = amount_max.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.AMOUNT_MAX = amount_max;
            }


            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.FROM_DATE = from_date;
            }


            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.TO_DATE = to_date;
            }

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.STATUS = status;
            } notes

            if (isEmpty(notes) == false) {
                notes = notes.trim();

                conditions.ACCOUNTING_PAYMENT_MESSAGE.NOTES = notes;
            }

            if (isEmpty(nk_nm_submit) == false) {
                nk_nm_submit = nk_nm_submit.trim();

                conditions.ACTION_LOG.MB_ID = nk_nm_submit;
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
                                package_name: 'PK_BD_ACC_PAY_MSG_TICKETING',
                                object_name: 'GET_LIST_ACC_PAYMENT_MESS_EXP',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(_grid_paged_config.ajax_url, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {

                _grid_paged_config.data = {
                    package_name: 'PK_BD_ACC_PAY_MSG_TICKETING',
                    object_name: 'GET_LIST_ACC_PAYMENT_MESSAGE',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: _grid_paged_config.page_size
                };

                renderGrid();

            }

            return false;
        }

        var updateStatus = function (status, dataForm) {

            var data_post = {
            };

            data_post.mb_id = jLoki.User.Status.GmId;

            data_post.sq_id = dataForm.sq_id;

            data_post.status = status;

            data_post.action_note = dataForm.reason;

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST_MB_ID";

            data_post.path_ajax_post = '/Accounting.asmx/UpdateAccountingPaymentMessageStatus';

            data_post.hub_group_id = _configs.messengerHubGroupIds.NOTICE_CHANGE_ACCOUNTING_PAYMENT_MESSAGE_STATUS;


            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        _grid_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var submitRow = function (sqId) {
            var data_form = {
            };
            data_form.sq_id = sqId;
            var status = 2;
            var config_popup = {
                file_url: '/html/popup/accounting/NoteOrder.html',
                args: {
                    Title: 'Ghi chú thông tin mã thanh toán ' + data_form.sq_id, BookingStatus: status, DataForm: data_form, FunctionCallBack: updateStatus
                }
            };

            var popup_file = new SS.core.helpers.PopupFileHtml();

            popup_file.init(config_popup);

            return;
        }

        var viewInfo = function (sqId) {

            var data_post = {
            };

            data_post.sq_id = sqId;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/Accounting/ViewAccountingPaymentMessageInfo",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#ViewAccountPaymentMessageInfo').show();


                    $('html, body').animate({
                        scrollTop: $("#ViewAccountPaymentMessageInfo").offset().top
                    }, 100);
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var initInsertUpdateForm = function () {
            jQuery(document).on('click', 'a[data-submit-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-submit-sq-id');
                submitRow(sq_id);
                return false;
            });
            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewInfo(sq_id);
                return false;
            });
        }


        var initAlertMessage = function (message, typeMsg, IsBookingStatusChanged) {

            var type_msg = 1;

            if (typeMsg) {
                type_msg = typeMsg;
            }

            var live_time = 30 * 60 * 1000;

            if (IsBookingStatusChanged == true) {

                live_time = 10 * 1000;

            }

            jwm.Alert.ShowMsg('#header', type_msg, message, 'VIETAIR-Thông báo', live_time);
        }




        var initMessengerHub = function () {

            jQuery(document).bind('NOTICE_CHANGE_ACCOUNTING_PAYMENT_MESSAGE_STATUS', function (event) {

                renderGrid();

                try {

                    initAlertMessage('Cập nhật thông tin mã thanh toán ' + event.clientMessage.Data.Data.sq_id, 1, true);

                }
                catch (e) {

                    initAlertMessage('Cập nhật thông tin mã thanh toán ', 1, true);

                }

            });

        }

        var initControls = function () {
            //console.log(44);
            initGrid();

            setGridConfigFromQueryString();

            renderGrid();

            initFilterForm();

            initInsertUpdateForm();

            initMessengerHub();
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