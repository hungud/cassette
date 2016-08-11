(function () {

    VA.views.accounting.ManageAccountingPaymentMessage = function () {

        var _configs = {
        }

        var _grid_paged = null;
        
        var _grid_paged_config = null;

        var initGrid = function() {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListAccountingPaymentMessage',
                page_size: 10,
                row_start: 0,
                row_end: 10
            }
        }
      

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var initFilterForm = function () {

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            //initDate
            $('#IDATE', '#filterForm').datepick({
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

        var execFilterForm = function () {
            var sq_id = $('#SQ_ID', '#filterForm').val();
            var bank_name = $('#BANK_NAME', '#filterForm').val();
            var message = $('#MESSAGE', '#filterForm').val();
            var amount_min = $('#AMOUNT_MIN', '#filterForm').autoNumeric('get');
            var amount_max = $('#AMOUNT_MAX', '#filterForm').autoNumeric('get');
            var insert_date = $('#IDATE', '#filterForm').val();
            var status = $('#STATUS', '#filterForm').val();
            var notes = $('#NOTES', '#filterForm').val();
            var nk_nm_submit = $('#NK_NM_SUBMIT', '#filterForm').val();

            var conditions = new Array();

            //--------------------------------------------------------
            //Check input
            if (isEmpty(sq_id) == false) {
                sq_id = sq_id.trim();
                conditions.push('(a.sq_id = ' + sq_id + ')');
            }
            if (isEmpty(bank_name) == false) {
                bank_name = bank_name.trim();
                conditions.push("(regexp_like(a.bank_name,'" + bank_name + "','i'))");
            }
            if (isEmpty(message) == false) {
                message = message.trim();
                conditions.push("(regexp_like(a.message,'" + message + "','i'))");
            }
            if (isEmpty(amount_min) == false) {
                amount_min = amount_min.trim();
                conditions.push("( a.amount >= '" + amount_min + "') ");
            }
            if (isEmpty(amount_max) == false) {
                amount_max = amount_max.trim();
                conditions.push("( a.amount <= '" + amount_max + "') ");
            }
            if (isEmpty(insert_date) == false) {
                insert_date = insert_date.trim();
                conditions.push("(trunc(a.idate) = trunc(to_date('" + insert_date + "','dd/mm/yyyy')))");
            }
            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.push('(a.status = ' + status + ')');
            }
            if (isEmpty(notes) == false) {
                notes = notes.trim();
                conditions.push("(regexp_like(a.notes,'" + notes + "','i'))");
            }
            if (isEmpty(nk_nm_submit) == false) {
                nk_nm_submit = nk_nm_submit.trim();
                conditions.push("(a.sq_id in (select al.ref_sq_id from vietair.action_log al inner join vietair.twmb001 mb on al.mb_id = mb.mb_id where al.action_type_id = 1 and al.status = 2 and regexp_like(mb.nk_nm,'" + nk_nm_submit + "','i')))");
            }


            _grid_paged.init({
                data: {
                    op: 'searching',
                    conditions: JSON.stringify(conditions)
                },
                row_start: 0,
                row_end: _grid_paged_config.page_size
            });

            return false;

        }

        var insert = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST_MB_ID";

            data_post.path_ajax_post = '/Accounting.asmx/InsertAccountingPaymentMessage';

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
                        renderGrid();
                        resetForm();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var update = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.op = "HTTP_POST_MB_ID";

            data_post.path_ajax_post = '/Accounting.asmx/UpdateAccountingPaymentMessage';

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
                        resetForm();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var updateStatus = function (status, dataForm) {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

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
                        resetForm();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var deleteRow = function () {
            var data_form = {
            };
            data_form.sq_id = $('#SQ_ID', _configs.form_id).val();
            var status = -1;
            var config_popup = {
                file_url: '/html/popup/accounting/ConfirmCancelOrder.html',
                args: {
                    Title: 'Xóa khỏi hệ thống mã ' + data_form.sq_id, BookingStatus: status, DataForm: data_form, FunctionCallBack: updateStatus
                }
            };

            var popup_file = new SS.core.helpers.PopupFileHtml();

            popup_file.init(config_popup);

            return;
        }

        var resetForm = function () {
            jQuery('input[type=text], input[type=hidden], textarea', _configs.form_id).val('');
            $("#btnInsertUpdate", _configs.form_id).val('Thêm mới');
            $('#btnDelete').hide();
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
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewInfo(sq_id);
                return false;
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                var sq_id = jQuery('#SQ_ID', _configs.form_id).val();
                sq_id = parseFloat(sq_id);
                if (sq_id > 0) {
                    $("#btnInsertUpdate", _configs.form_id).val('Cập nhật');
                    $('#btnDelete').show();
                }
            });

            jQuery('#btnInsertUpdate').click(function () {
                var sq_id = jQuery('#SQ_ID', _configs.form_id).val();
                sq_id = parseFloat(sq_id);
                if (sq_id > 0) {
                    return update();
                }
                else {
                    return insert();
                }
            });
            jQuery('#btnReset').click(function () {
                resetForm();
            });
            jQuery('#btnDelete').click(function () {
                deleteRow();
            });

        }

        var initMessengerHub = function () {

            jQuery(document).bind('NOTICE_CHANGE_ACCOUNTING_PAYMENT_MESSAGE_STATUS', function (event) {

                renderGrid();

                try {
                    initAlertMessage('Cập nhật thông tin mã thanh toán ' + event.clientMessage.Data.Data.sq_id, 1, true);
                }
                catch (e) {
                    initAlertMessage('Cập nhật thông tin mã thanh toán', 1, true);
                }

                if (_configs.messengerHub) _configs.messengerHub.play();

            });

        }

        var initControls = function () {
      
            initGrid();

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