(function () {

    VA.views.tour.TravelTourBooking = function () {

        var _configs = {
        }

        var ClientMessage = function () {
            this.Title = null;
            this.Content = null;
            this.Duration = null;
            this.Data = null;
            this.GroupId = null;
        }

        var sendClientMessage = function (clientMessage) {
            if (_configs.messengerHub) {
                _configs.messengerHub.sendMessage(clientMessage);
            }
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

        function initRebindGridOnNewClientMessage() {
            jQuery(document).bind('onReceiveMessageFromHub', function (e) {
                if (e.clientMessage && e.clientMessage.Data && e.clientMessage.Data.order_id) {
                    _grid_paged.renderGrid(true);
                }
            });
        }

        function initAddUpdateState(show) {
            if (show == false) {
                $('.edit_st').css('display', 'none');
                $('.add_st').css('display', 'none');
            }
            else {
                $('.edit_st').css('display', '');
                $('.add_st').css('display', '');
            }
        }


        function renderGrid() {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }


        function setGridConfigFromQueryString() {
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
                if (action == "view") $('#formView').deserializeObjectToFormView({
                    tmpId: '#tmp_grid', idx: null, keyName: 'order_id', keyValue: order_id
                });
                window.location.hash = 'action_complete';

            };
        }

        function deserializeObjectToForm(tmpId, order_id) {
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

        function initSearchForm() {
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


            var status = $('#STATUS').val();

            conditions.BOOKING_INFO = {};

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.BOOKING_INFO.STATUS = status;
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
        function initBookingControl() {
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

                if (data_form.status == 2) {
                    if (data_form.mb_id != jLoki.User.Status.GmId) {
                        setBookingControlUpdate(false);
                        $('#envato-support-wrap').css('display', 'none');
                        return;
                    }
                }

                setBookingControlUpdate(true);

                $('.order_id_inner').html(data_form.order_id);

                $('#widget-booking-control-update').empty();

                $('#tmp_support_list_booking_update').tmpl(data_form).appendTo('#widget-booking-control-update');

                jQuery('a[data-booking-status]').unbind('click');
                jQuery('a[data-booking-status]').click(function () {


                    var booking_status = $(this).attr('data-booking-status');
                    var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');
                    if (booking_status == -1) {
                        //xoa
                        if (confirm('Quý khách chắc chắn muốn xóa khỏi hệ thống mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 1) {
                        //huy bo xu ly
                        if (confirm('Quý khách chắc chắn hủy bỏ xử lý mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 2) {
                        //nhan xu ly
                        if (confirm('Quý khách chắc chắn nhận xử lý mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 3) {
                        //xu ly xong
                        if (confirm('Quý khách chắc chắn xử lý xong mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 4) {
                        // huy bo
                        if (confirm('Quý khách chắc chắn hủy bỏ mã dịch vụ ' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    updateBookingStatus(booking_status, data_form);
                });


            });
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

        function getBookingInfoPartial(formId, objectForm) {

            var formBoxId = '#box_' + formId.replace('#', '');

            _form_view_booking_info_partial_grid_source = formId;

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/Tour/GetTravelTourBookingInfo",
                dataType: 'html',
                type: 'POST',
                data: {
                    order_id: objectForm.order_id
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    if (data.length > 0)
                        jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');

                    $(formId).empty();

                    $(formId).html(data);

                    $(document).trigger({
                        type: 'getBookingInfoPartial',
                        objectForm: data
                    });
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    jwm.Alert.ShowMsg(formBoxId, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function updateBookingStatus(status, dataForm) {
            var data_post = {
            };
            data_post.op = "UpdateTravelTourBookingStatus";
            data_post.order_id = dataForm.order_id;
            data_post.status = status;
            data_post.mb_id = jLoki.User.Status.GmId;
            jwm.Alert.ShowAjaxProcessing('#flightBookingContext');
            jQuery.ajax({
                url: "/Tour/UpdateTravelTourBookingInfo",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#flightBookingContext');
                    jwm.Alert.ShowMsg('#flightBookingContext', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {

                        //sendClientMessage
                        var client_message = new ClientMessage();
                        client_message.GroupId = _configs.messengerHubGroupIds.NOTICE_CHANGE_BOOKING_STATUS_TRAVEL_TOUR;
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
                            setTimeout(function () { window.location.href = '/tour/TravelTourBooking?action=searching&status=1'; }, 1000);
                        }
                        else {
                            setTimeout(function () { window.location.href = '/tour/TravelTourBooking?action=view&status=' + status + '&order_id=' + dataForm.order_id; }, 1000);
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


        function GetListHierarchicalCategories() {
            jwm.Alert.ShowAjaxProcessing('#categories');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/ListInfo.asmx/GetListHierarchicalCategories",
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


        function rebindCategories() {

            data_list = jQuery('#tmp_categories').data('data_source');

            data_list.value = initLevelCheckBox(data_list.value);

            jQuery('#categories').empty();

            jQuery('#tmp_categories').tmpl(data_list).appendTo('#categories');
        }

        function initLevelCheckBox(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        function getCheckBox(category_id) {
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


        function setLinkSEO() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        var initControls = function () {


            initGridManageTravelTourBooking();

            setGridConfigFromQueryString();


            renderGrid();

            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                getBookingInfoPartial(e.formId, e.objectForm);
                $(_form_view_booking_info_partial_grid_source).data('data_source', e.objectForm);

            });

            initSearchForm();

            initBookingControl();
            /*
            jQuery(document).bind('getBookingInfoPartial', function (e) {
    
                initAddUpdateState(false);
    
            });
            */

            initRebindGridOnNewClientMessage();
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