(function () {

    VA.views.accounting.ManageAccountingFlightBookingVn = function () {

        var _configs = {
        }


        var initRebindGridOnNewClientMessage = function () {
            jQuery(document).bind('onReceiveMessageFromHub', function (e) {
                if (e.clientMessage && e.clientMessage.Data && e.clientMessage.Data.order_id) {
                    _grid_paged.renderGrid(true);
                }
            });
        }

        var initAddUpdateState = function (show) {
            if (show == false) {
                $('.edit_st').css('display', 'none');
                $('.add_st').css('display', 'none');
            }
            else {
                $('.edit_st').css('display', '');
                $('.add_st').css('display', '');
            }
        }

        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListFlightBookingInfo',
                page_size: 20,
                row_start: 0,
                row_end: 20
            };
        }
        
        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var setGridConfigFromQueryString = function () {
            var context = new SS.core.helpers.context();

            var status = context.getQueryString('status');

            var action = context.getQueryString('action');

            var option = action;

            var order_id = context.getQueryString('order_id');

            var conditions = new Array();

            if (isEmpty(status) == false)
                conditions.push("(a.status = " + status + ")");

            if (isEmpty(order_id) == false)
                conditions.push("(a.order_id = " + order_id + ")");

            if (action == "view") {
                option = 'searching';
            }

            _grid_paged_config.data = {
                op: option, conditions: JSON.stringify(conditions)
            };

            _grid_paged_config.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;
                if (window.location.hash == "#option_seaching") return;
                if (action == "view") $('#formView').deserializeObjectToFormView({
                    tmpId: '#tmp_grid', idx: null, keyName: 'order_id', keyValue: order_id
                });
                window.location.hash = 'action_complete';

            };
        }

        var deserializeObjectToForm = function (tmpId, order_id) {
            var a = this.serializeArray();
            var data = jQuery(tmpId).data('data-source');
            var json = data[idx];
            $.each(a, function (index, item) {
                var func_format = $('#' + this.name).attr('data-func-format');
                if (isEmpty(func_format)) {
                    if ($('#' + this.name).hasClass('money-mask')) {
                        $('#' + this.name).autoNumeric('set', parseFloat(json[this.name.toLowerCase()]));
                        $('#' + this.name).focus();
                    }
                    $('#' + this.name).val(json[this.name.toLowerCase()]);
                }
                else {
                    var value = json[this.name.toLowerCase()];
                    var func = func_format.format(value);
                    value = eval('(' + func + ')');
                    $('#' + this.name).val(value);
                }
                if (index == a.length - 1) {
                    $('#' + a[0].name).focus();
                }
            });
            $(document).trigger({
                type: 'deserializeObjectToForm',
                objectForm: json
            });
        };

        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').click(function () {

                var status = $('#STATUS', '#searchForm').val();

                var conditions = new Array();
                if (status >= 0) {
                    conditions.push('(a.status = ' + status + ')');
                }

                //fix dua ve trang dau tien, row_start = 0, row_end = 10
                _grid_paged.init({
                    data: {
                        op: 'searching', conditions: JSON.stringify(conditions)
                    },
                    row_start: 0,
                    row_end: _grid_paged_config.page_size
                });

                window.location.hash = "option_seaching";

                return false;
            });
        }

        var initExportForm = function () {
            $('#btnExportCsv', '#filterForm').click(function () {

                return execFilterForm(true);

            });
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

                    initEnhanceFilterForm();

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
        }

        var execFilterForm = function (exportFile) {
            var order_id = $('#txtOrderId', '#filterForm').val();
            var mobile = $('#txtMobile', '#filterForm').val();
            var email = $('#txtEmail', '#filterForm').val();
            var full_name = $('#txtFullName', '#filterForm').val();
            var customer_info_first_name_last_name = $('#CUSTOMER_INFO_FIRST_NAME_LAST_NAME', '#filterForm').val();
            var mb_id = $('#slMbId', '#filterForm').val();
            var status = $('#slStatus', '#filterForm').val();
            var booking_date = $('#BOOKING_DATE', '#filterForm').val();
            var airline_code = $('#slAirlineCode', '#filterForm').val();
            var payment_method_id = $('#slPaymentMethodId', '#filterForm').val();
            var amount_min = $('#AMOUNT_MIN', '#filterForm').autoNumeric('get');
            var amount_max = $('#AMOUNT_MAX', '#filterForm').autoNumeric('get');
            var issue_ticket_date = $('#ISSUE_TICKET_DATE', '#filterForm').val();
            var issue_ticket_date_upt_dtm = $('#ISSUE_TICKET_DATE_UPT_DTM', '#filterForm').val();

            var conditions = new Array();

            //--------------------------------------------------------
            //Check input
            if (isEmpty(order_id) == false) {
                order_id = order_id.trim();
                conditions.push('(a.order_id = ' + order_id + ')');
            }
            if (isEmpty(mobile) == false) {
                mobile = mobile.trim();
                conditions.push("(regexp_like(a.mobile,'" + mobile + "','i'))");
            }
            if (isEmpty(email) == false) {
                email = email.trim();
                conditions.push("(regexp_like(a.email,'" + email + "','i'))");
            }
            if (isEmpty(full_name) == false) {
                full_name = full_name.trim();
                conditions.push("(regexp_like(a.full_name,'" + full_name + "','i'))");
            }
            if (isEmpty(customer_info_first_name_last_name) == false) {
                customer_info_first_name_last_name = customer_info_first_name_last_name.trim();
                conditions.push("( a.order_id in (select order_id from vietair.customer_info where regexp_like(first_name || ' ' || last_name,'" + customer_info_first_name_last_name + "','i') ) )");
            }
            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();
                conditions.push('(a.mb_id = ' + mb_id + ')');
            }
            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.push('(a.status = ' + status + ')');
            }
            if (isEmpty(booking_date) == false) {
                booking_date = booking_date.trim();
                conditions.push("(trunc(to_date(a.rgt_dtm,'ddmmyyyyhh24miss')) = trunc(to_date('" + booking_date + "','dd/mm/yyyy')))");
            }
            if (isEmpty(airline_code) == false) {
                airline_code = airline_code.trim();
                conditions.push("( a.order_id in (select order_id from vietair.travel_info where airline_code = '" + airline_code + "') )");
            }
            if (isEmpty(payment_method_id) == false) {
                payment_method_id = payment_method_id.trim();
                conditions.push('(a.payment_method_id = ' + payment_method_id + ')');
            }
            if (isEmpty(amount_min) == false) {
                amount_min = amount_min.trim();
                conditions.push("( a.amount >= '" + amount_min + "') ");
            }
            if (isEmpty(amount_max) == false) {
                amount_max = amount_max.trim();
                conditions.push("( a.amount <= '" + amount_max + "') ");
            }
            if (isEmpty(issue_ticket_date) == false) {
                issue_ticket_date = issue_ticket_date.trim();
                conditions.push("( trunc(a.issue_ticket_date_vt) = trunc(to_date('" + issue_ticket_date + "','dd/mm/yyyy')) )");
            }
            if (isEmpty(issue_ticket_date_upt_dtm) == false) {
                issue_ticket_date_upt_dtm = issue_ticket_date_upt_dtm.trim();
                conditions.push("( trunc(to_date(a.upt_dtm,'ddmmyyyyhh24miss')) = trunc(to_date('" + issue_ticket_date_upt_dtm + "','dd/mm/yyyy')) )");
                conditions.push("( a.status = 3 )"); //da xuat ve
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


                            var url_download = _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListFlightBookingInfo';
                            var data_post_download = {
                                op: 'searching',
                                op_sl: 'ExportFile',
                                rowStart: 0,
                                rowEnd: _configs.args.DataForm.export_total_row,
                                conditions: JSON.stringify(conditions),
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
                //fix dua ve trang dau tien, row_start = 0, row_end = 10
                _grid_paged.init({
                    data: {
                        op: 'searching',
                        conditions: JSON.stringify(conditions)
                    },
                    row_start: 0,
                    row_end: _grid_paged_config.page_size
                });

                window.location.hash = "option_seaching";
            }

            return false;
        }

        var initEnhanceFilterForm = function () {

            //nhan vien xu ly -> fill data
            jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slMbId');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListUserHandleFlightBooking",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slMbId');

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_slMbId').data('data_source', data_list);

                    jQuery('#slMbId').html('<option value="">---Chọn nhân viên---</option>');

                    jQuery('#tmp_slMbId').tmpl(data_list).appendTo('#slMbId');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slMbId');
                    jwm.Alert.ShowMsg('.search-enhance-container', -1, message + " " + exc, 'Thông báo');
                }
            });

            //hang hang khong -> fill data
            jwm.Alert.ShowAjaxProcessing('.search-enhance-container', false, 'slAirlineCode');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListAirlineFromFlightBooking",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slAirlineCode');

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_slAirlineCode').data('data_source', data_list);

                    jQuery('#slAirlineCode').html('<option value="">---Chọn hãng---</option>');

                    jQuery('#tmp_slAirlineCode').tmpl(data_list).appendTo('#slAirlineCode');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slAirlineCode');
                    jwm.Alert.ShowMsg('.search-enhance-container', -1, message + " " + exc, 'Thông báo');
                }
            });

            //cac hinh thuc thanh toan -> fill data
            jwm.Alert.ShowAjaxProcessing('.search-enhance-container', false, 'slPaymentMethodId');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListPaymentMethods",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slPaymentMethodId');

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_slPaymentMethodId').data('data_source', data_list);

                    jQuery('#slPaymentMethodId').html('<option value="">---Chọn hình thức thanh toán---</option>');

                    jQuery('#tmp_slPaymentMethodId').tmpl(data_list).appendTo('#slPaymentMethodId');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slPaymentMethodId');
                    jwm.Alert.ShowMsg('.search-enhance-container', -1, message + " " + exc, 'Thông báo');
                }
            });


            //initDate
            $('#BOOKING_DATE', '#filterForm').datepick({
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

            $('#ISSUE_TICKET_DATE', '#filterForm').datepick({
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

            $('#ISSUE_TICKET_DATE_UPT_DTM', '#filterForm').datepick({
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

        var initBookingControl = function () {
            $(document).bind('GetListFlightBookingInfo_Simple', function (e) {
                if (e.objectForm.TypeMsg > 0 && e.objectForm.RowCount > 0) {
                    var data_list = {
                    };
                    data_list.value = e.objectForm.Data;
                    $('#widget-booking-new').empty();
                    $('#tmp_li_booking_new').tmpl(data_list).appendTo('#widget-booking-new');
                    $('#widget-booking-new-top').html((e.objectForm.RowCount >= 5 ? 5 : e.objectForm.RowCount) + ' mã dịch vụ mới nhất');
                }
            });

            setBookingControlUpdate(false);

            jQuery('#btnShowNewMessage').hover(function () {
                $('#envato-widget-switcher-wrap').css('display', 'block');
                $('#envato-support-wrap').css('display', 'none');
                $('#envato-community-wrap').css('display', 'none');
            });
            jQuery('#btnShowNewBooking').hover(function () {
                $('#envato-widget-switcher-wrap').css('display', 'none');
                $('#envato-support-wrap').css('display', 'none');
                $('#envato-community-wrap').css('display', 'block');
            });

            jQuery('#btn_cl_wi1').click(function () {
                $('#envato-widget-switcher-wrap').css('display', 'none');
            });
            jQuery('#btn_cl_wi2').click(function () {
                $('#envato-support-wrap').css('display', 'none');
            });
            jQuery('#btn_cl_wi3').click(function () {
                $('#envato-community-wrap').css('display', 'none');
            });

            jQuery(document).bind('getBookingInfoPartial', function (e) {

                var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');

               // console.log(data_form);

                if (data_form.status == 2) {
                    if (data_form.mb_id != jLoki.User.Status.GmId) {
                        setBookingControlUpdate(false);
                        $('#envato-support-wrap').css('display', 'none');
                        return;
                    }
                }
                else if (data_form.status == 3) {
                    setBookingControlUpdate(false);
                    $('#envato-support-wrap').css('display', 'none');
                    return;
                }

                setBookingControlUpdate(true);

                $('.order_id_inner').html(data_form.order_id);

                $('#widget-booking-control-update').empty();
              // debugger;

                $('#tmp_support_list_booking_update').tmpl(data_form).appendTo('#widget-booking-control-update');

               

                jQuery('a[data-booking-status]').unbind('click');
                jQuery('a[data-booking-status]').click(function () {


                    var booking_status = $(this).attr('data-booking-status');
                    var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');
                    if (booking_status == -1) {
                        //xoa
                        //if (confirm('Quý khách chắc chắn muốn xóa khỏi hệ thống mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                        //    return;
                        //}

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Xóa khỏi hệ thống mã dịch vụ ' + data_form.order_id, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 1) {
                        //huy bo xu ly
                        //if (confirm('Quý khách chắc chắn hủy bỏ xử lý mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                        //    return;
                        //}

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Hủy bỏ xử lý mã dịch vụ ' + data_form.order_id, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 2) {
                        //nhan xu ly
                        if (confirm('Quý khách chắc chắn nhận xử lý mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 3) {
                        //xu ly xong
                        //if (confirm('Quý khách chắc chắn xử lý xong mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                        //    return;
                        //}

                        var config_popup = {
                            file_url: '/html/popup/airline/NoteCancelOrder.html',
                            args: {
                                Title: 'Ghi chú - Xử lý xong mã dịch vụ ' + data_form.order_id, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 4) {
                        // huy bo
                        //if (confirm('Quý khách chắc chắn hủy bỏ mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                        //    return;
                        //}

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Hủy bỏ mã dịch vụ ' + data_form.order_id, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 5) {
                        // Popup cho xuat ve

                        var config_popup = {
                            file_url: '/html/popup/airline/IssueTicketDate.html',
                            args: {
                                BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 7) {
                        // huy bo
                        //if (confirm('Quý khách chắc chắn hủy bỏ mã dịch vụ ' + data_form.order_id + ' ?') == false) {
                        //    return;
                        //}

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Trả lại tiền mã dịch vụ' + data_form.order_id, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    updateBookingStatus(booking_status, data_form);
                });


            });
        }

        var setBookingControlUpdate = function (show) {
            if (show == true) {
                jQuery('#btnUpdateBooking').css('opacity', '1');
                jQuery('#btnUpdateBooking').hover(function () {
                    $('#envato-widget-switcher-wrap').css('display', 'none');
                    $('#envato-support-wrap').css('display', 'block');
                    $('#envato-community-wrap').css('display', 'none');
                });
            }
            else {
                jQuery('#btnUpdateBooking').css('opacity', '0.2');
                jQuery('#btnUpdateBooking').unbind('hover');
            }
        }

        var getBookingInfoPartial = function (formId, objectForm) {

            var formBoxId = '#box_' + formId.replace('#', '');

            _form_view_booking_info_partial_grid_source = formId;

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/Airline/GetBookingInfo",
                dataType: 'html',
                type: 'POST',
                data: {
                    ORDER_ID: objectForm.order_id
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    if (data.length > 0) {
                        //jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');
                        $('html, body').animate({
                            scrollTop: $("#box_formView").offset().top
                        }, 100);
                    }

                    $(formId).empty();

                    $(formId).html(data);

                    $(document).trigger({
                        type: 'getBookingInfoPartial',
                        objectForm: data
                    });

                    //------------------------------------------------
                    //xu ly show gia chi tiet
                    initShowDetailPriceTax();

                    //chay su kien them ghi chu ngay sau khi lay thong tin booking
                    initInsertBookingNote();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    jwm.Alert.ShowMsg(formBoxId, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initShowDetailPriceTax = function () {

            //---------------------------------------------
            //xy ly show thong tin gia chung
            $('a.show-detail').click(function () {
                $('.main-detail-ticket').toggleClass('show-price-detail');
                if ($(this).hasClass('show-price-detail-off')) {
                    $(this).removeClass('show-price-detail-off');
                    $(this).addClass('show-price-detail-on');
                } else {
                    $(this).removeClass('show-price-detail-on');
                    $(this).addClass('show-price-detail-off');
                }
            });

            //---------------------------------------------
            //xy ly show thong tin gia thue va phi
            $('a.button-price-tax-detail').click(function () {
                $('.price-tax-detai').toggleClass('show-price-detail');
                if ($(this).hasClass('show-price-detail-off')) {
                    $(this).removeClass('show-price-detail-off');
                    $(this).addClass('show-price-detail-on');
                } else {
                    $(this).removeClass('show-price-detail-on');
                    $(this).addClass('show-price-detail-off');
                }
            });
        }

        var updateBookingStatus = function (status, dataForm) {
            var data_post = {
            };
            data_post.op = "UpdateFlightBookingStatus";
            data_post.id = dataForm.order_id_request;
            data_post.status = status;
            data_post.mb_id = jLoki.User.Status.GmId;
            if (status == 5) {
                data_post.issue_ticket_date = dataForm.issue_ticket_date;
                data_post.reason = dataForm.reason;
            }
            else if (
                (status == 3) ||
                (status == 7) ||
                (status == 4) ||
                (status == 1) ||
                (status == -1)
                ) {
                data_post.reason = dataForm.reason;
            }
            jwm.Alert.ShowAjaxProcessing('#flightBookingContext');
            jQuery.ajax({
                url: "/Airline/UpdateBookingInfo",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#flightBookingContext');
                    jwm.Alert.ShowMsg('#flightBookingContext', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {

                        //sendClientMessage
                        var client_message = new ClientMessage();
                        client_message.GroupId = _configs.messengerHubGroupIds.NOTICE_CHANGE_BOOKING_STATUS;
                        if (status == 2) {
                            client_message.Data = {
                                order_id: dataForm.order_id, status: status, mb_id_nick_name: dataForm.mb_id_nick_name
                            };
                        }
                        else {
                            client_message.Data = {
                                order_id: dataForm.order_id, status: status, mb_id_nick_name: jLoki.User.Status.NickName
                            };
                        }
                        sendClientMessage(client_message);


                        if (status == -1) {
                            setTimeout(function () { window.location.href = '/airline/flightBooking?action=searching&status=1'; }, 1000);
                        }
                        else {
                            setTimeout(function () { window.location.href = '/airline/flightBooking?action=view&status=' + status + '&order_id=' + dataForm.order_id; }, 1000);
                        }

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#flightBookingContext');
                    jwm.Alert.ShowMsg('#flightBookingContext', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var GetListHierarchicalCategories = function () {
            jwm.Alert.ShowAjaxProcessing('#categories');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListHierarchicalCategories",
                dataType: "jsonp",
                data: {
                    parent_id: 0
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#categories');
                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_categories').data('data_source', data_list);

                    data_list.value = initLevelCheckBox(data_list.value);

                    jQuery('#categories').empty();

                    jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#categories');
                    jwm.Alert.ShowMsg('#categories', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var rebindCategories = function () {

            data_list = jQuery('#tmp_categories').data('data_source');

            data_list.value = initLevelCheckBox(data_list.value);

            jQuery('#categories').empty();

            jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
        }

        var initLevelCheckBox = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        var getCheckBox = function (category_id) {
            var checked = '';
            var categories = $('#CATEGORIES').val(); //11
            if (parseFloat(category_id) > 0) {

                var array = null;

                if (categories.indexOf(',') > 0) {
                    array = categories.split(',');
                }
                else {
                    array = new Array();
                    array.push(categories);
                }

                if (jQuery.inArray('' + category_id, array) >= 0)
                    checked = 'checked="checked"';
            }
            return '<input type="checkbox" value="' + category_id + '" ' + checked + ' onchange="selectCategories()" name="ck_categories" />';
        }

        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        var initInsertBookingNote = function () {

            var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');

            $('a[data-booking-note]').unbind('click');

            $('a[data-booking-note]').click(function () {
                var config_popup = {
                    file_url: '/html/popup/airline/ConfirmNoteBooking.html',
                    args: {
                        Title: 'Thêm ghi chú mã dịch vụ ' + data_form.order_id,
                        DataForm: data_form,
                        FunctionCallBack: insertBookingNote,
                        ORDER_ID: data_form.order_id
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);

                return false;

            })
        }

        var insertBookingNote = function (note, orderId) {

            jwm.Alert.ShowAjaxProcessing("#block_flight_booking_info_note", true);

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: {
                    op: "PACKAGE_HTTP_POST",
                    path_ajax_post: '/service03/flight/get',
                    PACKAGE_NAME: 'PK_BD_BOOKING_NOTE',
                    OBJECT_NAME: 'INSERT_BOOKING_NOTE',
                    P_NOTE: note,
                    P_ORDER_ID: orderId,
                    P_MB_ID: jLoki.User.Status.GmId,
                    P_ROW_START: 0,
                    P_ROW_END: 10
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#block_flight_booking_info_note", true);

                    $(document).trigger('REFRESH_GRID_FLIGHT_BOOKING_INFO_NOTE');

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#block_flight_booking_info_note", true);
                    jwm.Alert.ShowMsg("#block_flight_booking_info_note", -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var initControls = function () {

            initGrid();

            setGridConfigFromQueryString();

            renderGrid();

            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                getBookingInfoPartial(e.formId, e.objectForm);
                $(_form_view_booking_info_partial_grid_source).data('data_source', e.objectForm);

            });

            initSearchForm();

            initFilterForm();

            initExportForm();

          //  initBookingControl();

            initRebindGridOnNewClientMessage();

          
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