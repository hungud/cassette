(function () {

    VA.views.tour.ManageFeatureFilter = function () {

        var _configs = {
        }

        var grid_manage_feature_filter_configs = null;

        var grid_manage_feature_filter_paged = null;

        var initGridManageFeatureFilter= function () {

            grid_manage_feature_filter_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };

            var conditions = {

            };
          

            grid_manage_feature_filter_configs.data = {
                package_name: 'PK_BD_TOUR_FEATURE_FILTER',
                object_name: 'GET_LIST_TOUR_FEATURE_FILTER',
                p_conditions: JSON.stringify(conditions)
            };
        }

        var initControls = function () {

            initGridManageFeatureFilter();

            renderGridManageFeatureFilter();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#FEATURE_FILTER_ID').val() > "0") {
                    return updateFeatureFilter();
                }
                else {

                    return addFeatureFilter();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                setImageThumb(e.objectForm.IMAGE);

                if (jQuery('#FEATURE_FILTER_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }

                CKEDITOR.instances.CONTENT.setData(e.objectForm.CONTENT);
            });

            setLinkSEO();
             
            initSearchForm();
        }


        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').click(function () {

                return execFilterForm();

            });

            $('#searchForm').enter(function () {

                return execFilterForm();

            });
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var type_id = $('#TYPE_ID', '#searchForm').val();
            var feature_en = $('#FEATURE_EN', '#searchForm').val();

            conditions.FEATURE_FILTER = {};

            if (isEmpty(type_id) == false) {
                type_id = type_id.trim();

                conditions.FEATURE_FILTER.TYPE_ID = type_id;
            }

            if (isEmpty(feature_en) == false) {
                feature_en = feature_en.trim();

                conditions.FEATURE_FILTER.FEATURE_EN = feature_en;
            }

            grid_manage_feature_filter_configs.data = {
                package_name: 'PK_BD_TOUR_FEATURE_FILTER',
                object_name: 'GET_LIST_TOUR_FEATURE_FILTER',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_feature_filter_configs.page_size
            };

            grid_manage_feature_filter_paged.init(grid_manage_feature_filter_configs);

            window.location.hash = "option_seaching";

            return false;
        }


        function addFeatureFilter() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_FEATURE_FILTER';

            data_post.object_name = 'INSERT_FEATURE_FILTER';

            data_post.objects_decode_url = 'P_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_feature_filter_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function updateFeatureFilter() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_FEATURE_FILTER';

            data_post.object_name = 'UPDATE_FEATURE_FILTER';

            data_post.objects_decode_url = 'P_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_feature_filter_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }


        var renderGridManageFeatureFilter = function (conditions) {

            if (conditions) {
                grid_manage_feature_filter_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_feature_filter_paged = new SS.core.GridPaged();

            grid_manage_feature_filter_paged.init(grid_manage_feature_filter_configs);
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