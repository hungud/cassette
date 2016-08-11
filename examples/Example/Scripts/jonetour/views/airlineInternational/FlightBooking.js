(function () {

    VA.views.airlineInternational.FlightBooking = function () {

        var _configs = {
        }

        function ClientMessage() {
            this.Title = null;
            this.Content = null;
            this.Duration = null;
            this.Data = null;
            this.GroupId = null;
        }

        var grid_intl_booking_info_manage_configs = null;

        var grid_intl_booking_info_manage_paged = null;

        var initGridIntlBookingInfoManage = function () {

            grid_intl_booking_info_manage_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };

            var conditions = {

            };


            grid_intl_booking_info_manage_configs.data = {
                package_name: 'PK_BD_INTL_BI_MANAGE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGridIntlBookingInfoManage = function (conditions) {

            if (conditions) {
                grid_intl_booking_info_manage_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_intl_booking_info_manage_paged = new SS.core.GridPaged();

            grid_intl_booking_info_manage_paged.init(grid_intl_booking_info_manage_configs);
        }

        var initControls = function () {
            //khoi tao luoi
            initGridIntlBookingInfoManage();

            //lay thong tin luoi tren query
            setGridConfigFromQueryString();

            //chay luoi
            renderGridIntlBookingInfoManage();

            //su kien khi nguoi dug click nut xem 
            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                if (e.objectForm.STATUS == 1) {

                    //trong truong hop ma dich vu dang cho xu ly
                    //chi cho phep xem neu nhan xu ly ma dich vu
                    //theo cuoc hop ngay 15/06/2016

                    if (confirm('Ticketing chắc chắn nhận xử lý mã dịch vụ QT' + e.objectForm.ORDER_ID + ' ?') == false) {
                        return false;
                    }

                    var booking_status = 2; //nhan xu ly

                    var data_form = e.objectForm;

                    updateBookingStatus(booking_status, data_form);

                    return false;
                }

                getBookingInfoPartial(e.formId, e.objectForm);

                $(_form_view_booking_info_partial_grid_source).data('data_source', e.objectForm);

            });
            //tao thanh truot
            initScrollToTop();

            initSearchForm();

            //tim kiem nang cao
            initFilterForm();

            initBookingControl();

            //dem so ma dang xem hoac cho xu li
            getUserInfoBookingStatusCount();

            //khoi tao luoi va lay thong tin tu Client
            initRebindGridOnNewClientMessage();

            // hien thi so ma dang xem hoac xu li 
            getUserInfoRoundAction(initToggleUpdateRoundAction);
        }

        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var status = context.getQueryString('status');

            var action = context.getQueryString('action');

            var option = action;

            var order_id = context.getQueryString('order_id');

            var mb_id = context.getQueryString('mb_id');

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

            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();
                conditions.BOOKING_INFO.MB_ID = mb_id;
            }

            if (action == "view") {
                option = 'searching';
            }

            grid_intl_booking_info_manage_configs.data = {
                package_name: 'PK_BD_INTL_BI_MANAGE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_intl_booking_info_manage_configs.page_size
            };

            grid_intl_booking_info_manage_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;

                if (window.location.hash == "#option_seaching") return;

                if (action == "view") $('#formView').deserializeObjectToFormView({
                    tmpId: '#tmp_grid', idx: null, keyName: 'ORDER_ID', keyValue: order_id
                });

                window.location.hash = 'action_complete';

            };
        }

        var initSelectTab = function () {

            $('ul.tab-on-header li').unbind('click');
            $('ul.tab-on-header li').click(function () {

                $('ul.tab-on-header li').removeClass('selected');

                $(this).addClass('selected');

                var data_tab_id = $(this).attr('data-tab-id');

                if (data_tab_id == 1) {

                    // = 1 thi load thong tin ve
                    var objectForm = $("#formView").data('data_source');

                    getBookingInfoPartial("#formView", objectForm);

                }
                else if (data_tab_id == 2) {

                    var objectForm = $("#formView").data('data_source');

                    getSmsBrandNameModulePartial(objectForm);

                }


                return false;
            });
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

        var getSmsBrandNameModulePartial = function (objectForm) {


            var formBoxId = '#formView';

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/Sms/ManageTicketingSMSBrandNameModuleControl",
                dataType: 'HTML',
                type: 'POST',
                data: {
                    order_id: objectForm.ORDER_ID,
                    is_booking_international: 1
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('html, body').animate({
                        scrollTop: $("#title-view-info").offset().top
                    }, 100);
                    var view = new VA.views.sms.ManageTicketingSMSBrandNameModuleControl();
                    view.init(_configs);

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);
                    jwm.Alert.ShowMsg(formBoxId, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var getBookingInfoPartial = function (formId, objectForm) {

            $('ul.tab-on-header li').removeClass('selected');

            $('ul.tab-on-header li[data-tab-id="1"]').addClass('selected');

            var formBoxId = '#box_' + formId.replace('#', '');

            _form_view_booking_info_partial_grid_source = formId;

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/AirlineInternational/GetBookingInfo",
                dataType: 'html',
                type: 'POST',
                data: {
                    ORDER_ID: objectForm.ORDER_ID

                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    if (data.length > 0) {
                        // jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');
                        $('html, body').animate({
                            scrollTop: $("#title-view-info").offset().top
                        }, 100);
                    }

                    $(formId).empty();

                    $(formId).html(data);

                    $(document).trigger({
                        type: 'getBookingInfoPartial',
                        objectForm: data
                    });

                    initSelectTab();

                    initShowDetailPriceTax();

                    //------------------------------------------------
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


        var initScrollToTop = function () {

            $(window).scroll(function () {

                var offset_header = $('#header').offset().top;
                var offset_scroll = jQuery(window).scrollTop();
                var offset_right_of_scroll = ($(window).width() - 1498) / 2 - 7;

                $('.box-scroll').css('right', offset_right_of_scroll + 'px');
                if (offset_scroll > offset_header) {
                    $('.box-scroll').show();
                } else {
                    $('.box-scroll').hide();
                }
            })


            $('.box-scroll').click(function () {
                $('html, body').animate({
                    scrollTop: $("#header").offset().top
                }, 100);
            });
        }


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


            var status = $('#STATUS').val();

            conditions.BOOKING_INFO = {};

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.BOOKING_INFO.STATUS = status;
            }


            grid_intl_booking_info_manage_configs.data = {
                package_name: 'PK_BD_INTL_BI_MANAGE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_intl_booking_info_manage_configs.page_size
            };

            grid_intl_booking_info_manage_paged.init(grid_intl_booking_info_manage_configs);

            window.location.hash = "option_seaching";

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

        var execFilterForm = function () {
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

            var ticket_number = $('#TICKET_NUMBER_SEARCH', '#filterForm').val();
            var promotion_type_id = $('#PROMOTION_TYPE_ID_SEARCH', '#filterForm').val();

            var from_date = $('#BOOKING_FROM_DATE', '#filterForm').val();

            var to_date = $('#BOOKING_TO_DATE', '#filterForm').val();

            var conditions = {
            };

            conditions.BOOKING_INFO = {};

            conditions.CUSTOMER_INFO = {};

            conditions.TRAVEL_INFO = {};

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

            if (isEmpty(customer_info_first_name_last_name) == false) {
                customer_info_first_name_last_name = customer_info_first_name_last_name.trim();

                conditions.CUSTOMER_INFO.FULL_NAME_CUSTOMER = customer_info_first_name_last_name;
            }

            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();

                conditions.BOOKING_INFO.MB_ID = mb_id;
            }

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.BOOKING_INFO.STATUS = status;
            }

            if (isEmpty(booking_date) == false) {
                booking_date = booking_date.trim();

                conditions.BOOKING_INFO.IDATE = booking_date;
            }

            if (isEmpty(airline_code) == false) {
                airline_code = airline_code.trim();

                conditions.TRAVEL_INFO.AIRLINE_CODE = airline_code;
            }


            if (isEmpty(payment_method_id) == false) {
                payment_method_id = payment_method_id.trim();

                conditions.BOOKING_INFO.PAYMENT_METHOD_ID = payment_method_id;
            }


            if (isEmpty(amount_min) == false) {
                amount_min = amount_min.trim();

                conditions.BOOKING_INFO.AMOUNT_MIN = amount_min;
            }

            if (isEmpty(amount_max) == false) {
                amount_max = amount_max.trim();

                conditions.BOOKING_INFO.AMOUNT_MAX = amount_max;
            }

            if (isEmpty(issue_ticket_date) == false) {
                issue_ticket_date = issue_ticket_date.trim();

                conditions.BOOKING_INFO.ISSUE_TICKET_DATE = issue_ticket_date;
            }


            if (isEmpty(issue_ticket_date_upt_dtm) == false) {
                issue_ticket_date_upt_dtm = issue_ticket_date_upt_dtm.trim();

                conditions.BOOKING_INFO.UPT_DTM = issue_ticket_date_upt_dtm;
            }

            if (isEmpty(ticket_number) == false) {
                ticket_number = ticket_number.trim();

                conditions.BOOKING_INFO.TICKET_NUMBER = ticket_number;
            }

            if (isEmpty(promotion_type_id) == false) {
                promotion_type_id = promotion_type_id.trim();

                conditions.BOOKING_INFO.PROMOTION_TYPE_ID = promotion_type_id;
            }

            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.BOOKING_INFO.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.BOOKING_INFO.TO_DATE = to_date;
            }


            grid_intl_booking_info_manage_configs.data = {
                package_name: 'PK_BD_INTL_BI_MANAGE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_intl_booking_info_manage_configs.page_size
            };

            grid_intl_booking_info_manage_paged.init(grid_intl_booking_info_manage_configs);

            window.location.hash = "option_seaching";

            return false;

        }


        var initEnhanceFilterForm = function () {

            //nhan vien xu ly -> fill data

            var data_post = {};

            data_post.package_name = "PK_BD_INTL_BI_MANAGE";

            data_post.object_name = "GET_LIST_TICKETING";

            jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slMbId');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",

                dataType: "jsonp",
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slMbId');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

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

            var data_post = {};

            data_post.package_name = "PK_BD_INTL_BI_MANAGE";

            data_post.object_name = "GET_LIST_AIRLINE";
            jwm.Alert.ShowAjaxProcessing('.search-enhance-container', false, 'slAirlineCode');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                dataType: "jsonp",
                data: data_post,

                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slAirlineCode');

                    var data_list = {
                    }


                    data_list.value = resp.Data.CURSOR_DATA;

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

            var data_post = {};

            data_post.package_name = "PK_BD_INTL_BI_MANAGE";

            data_post.object_name = "GET_LIST_PAYMENT_METHOD";
            jwm.Alert.ShowAjaxProcessing('.search-enhance-container', false, 'slPaymentMethodId');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                dataType: "jsonp",
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('.search-enhance-container', false, 'slPaymentMethodId');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

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
            $('#BOOKING_FROM_DATE', '#filterForm').datepick({
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

            $('#BOOKING_TO_DATE', '#filterForm').datepick({
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

                $('.order_id_inner').html('QT' + data_form.ORDER_ID);

                $('#widget-booking-control-update').empty();

                $('#tmp_support_list_booking_update').tmpl(data_form).appendTo('#widget-booking-control-update');

                jQuery('a[data-booking-status]').unbind('click');
                jQuery('a[data-booking-status]').click(function () {


                    var booking_status = $(this).attr('data-booking-status');
                    var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');
                    if (booking_status == -1) {

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Xóa khỏi hệ thống mã dịch vụ QT' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 1) {

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelProcessingOrder.html',
                            args: {
                                Title: 'Hủy bỏ xử lý mã dịch vụ QT' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 2) {
                        //nhan xu ly
                        if (confirm('Quý khách chắc chắn nhận xử lý mã dịch vụ QT' + data_form.ORDER_ID + ' ?') == false) {
                            return;
                        }
                    }
                    else if (booking_status == 3) {


                        var config_popup = {
                            file_url: '/html/popup/airline/NoteOrderAndTicketNumber.html',
                            args: {
                                Title: 'Ghi chú - Xử lý xong QT' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
                            }
                        };

                        var popup_file = new SS.core.helpers.PopupFileHtml();

                        popup_file.init(config_popup);

                        return;

                    }
                    else if (booking_status == 4) {

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Hủy bỏ mã dịch vụ QT' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
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

                        var config_popup = {
                            file_url: '/html/popup/airline/ConfirmCancelOrder.html',
                            args: {
                                Title: 'Trả lại tiền mã dịch vụ QT' + data_form.ORDER_ID, BookingStatus: booking_status, DataForm: data_form, FunctionCallBack: updateBookingStatus
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

        var initInsertBookingNote = function () {

            var data_form = $(_form_view_booking_info_partial_grid_source).data('data_source');

            $('a[data-booking-note]').unbind('click');

            $('a[data-booking-note]').click(function () {
                var config_popup = {
                    file_url: '/html/popup/airline/ConfirmNoteBooking.html',
                    args: {
                        Title: 'Thêm ghi chú mã dịch vụ QT' + data_form.ORDER_ID,
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

            jwm.Alert.ShowAjaxProcessing("#block_flight_booking_info_note", true);

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: {
                    op: "PACKAGE_HTTP_POST",
                    path_ajax_post: '/service03/flight/get',
                    PACKAGE_NAME: 'PK_BD_BOOKING_INTL_NOTE',
                    OBJECT_NAME: 'INSERT_BOOKING_INTL_NOTE',
                    P_NOTE: note,
                    P_ORDER_ID: orderId,
                    P_MB_ID: jLoki.User.Status.GmId,
                    P_ROW_START: 0,
                    P_ROW_END: 10
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#block_flight_booking_info_note", true);

                    $(document).trigger('REFRESH_GRID_FLIGHT_BOOKING_INTL_INFO_NOTE');

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#block_flight_booking_info_note", true);
                    jwm.Alert.ShowMsg("#block_flight_booking_info_note", -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        var updateBookingStatus = function (status, dataForm) {
            var data_post = {
            };
            data_post.op = "UpdateFlightBookingStatus";
            data_post.id = dataForm.ORDER_ID;
            data_post.status = status;
            data_post.mb_id = jLoki.User.Status.GmId;


            console.log(dataForm);
            if (status == 5) {
                data_post.issue_ticket_date = dataForm.issue_ticket_date;
                data_post.reason = dataForm.reason;
            }
            else if (status == 3) {
                data_post.accounting_amount = dataForm.accounting_amount;
                data_post.ticket_number = dataForm.ticket_number;
                data_post.reason = dataForm.reason;
            }
            else if (
                (status == 7) ||
                (status == 4) ||
                (status == 1) ||
                (status == -1)
                ) {
                data_post.reason = dataForm.reason;
            }
            jwm.Alert.ShowAjaxProcessing('#flightBookingContext');

            jQuery.ajax({
                url: "/AirlineInternational/UpdateBookingInfo",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#flightBookingContext');
                    jwm.Alert.ShowMsg('#flightBookingContext', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0) {

                        //sendClientMessage
                        var client_message = new ClientMessage();

                        client_message.GroupId = _configs.messengerHubGroupIds.NOTICE_CHANGE_BOOKING_INTERNATIONAL_STATUS;

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
                            setTimeout(function () { window.location.href = '/AirlineInternational/FlightBooking?action=searching&status=1'; }, 1000);
                        }
                        else {
                            setTimeout(function () { window.location.href = '/AirlineInternational/FlightBooking?action=view&status=' + status + '&order_id=' + dataForm.ORDER_ID; }, 1000);
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



        var getUserInfoBookingStatusCount = function () {

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_USER_BOOKING_001',
                    object_name: 'GET_BOOKING_STATUS_COUNT',
                    p_mb_id: jLoki.User.Status.GmId
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    if (data != null && data.TypeMsg > 0) {

                        var element_booking_status_2 = $.grep(data.Data.CURSOR_DATA, function (element, index) {
                            return element.BOOKING_STATUS == 2;
                        });

                        var element_booking_status_5 = $.grep(data.Data.CURSOR_DATA, function (element, index) {
                            return element.BOOKING_STATUS == 5;
                        });

                        var data_value = {
                        };
                        data_value.booking_status_2 = element_booking_status_2.length > 0 ? element_booking_status_2[0] : {
                            BOOKING_COUNT: 0
                        };
                        data_value.booking_status_5 = element_booking_status_5.length > 0 ? element_booking_status_5[0] : {
                            BOOKING_COUNT: 0
                        };
                        data_value.mb_id = jLoki.User.Status.GmId;

                        $('#tmp_box_booking_status_count_for_user').tmpl(data_value).appendTo("#box_user_booking_status_count");


                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var initRebindGridOnNewClientMessage = function () {
            jQuery(document).bind('onReceiveMessageFromHub', function (e) {
                if (e.clientMessage && e.clientMessage.Data && e.clientMessage.Data.order_id) {
                    grid_intl_booking_info_manage_paged.renderGrid(true);
                }
            });
        }


        var sendClientMessage = function (clientMessage) {
            if (_configs.messengerHub == null) {
                _configs.messengerHub = new SS.core.MessengerHub();
            }

            _configs.messengerHub.sendMessage(clientMessage);
        }



        var getUserInfoRoundAction = function (callback) {
            var conditions = new Array();

            conditions.push("(a.MB_ID = '" + jLoki.User.Status.GmId + "')");

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/MembershipExt.asmx/GetTwmb001RoundAction",
                dataType: 'json',
                type: 'POST',
                data: {
                    conditions: JSON.stringify(conditions)
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    if (data != null && data.TypeMsg > 0) {
                        $('.user_round_action', _configs.form_id).show();
                        if (callback) callback(data.Data);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }



        var initToggleUpdateRoundAction = function (userInfoRoundAction) {

            $('#round_action_status_current_user').attr('data-mb-id', userInfoRoundAction.mb_id);
            if (userInfoRoundAction.round_action_status == 1) {
                $('#round_action_status_current_user').attr('checked', 'checked');
            }
            $('.itoggle_round_action_status').iToggle({
                easing: 'easeOutExpo',
                onSlideOn: function () {
                    var input_id = '#' + $(this).attr('for');
                    var mb_id = $(input_id).attr('data-mb-id');
                    var round_action_status = 1;
                    updateRoundActionStatus(mb_id, round_action_status);
                },
                onSlideOff: function () {
                    var input_id = '#' + $(this).attr('for');
                    var mb_id = $(input_id).attr('data-mb-id');
                    var round_action_status = 0;
                    updateRoundActionStatus(mb_id, round_action_status);
                }
            });
        }


        var updateRoundActionStatus = function (mbId, roundActionStatus) {

            var data_post = {
            };
            data_post.mb_id = mbId;
            data_post.status = roundActionStatus;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: _configs.service_wss_galileo_vietair_tv_url + "/MembershipExt.asmx/UpdateRoundActionStatus",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    renderGridIntlBookingInfoManage();
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


var getInlineCellStatusIntl = function (data) {
    var value = "";
    if (data.STATUS == 2) {
        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/001_57.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;">{1} - <b>{2}</b> - <b>{3}</b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.MB_ID_NICK_NAME, new SS.core.helpers.datetime().formatString(data.UPT_DTM, 'dd/MM/yyyy HH:mm'));
    }
    else if (data.STATUS == 1) {
        if (data.MB_ID_NICK_NAME && data.MB_ID_NICK_NAME.length > 0 && data.MB_ID_NICK_NAME != 'N/A' && data.BOOKING_INFO_LOG_CNT > 0) {
            value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/001_15.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;"><b>{1}</b> - <b>{2}</b> hủy bỏ xử lý</div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.MB_ID_NICK_NAME);
        }
        else {
            value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/001_15.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;"><b>{1}</b> - <b>{2}<b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, 'Khách hàng đặt vé');
        }
    }
    else if (data.STATUS == 3) {
        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/001_18.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;">{1} - <b>{2}</b> - <b>{3}</b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.MB_ID_NICK_NAME, new SS.core.helpers.datetime().formatString(data.UPT_DTM, 'dd/MM/yyyy HH:mm'));
    }
    else if (data.STATUS == 4) {
        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/001_34.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;position:relative;">{1} - <b>{2}</b> - <b style="position:absolute">{3}</b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.MB_ID_NICK_NAME, new SS.core.helpers.datetime().formatString(data.UPT_DTM, 'dd/MM/yyyy HH:mm'));
    }
    else if (data.STATUS == 5) {

        //DINH DANG MDV CHO XUAT

        //kiem tra ngay gio hen xuat > ngay gio hien tai ko?
        var issue_ticket_date = moment(data.ISSUE_TICKET_DATE, 'DD/MM/YYYY HH:mm').toDate();

        //lay ngay gio hien tai    
        var now_date_moment = new moment();
        //lay ngay gio nhac -5 phut    
        var notify_date_moment = now_date_moment.add(-5, 'minutes');
        var notify_date = notify_date_moment.toDate();

        var style_color = '';
        if (notify_date >= issue_ticket_date) {
            style_color = 'color:red';
        }


        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/clock.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;' + style_color + '">{1} - <b>{2}</b> - <b>{3}</b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.ISSUE_TICKET_DATE, data.MB_ID_NICK_NAME);

    }
    else if (data.STATUS == 6) {
        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/payment.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;"><b>{1}</b> - <b>{2}<b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, 'Khách hàng đặt vé');
    }
    else if (data.STATUS == 7) {
        value = '<div style="float:left; padding-right:5px;"><img src="/content/images/icon_booking/payment.png" width="16px" alt="{0}" /></div><div style="padding-top:2px;"><b>{1}</b> - <b>{2}<b></div>'.format(data.STATUS_DESCRIPTION, data.STATUS_DESCRIPTION, data.MB_ID_NICK_NAME);
    }
    else {
        value = data.STATUS_DESCRIPTION;
    }
    return value;
}

var getInlineCellSourceBookingIdStatusIntl = function (data) {
    var html = '';
    if (data.SOURCE_BOOKING_ID == 1 || data.SOURCE_BOOKING_ID == 3) {
        html = '<img src="/Content/images/icon_booking/phone.png" alt="Mobile" />';
    }
    else if (data.SOURCE_BOOKING_ID == 4) {
        html = '<img src="/Content/images/icon_booking/icon-logo-tamvuong.png" alt="TamVuong" />';
    }
    else if (data.SOURCE_BOOKING_ID == 5) {
        html = '<img src="/Content/images/icon_booking/phone.png" alt="Mobile" />';
        html += '<img src="/Content/images/icon_booking/icon-logo-tamvuong.png" alt="TamVuong" />';
    }
    else if (data.SOURCE_BOOKING_ID == 8) {
        html = '<img src="/Content/images/icon_booking/facebook.png" alt="facebook" />';
    }
    else if (data.SOURCE_BOOKING_ID == 9) {
        html = '<img src="/Content/images/icon_booking/phone.png" alt="Mobile" />';
        html = '<img src="/Content/images/icon_booking/facebook.png" alt="facebook" />';
    }
    else if (data.SOURCE_BOOKING_ID == 16 || data.SOURCE_BOOKING_ID == 17) {
        html = '<img src="/Content/images/icon_booking/os_android.png" alt="Android" />';
    }
    else if (data.SOURCE_BOOKING_ID == 32 || data.SOURCE_BOOKING_ID == 33) {
        html = '<img src="/Content/images/icon_booking/apple_logo.png" alt="IOS" />';
    }
    else if (data.SOURCE_BOOKING_ID == 128 || data.SOURCE_BOOKING_ID == 129) {
        html = '<img src="/Content/images/icon_booking/alove.ico" alt="Alove.Vn" />';
    }
    else if (data.SOURCE_BOOKING_ID == 256 || data.SOURCE_BOOKING_ID == 257) {
        html = '<img src="/Content/images/icon_booking/onetour.ico" alt="OneTour.Vn" />';
    }
    return html;
}

var getShortDateTimeStringIntl = function (longDate) {
    if (isEmpty(longDate)) {
        return '';
    }
    var ary_date_str = longDate.split(' ');
    var date = ary_date_str[0];
    var time = ary_date_str[1];
    //------------------------------
    var short_date = date.substr(0, 5);
    var short_time = time.substr(0, 5);
    var short_date_time_str = short_date + " " + short_time;
    return short_date_time_str;
}