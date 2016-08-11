(function () {

    VA.views.travelTour.TravelTourBooking = function () {

        var _configs = {
            form_view_booking_info_partial_grid_source: '#formView'
        }

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

        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGridManageTravelTourBooking = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };


            var conditions = {

            };

            _grid_paged_config.data = {

                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions)

            };
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

            _grid_paged_config.data = {
                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };


            _grid_paged_config.onRenderComplete = function () {

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

                return execSearchForm();

            });

            $('#searchForm').enter(function () {

                return execSearchForm();

            });
        }


        var execSearchForm = function () {

            var conditions = {
            };


            var status = $('#STATUS', '#searchForm').val();
            var order_id = $('#ORDER_ID', '#searchForm').val();
            var mobile = $('#MOBILE', '#searchForm').val();
            var email = $('#EMAIL', '#searchForm').val();
            var departure_date = $('#DEPARTURE_DATE', '#searchForm').val();


            conditions.BOOKING_INFO = {};

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.BOOKING_INFO.STATUS = status;
            }


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


            if (isEmpty(departure_date) == false) {
                departure_date = departure_date.trim();

                conditions.BOOKING_INFO.RGT_DTM = departure_date;
            }
            _grid_paged_config.data = {
                package_name: 'PK_BD_BOOKING_INFO',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };

            _grid_paged.init(_grid_paged_config);

            window.location.hash = "option_seaching";

            return false;
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
                            file_url: '/html/popup/travelTour/ConfirmCancelProcessingOrder.html',
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
                            file_url: '/html/popup/travelTour/ConfirmCancelProcessingOrder.html',
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
                            file_url: '/html/popup/travelTour/ConfirmCancelProcessingOrder.html',
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

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/TravelTour/TravelTourBookingInfo",
                dataType: 'html',
                type: 'POST',
                data: {
                    order_id: objectForm.ORDER_ID
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    //if (resp.length > 0)
                    //   // jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');

                    $(formId).empty();

                    $(formId).html(resp);

                    $(document).trigger({
                        type: 'getBookingInfoPartial',
                        objectForm: objectForm
                    });

                    initInsertTravelTourBookingNote();


                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    jwm.Alert.ShowMsg(formBoxId, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }




        var initInsertTravelTourBookingNote = function () {

            var data_form = $(_configs.form_view_booking_info_partial_grid_source).data('data_source');

            $('a[data-booking-note]').unbind('click');

            $('a[data-booking-note]').click(function () {
                var config_popup = {
                    file_url: '/html/popup/travelTour/ConfirmNoteBooking.html',
                    args: {
                        Title: 'Thêm ghi chú mã dịch vụ ' + data_form.ORDER_ID,
                        DataForm: data_form,
                        FunctionCallBack: insertTravelTourBookingNote,
                        ORDER_ID: data_form.ORDER_ID
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);

                return false;

            })
        }

        var insertTravelTourBookingNote = function (note, orderId) {

            jwm.Alert.ShowAjaxProcessing("#block_travel_tour_booking_info_note", true);

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: {
                    op: "PACKAGE_HTTP_POST",
                    path_ajax_post: '/service03/tour/get',
                    PACKAGE_NAME: 'PK_BD_BOOKING_NOTE',
                    OBJECT_NAME: 'INSERT_ROW',
                    P_NOTE: note,
                    P_ORDER_ID: orderId,
                    P_MB_ID: jLoki.User.Status.GmId,
                    P_ROW_START: 0,
                    P_ROW_END: 10
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#block_travel_tour_booking_info_note", true);

                    $(document).trigger('REFRESH_GRID_TRAVEL_TOUR_BOOKING_INFO_NOTE');

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#block_travel_tour_booking_info_note", true);
                    jwm.Alert.ShowMsg("#block_travel_tour_booking_info_note", -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }




        var updateBookingStatus = function (status, dataForm) {

            var data_post = {
            };

            data_post.op = "UpdateTravelTourBookingStatus";

            data_post.order_id = dataForm.ORDER_ID;

            data_post.status = status;

            data_post.mb_id = jLoki.User.Status.GmId;

            if (
                 (status == 4) ||
                 (status == 1) ||
                 (status == -1) ||
                 (status == 3)
                 ) {
                data_post.reason = dataForm.reason;

            }

            jwm.Alert.ShowAjaxProcessing('#flightBookingContext');

            jQuery.ajax({
                url: "/TravelTour/UpdateTravelTourBookingInfoStatus",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {

                    jwm.Alert.HideAjaxProcessing('#flightBookingContext');

                    jwm.Alert.ShowMsg('#flightBookingContext', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                       // debugger;

                        //sendClientMessage
                        var client_message = new ClientMessage();

                        client_message.GroupId = _configs.messengerHubGroupIds.NOTICE_CHANGE_BOOKING_STATUS_TRAVEL_TOUR;

                        if (status == 2) {
                            client_message.Data = {
                                order_id: dataForm.ORDER_ID, status: status, mb_id_nick_name: resp.Data.MB_ID_NICK_NAME
                            };
                        }
                        else {
                            client_message.Data = {
                                order_id: dataForm.ORDER_ID, status: status, mb_id_nick_name: jLoki.User.Status.NickName
                            };
                        }

                        sendClientMessage(client_message);

                        if (status == -1) {
                            setTimeout(function () { window.location.href = '/travelTour/TravelTourBooking?action=searching&status=1'; }, 1000);
                        }
                        else {
                            setTimeout(function () { window.location.href = '/travelTour/TravelTourBooking?action=view&status=' + status + '&order_id=' + dataForm.ORDER_ID; }, 1000);
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


        var initControls = function () {


            initGridManageTravelTourBooking();

            setGridConfigFromQueryString();

            renderGrid();

            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                $(_configs.form_view_booking_info_partial_grid_source).data('data_source', e.objectForm);

                getBookingInfoPartial(e.formId, e.objectForm);

                $('html, body').animate({
                    scrollTop: $("#formView").offset().top
                }, 100);

            });

            initSearchForm();

            initBookingControl();

            initRebindGridOnNewClientMessage();

            $('#DEPARTURE_DATE', '#searchForm').datepick({
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