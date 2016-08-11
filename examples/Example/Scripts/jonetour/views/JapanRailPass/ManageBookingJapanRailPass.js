(function () {

    VA.views.JapanRailPass.ManageBookingJapanRailPass = function () {

        var _configs = {

            form_view_booking_info_partial_grid_source: '#formView'
        }

        //ham de send message
        var ClientMessage = function () {
            this.Title = null;
            this.Content = null;
            this.Duration = null;
            this.Data = null;
            this.GroupId = null;
        }

        var sendClientMessage = function (clientMessage) {
            if (_configs.messengerHub == null) {
                _configs.messengerHub = new SS.core.MessengerHub();
            }
            _configs.messengerHub.sendMessage(clientMessage);
        }



        var grid_booking_japan_rail_pass_configs = null;

        var grid_booking_japan_rail_pass_paged = null;

        var initGridBookingJapanRailPass = function () {

            grid_booking_japan_rail_pass_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_booking_japan_rail_pass_configs.data = {
                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initRebindGridOnNewClientMessage = function () {
            jQuery(document).bind('onReceiveMessageFromHub', function (e) {
                if (e.clientMessage && e.clientMessage.Data && e.clientMessage.Data.order_id) {
                    grid_booking_japan_rail_pass_paged.renderGrid(true);
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


        var renderGridGridBookingJapanRailPass = function (conditions) {

            if (conditions) {
                grid_booking_japan_rail_pass_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_booking_japan_rail_pass_paged = new SS.core.GridPaged();

            grid_booking_japan_rail_pass_paged.init(grid_booking_japan_rail_pass_configs);
        }


        var initControls = function () {

            initGridBookingJapanRailPass();

            setGridConfigFromQueryString();

            renderGridGridBookingJapanRailPass();

            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                $(_configs.form_view_booking_info_partial_grid_source).data('data_source', e.objectForm);

                getBookingInfoPartial(e.formId, e.objectForm);

                $('html, body').animate({
                    scrollTop: $("#formView").offset().top
                }, 100);

            });

            initBookingControl();

            initFilterForm();

            initRebindGridOnNewClientMessage();

            initOptionFilterForm();


        }

      
     
        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });


        }


        function execFilterForm() {
            var order_id = $('#ORDER_ID_SEARCH', '#filterForm').val();
            var mobile = $('#MOBILE_SEARCH', '#filterForm').val();
            var email = $('#EMAIL_SEARCH', '#filterForm').val();
            var full_name = $('#FULL_NAME_SEARCH', '#filterForm').val();

            var mb_id = $('#MB_ID_SEARCH', '#filterForm').val();
          

            var conditions = {
            };

            conditions.BOOKING_INFO = {};

          
            if (isEmpty(order_id) == false) {
                order_id = order_id.trim();

                conditions.BOOKING_INFO.ORDER_ID = order_id;
            }

            if (isEmpty(mobile) == false) {
                mobile = mobile.trim();

                conditions.BOOKING_INFO.MOBILE = mobile;
            }

            if (isEmpty(email) == false) {
                email = email.trim();

                conditions.BOOKING_INFO.EMAIL = email;
            }


            if (isEmpty(full_name) == false) {
                full_name = full_name.trim();

                conditions.BOOKING_INFO.FULL_NAME = full_name;
            }

            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();

                conditions.BOOKING_INFO.MB_ID = mb_id;
            }


            grid_booking_japan_rail_pass_configs.data = {
                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_booking_japan_rail_pass_configs.page_size
            };

            grid_booking_japan_rail_pass_paged.init(grid_booking_japan_rail_pass_configs);

            window.location.hash = "option_seaching";

            return false;

        }


        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var status = context.getQueryString('status');

            var action = context.getQueryString('action');

            var option = action;

            var order_id = context.getQueryString('order_id');

            var conditions = {};

            conditions.BOOKING_INFO = {};

            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.BOOKING_INFO.STATUS = status;
            }

            if (isEmpty(order_id) == false) {
                order_id = order_id.trim();
                conditions.BOOKING_INFO.ORDER_ID = order_id;
            }


            if (action == "view") {
                option = 'searching';
            }

            grid_booking_japan_rail_pass_configs.data = {
                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_booking_japan_rail_pass_configs.page_size
            };


            grid_booking_japan_rail_pass_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;

                if (window.location.hash == "#option_seaching") return;

                if (action == "view") {
                    $('#formView').deserializeObjectToFormView({
                        tmpId: '#tmp_grid', idx: null, keyName: 'ORDER_ID', keyValue: order_id
                    });
                }

                window.location.hash = 'action_complete';

            };
        }



        var getBookingInfoPartial = function (formId, objectForm) {

            var formBoxId = '#box_' + formId.replace('#', '');

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/JapanRailPass/BookingInfoJapanRailPass",
                dataType: 'html',
                type: 'GET',
                data: {
                    order_id: objectForm.ORDER_ID
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    if (resp.length > 0)
                       // jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');

                    $(formId).empty();

                    $(formId).html(resp);

                    $(document).trigger({
                        type: 'getBookingInfoPartial',
                        objectForm: objectForm
                    });

                    initInserBookingInfoNote();


                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    jwm.Alert.ShowMsg(formBoxId, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initInserBookingInfoNote = function () {

            var data_form = $(_configs.form_view_booking_info_partial_grid_source).data('data_source');

            $('a[data-booking-note]').unbind('click');

            $('a[data-booking-note]').click(function () {
                var config_popup = {
                    file_url: '/html/popup/JapanRailPass/ConfirmNoteBooking.html',
                    args: {
                        Title: 'Thêm ghi chú mã dịch vụ ' + data_form.ORDER_ID,
                        DataForm: data_form,
                        FunctionCallBack: insertBookingNote,
                        ORDER_ID: data_form.ORDER_ID
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);

                return false;

            })
        }

        var insertBookingNote = function (note, orderId) {

            jwm.Alert.ShowAjaxProcessing("#booking_info_note", true);

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: {
                    op: "PACKAGE_HTTP_POST",
                    path_ajax_post: '/service03/jrp/get',
                    PACKAGE_NAME: 'PK_BD_BOOKING_NOTE',
                    OBJECT_NAME: 'INSERT_BOOKING_NOTE',
                    P_NOTE: note,
                    P_ORDER_ID: orderId,
                    P_MB_ID: jLoki.User.Status.GmId,
                    P_ROW_START: 0,
                    P_ROW_END: 10
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#booking_info_note", true);

                    $(document).trigger('REFRESH_BOOKING_INFO_NOTE');

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#booking_info_note", true);
                    jwm.Alert.ShowMsg("#booking_info_note", -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        function setBookingControlUpdate(show) {
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

                var data_form = e.objectForm;

                if (data_form.STATUS == 2) {
                    if (data_form.MB_ID != jLoki.User.Status.GmId) {
                        setBookingControlUpdate(false);
                        $('#envato-support-wrap').css('display', 'none');
                        return;
                    }
                }


                else if (data_form.STATUS == 3) {
                    setBookingControlUpdate(false);
                    $('#envato-support-wrap').css('display', 'none');
                    return;
                }


                setBookingControlUpdate(true);

                $('.order_id_inner').html(data_form.ORDER_ID);

                $('#widget-booking-control-update').empty();

                $('#tmp_support_list_booking_update').tmpl(data_form).appendTo('#widget-booking-control-update');

                jQuery('a[data-booking-status]').unbind('click');
                jQuery('a[data-booking-status]').click(function () {


                    var booking_status = $(this).attr('data-booking-status');

                    var data_form = $(_configs.form_view_booking_info_partial_grid_source).data('data_source');

                    if (booking_status == -1) {
                        //xoa

                        if (confirm('Quý khách chắc chắn muốn xóa khỏi hệ thống mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 1) {
                        //huy bo xu ly

                        var config_popup = {
                            file_url: '/html/popup/JapanRailPass/ConfirmCancelProcessingOrder.html',
                            args: {
                                Title: 'Hủy bỏ xử lý mã dịch vụ ' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 2) {
                        //nhan xu ly

                        if (confirm('Quý khách chắc chắn nhận xử lý mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 3) {
                        //xu ly xong

                        var config_popup = {
                            file_url: '/html/popup/JapanRailPass/ConfirmProcessingOrder.html',
                            args: {
                                Title: 'Xử lý xong mã dịch vụ ' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                        //if (confirm('Quý khách chắc chắn xử lý xong mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                        //    return;
                        //}

                    }
                    else if (booking_status == 4) {
                        // huy bo

                        var config_popup = {
                            file_url: '/html/popup/JapanRailPass/ConfirmCancelProcessingOrder.html',
                            args: {
                                Title: 'Hủy bỏ mã dịch vụ ' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
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

        ///truong hop call
        var pushMessageOnUpdateBookingStatus = function (status, dataForm, resp) {
           
            var client_message = new ClientMessage();

            client_message.GroupId = 10;
            //he thong gan tu dong se kiem tra status=2
            if (status == 2) {
                client_message.Data = {
                    order_id: dataForm.ORDER_ID, status: status, mb_id_nick_name: resp.Data.CURSOR_DATA[0].MB_ID_NICK_NAME
                };
            }
            else {
                client_message.Data = {
                    order_id: dataForm.ORDER_ID, status: status, mb_id_nick_name: jLoki.User.Status.NickName
                };
            }


            sendClientMessage(client_message);
        }

        var updateBookingStatus = function (status, dataForm) {

            var data_post = {
            };


            data_post.P_ORDER_ID = dataForm.ORDER_ID;

            data_post.P_STATUS = status;

            data_post.P_MB_ID = jLoki.User.Status.GmId;

            if (
                 (status == 4) ||
                 (status == 1) ||
                 (status == -1) ||
                 (status == 3)
                 ) {
                data_post.P_REASON = dataForm.reason;

            }

            jwm.Alert.ShowAjaxProcessing('#bookingJapanRailPass');

            jQuery.ajax({
                url: "/JapanRailPass/UpdateBookingInfoStatus",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing('#bookingJapanRailPass');

                    jwm.Alert.ShowMsg('#bookingJapanRailPass', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        //
                        //debugger;

                        //push message to client
                        pushMessageOnUpdateBookingStatus(status, dataForm, resp);
                                                
                        if (status == -1) {
                            setTimeout(function () { window.location.href = '/JapanRailPass/ManageBookingJapanRailPass?action=searching&status=1'; }, 1000);
                        }
                        else {
                            setTimeout(function () { window.location.href = '/JapanRailPass/ManageBookingJapanRailPass?action=view&status=' + status + '&order_id=' + data_post.P_ORDER_ID; }, 1000);
                        }

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#bookingJapanRailPass');
                    jwm.Alert.ShowMsg('#bookingJapanRailPass', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        //lay danh sach nhan vien xu li
        var initOptionFilterForm = function () {


            //nhan vien xu ly -> fill data
            var data_post = {};

            data_post.package_name = "PK_BD_BOOKING_INFO";

            data_post.object_name = "GET_LIST_TICKETING";

            jwm.Alert.ShowAjaxProcessing('#filterForm');


            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: "jsonp",
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }
                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_slMbId').data('data_source', data_list);

                    jQuery('#MB_ID_SEARCH').html('<option value="">-- [ Chọn nhân viên ] --</option>');

                    jQuery('#tmp_slMbId').tmpl(data_list).appendTo('#MB_ID_SEARCH');
                },
                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_ROOT_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
