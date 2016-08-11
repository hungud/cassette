(function () {

    VA.views.accounting.ViewTicketingBillInfo = function () {

        var _configs = {
        }

        var form_info = null;

        var initFormInfo = function () {
            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + "/Core.asmx/GetPackageData",
                    is_call_package: true,
                    page_size: 10,
                    row_start: 0,
                    row_end: 10
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();

                    var diff_status = context.getQueryString('diff_status');

                    var conditions = {
                    };

                    conditions.TICKETING_BILL = {};

                    if (isEmpty(diff_status) == false) {
                        diff_status = diff_status.trim();
                        conditions.TICKETING_BILL.diff_status = diff_status;
                    }

                    form_info.grid_configs.data = {
                        package_name: 'PK_BD_ACC_TICKETING_BILL',
                        object_name: 'GET_LIST_TICKETING_BILL',
                        p_conditions: JSON.stringify(conditions)
                    };

                    form_info.grid_configs.onRenderComplete = function () {
                        if (window.location.hash.indexOf('action_complete') >= 0) return;

                        //-------------------------------------------------
                        //others action here

                        window.location.hash = 'action_complete';
                    };
                }
            }

        }

        var viewLogInfo = function (sqId) {
            var data_post = {
            };

            data_post.sq_id = sqId;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/Accounting/ViewTicketingBillInfoLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewlogTicketingInfo').show();
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
                viewLogInfo(sq_id);
                return false;
            });
        }

        var getListBank = function () {
            jwm.Alert.ShowAjaxProcessing(_configs.form_id, true);
            jQuery.ajax({

                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ACC_BANK',
                    object_name: 'GET_LIST_BANK',
                    P_CONDITIONS: '{}',
                    P_ROW_START: '0',
                    P_ROW_END: '30'

                },
                success: function (data) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);

                    if (data != null && data.TypeMsg > 0) {

                        $('#tmp_list_bank_id_filter').tmpl(data.Data.CURSOR_DATA).appendTo("#SE_BANK_ID");

                        $("#SE_BANK_ID").dropdownchecklist({
                            emptyText: "--- [ Chọn ngân hàng ] ---",
                            maxDropHeight: 300,
                            firstItemChecksAll: true,
                            forceMultiple: true,
                            width: 200,
                            explicitClose: '...đóng',
                            icon: {}                         
                        });

                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initFilterForm = function () {

            $('#filterForm').enter(function () {

                return execFilterForm();

            });


            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            }).next().button({
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-s"
                }
            }).click(function () {

                var data_state = $(this).attr('data-state');
                if (data_state != 'open') {
                    $('.search-enhance-container', '#filterForm').css('display', '');
                    $(this).attr('data-state', 'open');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-e"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '0px solid #DDDDDD'
                    });

                    //initEnhanceFilterForm();

                }
                else {
                    $('.search-enhance-container', '#filterForm').css('display', 'none');
                    $(this).attr('data-state', 'close');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '1px solid #DDDDDD'
                    });
                }

                return false;

            }).parent()
             .buttonset();

            $('#btnExportCsv', '#filterForm').click(function () {

                return execFilterForm(true);

            });

        }

        var execFilterForm = function (exportFile) {

            var context = new SS.core.helpers.context();

            var sq_id = context.getQueryString('sq_id');

            var conditions = {
            };

            var se_number_ticketing = $('#SE_NUMBER_TICKETING').val();
            var se_date_ticketing = $('#SE_DATE_TICKETING').val();
            var se_money_reality = $('#SE_MONEY_REALITY').val();
            var se_company_name_exp = $('#SE_COMPANY_NAME_EXP').val();
            var se_tax_code = $('#SE_TAX_CODE').val();
            var se_status = $('#SE_STATUS').val();
            var se_idate = $('#SE_IDATE').val();
            var se_date_sent_bill = $('#SE_DATE_SENT_BILL').val();
            var se_customer_code = $('#SE_CUSTOMER_CODE').val();
            var se_multi_bank_id = $('#SE_BANK_ID').val();
            if (se_multi_bank_id !== null) {
                se_multi_bank_id = $('#SE_BANK_ID').val().join(',');
            } else {
                se_multi_bank_id = null
            }

            var note_search = $('#NOTE_SEARCH').val();
           
            conditions.TICKETING_BILL = {};

            if (isEmpty(se_number_ticketing) == false) {
                se_number_ticketing = se_number_ticketing.trim();
                conditions.TICKETING_BILL.number_ticketing = se_number_ticketing;
            }


            if (isEmpty(se_date_ticketing) == false) {
                se_date_ticketing = se_date_ticketing.trim();
                conditions.TICKETING_BILL.date_ticketing = se_date_ticketing;
            }

            if (isEmpty(se_money_reality) == false) {
                se_money_reality = se_money_reality.trim();
                conditions.TICKETING_BILL.money_reality = se_money_reality;
            }

            if (isEmpty(se_company_name_exp) == false) {
                se_company_name_exp = se_company_name_exp.trim();
                conditions.TICKETING_BILL.company_name_exp = se_company_name_exp;
            }

            if (isEmpty(se_tax_code) == false) {
                se_tax_code = se_tax_code.trim();
                conditions.TICKETING_BILL.tax_code = se_tax_code;
            }

            if (isEmpty(se_status) == false) {
                se_status = se_status.trim();
                conditions.TICKETING_BILL.status = se_status;
            }

            if (isEmpty(se_idate) == false) {
                se_idate = se_idate.trim();
                conditions.TICKETING_BILL.idate = se_idate;
            }

            if (isEmpty(se_date_sent_bill) == false) {
                se_date_sent_bill = se_date_sent_bill.trim();
                conditions.TICKETING_BILL.date_sent_bill = se_date_sent_bill;
            }

            if (isEmpty(se_customer_code) == false) {
                se_customer_code = se_customer_code.trim();
                conditions.TICKETING_BILL.customer_code = se_customer_code;
            }

            if (isEmpty(se_multi_bank_id) == false) {
                se_multi_bank_id = se_multi_bank_id.trim();
                conditions.TICKETING_BILL.bank_id = se_multi_bank_id;
            }

            if (isEmpty(note_search) == false) {
                note_search = note_search.trim();
                conditions.TICKETING_BILL.note = note_search;
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


                            var url_download = _configs.service_wss_vietair_tv_url + '/Core.asmx/GetPackageData';
                            var data_post_download = {
                                package_name: 'PK_BD_ACC_TICKETING_BILL',
                                object_name: 'GET_LIST_TICKETING_BILL_EXPORT',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(url_download, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {

                form_info.grid_configs.data = {
                    package_name: 'PK_BD_ACC_TICKETING_BILL',
                    object_name: 'GET_LIST_TICKETING_BILL',
                    p_conditions: JSON.stringify(conditions)

                };

                form_info.grid_configs.onRenderComplete = function () {
                    if (window.location.hash.indexOf('action_complete') >= 0) return;

                    //-------------------------------------------------
                    //others action here

                    window.location.hash = 'action_complete';
                };

                form_info.RenderGrid();


            }

            return false;

        }

        var initCompanyName = function () {

            $('#COMPANY_NAME_EXP').blur(function () {
                company_name_exp = $('#COMPANY_NAME_EXP').val();
                var company_imp = $('#COMPANY_IMP').val();
                if (company_imp.length == 0) {
                    $('#COMPANY_IMP').val(company_name_exp);
                }

            });
        }

        var initAddressName = function () {

            $('#ADDRESS_EXP').blur(function () {

                address_exp = $('#ADDRESS_EXP').val();
                var address_imp = $('#ADDRESS_IMP').val();
                if (address_imp.length == 0) {
                    $('#ADDRESS_IMP').val(address_exp);
                }

            });

        }

        var initSeDateSentBill = function () {

            $("#SE_DATE_SENT_BILL").datepick({
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
                defaultDate: 0,
                minDate: '-329D',
                maxDate: '+329D',
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

        var initSearchIdate = function () {
            $("#SE_IDATE").datepick({
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
                defaultDate: 0,
                minDate: '-329D',
                maxDate: '+329D',
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

        var _SE_DATE_TICKETING = "#SE_DATE_TICKETING ";

        var initSearchSeDateBill = function () {

            $(_SE_DATE_TICKETING).datepick({
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
                defaultDate: 0,
                minDate: '-329S',
                maxDate: '+329D',
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

        var _DATE_SENT_BILL = "#DATE_SENT_BILL ";

        var initSearchDateSentBill = function () {

            $(_DATE_SENT_BILL).datepick({
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
                defaultDate: 5,
                minDate: '0',
                maxDate: '+329D',
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

        var _DATE_RECEIVED_BILL = "#DATE_RECEIVED_BILL ";

        var initSearchDateReceivedBill = function () {

            $(_DATE_RECEIVED_BILL).datepick({
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
                defaultDate: 5,
                minDate: '0',
                maxDate: '+329D',
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

        var _DATE_TICKETING = "#DATE_TICKETING ";

        var initSearchDate = function () {

            $(_DATE_TICKETING).datepick({
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
                defaultDate: 5,
                minDate: '0',
                maxDate: '+329D',
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

        var updateTickeTingBillInfo = function () {

            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;
            var data_post = $(_configs.form_id).serializeObject();

            //console.log(data_post);

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_ACC_TICKETING_BILL';

            data_post.object_name = 'UPDATE_CONFIRMATION_INVOICE';

            data_post.hub_group_id = _configs.messengerHubGroupIds.NOTICE_CHANGE_ACCOUNTING_TICKETING_BILL_STATUS;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/CallPackage",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        form_info.grid_paged.renderGrid();

                        viewLogInfo(data_post.P_SQ_ID);

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

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

            jQuery(document).bind('NOTICE_CHANGE_ACCOUNTING_TICKETING_BILL_STATUS', function (event) {

                form_info.RenderGrid();

                try {

                    initAlertMessage('Cập nhật thông tin mã thanh toán ' + event.clientMessage.Data.Data.sq_id, 1, true);

                }
                catch (e) {

                    initAlertMessage('Cập nhật thông tin mã thanh toán ', 1, true);

                }

            });

        }



       



        var initControls = function () {

            initMessengerHub();
 
            initFormInfo();

            form_info.InitContext();

            form_info.RenderGrid();

            initFilterForm();

            jQuery(form_info.button_add_update_id).click(function () {

                return updateTickeTingBillInfo();


            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    $('option', '#STATUS').hide();
                    if (e.objectForm.STATUS == 0) {
                        $('option[value="1"]', '#STATUS').show();
                        $('option[value="2"]', '#STATUS').show();
                        $('option[value="2"]', '#STATUS').attr('selected', true);
                    } else if (e.objectForm.STATUS == 2) {
                        $('option[value="1"]', '#STATUS').show();
                        $('option[value="1"]', '#STATUS').attr('selected', true);
                    };
                    $(form_info.button_add_update_id).val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                    $('#form_check').show();
                }
            });

            getListBank();

            initInsertUpdateForm();

            initSearchDate();

            initSearchDateReceivedBill();

            initSearchDateSentBill();

            initSearchSeDateBill();

            initCompanyName();

            initAddressName();

            initSearchIdate();

            initSeDateSentBill();
            
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