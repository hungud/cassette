(function () {

    VA.views.marketing.ManageSurveyCustomerInfo = function () {


        var _configs = {
            form_view_customer_info_partial_grid_source: '#formView'
        }

        var current_date = new Date();

        var grid_manage_survey_customer_info_config = null;

        var grid_manage_survey_customer_info_paged = null;

        var initGridContext = function () {

            grid_manage_survey_customer_info_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_manage_survey_customer_info_config.data = {
                package_name: 'PK_BD_SURVEY_CUSTOMER_INFO',
                object_name: 'GET_LIST_CUSTOMER_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGrid = function (conditions) {


            if (conditions) {
                grid_manage_survey_customer_info_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_survey_customer_info_paged = new SS.core.GridPaged();

            grid_manage_survey_customer_info_paged.init(grid_manage_survey_customer_info_config);

        }


        var initControls = function () {

            initGridContext();

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


            grid_manage_survey_customer_info_config.data = {
                package_name: 'PK_BD_SURVEY_CUSTOMER_INFO',
                object_name: 'GET_LIST_CUSTOMER_INFO',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_survey_customer_info_config.page_size
            };


            grid_manage_survey_customer_info_paged = new SS.core.GridPaged();

            grid_manage_survey_customer_info_paged.init(grid_manage_survey_customer_info_config);

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