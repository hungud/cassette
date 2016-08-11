(function () {

    VA.views.flightCustomerInternational.flightBookingIntlCustomerCare = function () {

        var _configs = {
        }

        //--------------------------------------------------
        //to do
        var grid_flight_booking_intl_ctm_care_configs = null;

        var grid_flight_booking_intl_ctm_care_paged = null;

        var initGridFlightBookingIntl = function () {

            grid_flight_booking_intl_ctm_care_configs = {
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

            grid_flight_booking_intl_ctm_care_configs.data = {
                package_name: 'PK_BD_FLIGHT_INTL_CTM_CARE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions)
            };
        }


        var renderGridFlightBookingIntlCtmCare = function (conditions) {

            if (conditions) {
                grid_flight_booking_intl_ctm_care_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_booking_intl_ctm_care_paged = new SS.core.GridPaged();

            grid_flight_booking_intl_ctm_care_paged.init(grid_flight_booking_intl_ctm_care_configs);
        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }


        var initFlightBookingIntlCTMCareControl = function () {
            setBookingControlUpdate(false);

            $('#btn_cl_wi1').click(function () {
                $('#envato-widget-switcher-wrap').css('display', 'none');
            });


        }

        var execFilterForm = function () {

            var departure_date = $('#DEPARTURE_DATE', '#filterForm').val();

            var order_id = $('#ORDER_ID', '#filterForm').val();

            var mb_id = $('#MB_ID_Search', '#filterForm').val();

            var conditions = {
            };

            conditions.BOOKING_INFO = {};

            if (isEmpty(departure_date) == false) {

                departure_date = departure_date.trim();

                conditions.BOOKING_INFO.DEPARTURE_DATE = departure_date;



            }

            if (isEmpty(order_id) == false) {

                order_id = order_id.trim();

                conditions.BOOKING_INFO.ORDER_ID = order_id;



            }

            if (isEmpty(mb_id) == false) {

                mb_id = mb_id.trim();

                conditions.BOOKING_INFO.MB_ID = mb_id;


            }

            grid_flight_booking_intl_ctm_care_configs.data = {
                package_name: 'PK_BD_FLIGHT_INTL_CTM_CARE',
                object_name: 'GET_LIST_BOOKING_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_flight_booking_intl_ctm_care_configs.page_size
            };

            grid_flight_booking_intl_ctm_care_paged.init(grid_flight_booking_intl_ctm_care_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        var initFilterForm = function () {

            $('#filterForm').enter(function () {

                return execFilterForm();


            });


            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });


        }
        //init Date

        var initOptionFilterForm = function () {


            //nhan vien xu ly -> fill data
            var data_post = {};

            data_post.package_name = "PK_BD_FLIGHT_INTL_CTM_CARE";

            data_post.object_name = "GET_LIST_TICKETING";

            jwm.Alert.ShowAjaxProcessing('#content_Mb_Id');

            // console.log(data_post);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                dataType: "jsonp",
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#content_Mb_Id');

                    var data_list = {
                    }
                    // console.log(resp);
                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_MbId').data('data_source', data_list);

                    jQuery('#MB_ID_Search').html('<option value="">---Chọn nhân viên---</option>');

                    jQuery('#tmp_MbId').tmpl(data_list).appendTo('#MB_ID_Search');
                },
                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing('#content_Mb_Id');

                    jwm.Alert.ShowMsg('#content_Mb_Id', -1, message + " " + exc, 'Thông báo');
                }
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


        var initControls = function () {

            initGridFlightBookingIntl();
            
            renderGridFlightBookingIntlCtmCare();


            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                setFlightBookingIntlCTMCareControl(e.objectForm);

                getBookingInfoPartial(e.formId, e.objectForm);

                //dung cho sms
                $('#formView').data('data_source', e.objectForm);

            });

            initFilterForm();

             initViewBookingIntlCTMCareAction();

             initFlightBookingIntlCTMCareControl();

             initScrollToTop();

             initOptionFilterForm();

             $('#DEPARTURE_DATE', '#filterForm').datepick({
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

        //lay id va tao popup

        var setFlightBookingIntlCTMCareControl = function (objectForm) {

            var object_form = objectForm;

            setBookingControlUpdate(true);

            $('.order_id_inner').html('QT' + object_form.ORDER_ID);

            $('#widget-booking-control-update').empty();

            $('#tmp_support_list_booking_update').tmpl(object_form).appendTo('#widget-booking-control-update');

            jQuery('a[data-booking-status]').unbind('click');


            jQuery('a[data-booking-status]').click(function () {


                var booking_status = $(this).attr('data-booking-status');

                

                if (booking_status == 2) {
                    var config_popup = {
                        file_url: '/html/popup/FlightBookingIntlCTMCare/FlightBookingIntlCTMCare.html',
                        args: {
                            Title: 'Trạng thái',
                            order_id: object_form.ORDER_ID,
                            journey_back: object_form.JOURNEY_BACK,
                            journey_go: object_form.JOURNEY_GO,
                            journey_go_id: object_form.JOURNEY_GO_ID,
                            journey_back_id: object_form.JOURNEY_BACK_ID,
                            FunctionCallBack: updateBookingIntlCTMCare
                        }
                    };

                    var popup_file = new SS.core.helpers.PopupFileHtml();

                    popup_file.init(config_popup);

                    return;
                }

            });

        }

//cap nhat vao luoi

        var updateBookingIntlCTMCare = function (args) {


            var data_post = {};

            data_post.ref_booking_info_id = args.order_id;

            data_post.mb_id = $('#MB_ID').val();

            data_post.status = args.ObjectFormInput.status_journey;

            data_post.ref_travel_info_id = args.ObjectFormInput.journey_id;

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = "PK_BD_BCTM_INTL_CARE_ACTION";

            data_post.object_name = "INSERT_BOOKING_CTM_CARE_ACTION";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    //goi ajax thong bao thanh cong
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        renderGridFlightBookingIntlCtmCare();

                        //kiem tra function co ton tai hay khong
                        if (window['renderGridBookingIntlCtmCareAction']) {
                            renderGridBookingIntlCtmCareAction();
                        }

                        setBookingControlUpdate(false);

                        $('html, body').animate({
                            scrollTop: $("#flightBookingIntlContext").offset().top
                        }, 100);
                  

                        //close popup
                        $.unblockUI2();
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;


        }
        //khoi tao button
        var setBookingControlUpdate = function (show) {
            if (show == true) {
                jQuery('#btnUpdateBooking').css('opacity', '1');
                jQuery('#btnUpdateBooking').hover(function () {
                    $('#envato-widget-switcher-wrap').css('display', 'block');

                });

            }
            else {
                $('#envato-widget-switcher-wrap').css('display', 'none');
                jQuery('#btnUpdateBooking').css('opacity', '0.2');
                jQuery('#btnUpdateBooking').unbind('hover');
            }
        }

        //--------------------------------------------------

       
        //------------------------------------------
        //view log 

        //su kien click lay id va dua ra luoi
        var initViewBookingIntlCTMCareAction = function () {

            var ref_booking_info_id = $(this).attr('data-view-log-ref-booking-info-id');


            jQuery(document).on('click', 'a[data-view-log-ref-booking-info-id]', function () {

                var ref_booking_info_id = $(this).attr('data-view-log-ref-booking-info-id');

                viewBookingIntlCTMCare(ref_booking_info_id);

                return false;


            });
           

            }

        //dua ra grid 

        var viewBookingIntlCTMCare = function (refBookingInfoId) {

         
            var data_post = {
            };

            data_post.ref_booking_info_id = refBookingInfoId;

            
            jwm.Alert.ShowAjaxProcessing('#viewFlightBookingIntlCtmCare');
    
            jQuery.ajax({
                url: "/FlightCustomerInternational/ViewBookingIntlCTMCareAction",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    
                    jwm.Alert.HideAjaxProcessing('#viewFlightBookingIntlCtmCare');
                    $('#viewFlightBookingIntlCtmCare').empty();
                    $('#viewFlightBookingIntlCtmCare').html(data);
                    $('#viewFlightBookingIntlCtmCare').show();

                    $('html, body').animate({
                        scrollTop: $("#viewFlightBookingIntlCtmCare").offset().top
                    }, 100);

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#viewFlightBookingIntlCtmCare');
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        //-------------------------------------
        //lay thong tin Booking

        function getBookingInfoPartial(formId, objectForm) {

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



        //khoi tao tab

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




        //----------------------------------------------------------
        // Module Sms Brand Name
        var getSmsBrandNameModulePartial = function (objectForm) {

            var formBoxId = '#formView';

            jwm.Alert.ShowAjaxProcessing(formBoxId);

           // console.log(objectForm);

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

       

        return ({

            "init": init

        });

    };

}());