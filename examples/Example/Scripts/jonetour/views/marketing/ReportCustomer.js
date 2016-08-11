(function () {

    VA.views.marketing.ReportCustomer = function () {


        var _configs = {
            form_view_customer_info_partial_grid_source: '#formView'
        }

        var current_date = new Date();

        var grid_manage_survey_customer_info_config_01 = null;

        var grid_manage_survey_customer_info_paged_01 = null;

      
        var initGridContext_01 = function () {

            grid_manage_survey_customer_info_config_01 = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid_01',
                grid_selector: '#grid_01',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_manage_survey_customer_info_config_01.data = {
                package_name: 'PK_BD_SURVEY_CUSTOMER_INFO',
                object_name: 'GET_LIST_CUSTOMER_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGrid_01 = function (conditions) {


            if (conditions) {
                grid_manage_survey_customer_info_config_01.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_survey_customer_info_paged_01 = new SS.core.GridPaged();

            grid_manage_survey_customer_info_paged_01.init(grid_manage_survey_customer_info_config_01);

        }

      
        var getQuestion = function (siteId, fromDate, toDate) {


            var data_post = {
            };

            data_post.site_id = siteId;

            data_post.from_date = fromDate;

            data_post.to_date = toDate;

            jwm.Alert.ShowAjaxProcessing("#thong_tin_cau_hoi");

            jQuery.ajax({
                url: "/Marketing/CauHoi",
                dataType: 'html',
                type: 'GET',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing("#thong_tin_cau_hoi");

                    if (resp.length > 0)
                        jwm.Alert.ShowMsg("#thong_tin_cau_hoi", 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');

                    $("#thong_tin_cau_hoi").empty();

                    $("#thong_tin_cau_hoi").html(resp);

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#thong_tin_cau_hoi");
                    jwm.Alert.ShowMsg("#thong_tin_cau_hoi", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

     

        var initControls = function () {

            initGridContext_01();

            $('#FROM_DATE, #TO_DATE').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            var from_date = $.format.date(current_date, 'dd/MM/yyyy');
            $('#FROM_DATE').val(from_date);

            var to_date = $.format.date(current_date, 'dd/MM/yyyy');
            $('#TO_DATE').val(to_date);

            execFilterForm();

           

            jQuery(document).bind('deserializeObjectToFormView', function (e) {

                $(_configs.form_view_customer_info_partial_grid_source).data('data_source', e.objectForm);

                getCustomerInfoPartial(e.formId, e.objectForm);

                $('html, body').animate({
                    scrollTop: $("#formView").offset().top
                }, 100);

            });

            initSearchForm();

            initScrollToTop();
        }



        var getCustomerInfoPartial = function (formId, objectForm) {

            var formBoxId = '#box_' + formId.replace('#', '');

            $(formBoxId).css('display', '');

            jwm.Alert.ShowAjaxProcessing(formBoxId);

            jQuery.ajax({
                url: "/Marketing/DongGopYkienBuoc2",
                dataType: 'html',
                type: 'GET',
                data: {
                    sq_id: objectForm.SQ_ID,
                    site_id: objectForm.SITE_ID
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(formBoxId);

                    if (resp.length > 0)
                        jwm.Alert.ShowMsg(formBoxId, 1, 'Hệ thống lấy dữ liệu thành công', 'VIETAIR-Thông báo');

                    $(formId).empty();

                    $(formId).html(resp);

                    $(document).trigger({
                        type: 'getCustomerInfoPartial',
                        objectForm: objectForm
                    });


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
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var site_id = $('#SITE_ID_SEARCH').val();
            var from_date = $('#FROM_DATE', '#filterForm').val();

            var to_date = $('#TO_DATE', '#filterForm').val();


            conditions.SURVEY_CUSTOMER_INFO = {};
          
            if (isEmpty(site_id) == false) {
                site_id = site_id.trim();

                conditions.SURVEY_CUSTOMER_INFO.SITE_ID = site_id;
            }

            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.SURVEY_CUSTOMER_INFO.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.SURVEY_CUSTOMER_INFO.TO_DATE = to_date;
            }


            grid_manage_survey_customer_info_config_01.data = {
                package_name: 'PK_BD_SURVEY_CUSTOMER_INFO',
                object_name: 'GET_LIST_CUSTOMER_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_survey_customer_info_config_01.page_size
            };


            grid_manage_survey_customer_info_paged_01 = new SS.core.GridPaged();

            grid_manage_survey_customer_info_paged_01.init(grid_manage_survey_customer_info_config_01);

            getQuestion(site_id, from_date, to_date);

            window.location.hash = "option_seaching";

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