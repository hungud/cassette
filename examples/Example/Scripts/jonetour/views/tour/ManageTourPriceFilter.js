(function () {

    VA.views.tour.ManageTourPriceFilter = function () {

        var _configs = {
        }

        var grid_manage_tour_price_filter_configs = null;

        var grid_manage_tour_price_filter_paged = null;

        var initGridManageTourPriceFilter = function () {

            grid_manage_tour_price_filter_configs = {
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


            grid_manage_tour_price_filter_configs.data = {
                package_name: 'PK_BD_TOUR_PRICE_FILTER',
                object_name: 'GET_LIST_TOUR_PRICE_FILTER',
                p_conditions: JSON.stringify(conditions)
            };
        }



        var renderGridManageTourPriceFilter = function (conditions) {

            if (conditions) {
                grid_manage_tour_price_filter_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_tour_price_filter_paged = new SS.core.GridPaged();

            grid_manage_tour_price_filter_paged.init(grid_manage_tour_price_filter_configs);
        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_PRICE_FILTER';

            data_post.object_name = 'INSERT_TOUR_PRICE_FILTER';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_tour_price_filter_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function update() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_PRICE_FILTER';

            data_post.object_name = 'UPDATE_TOUR_PRICE_FILTER';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_tour_price_filter_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initControls = function () {


            initGridManageTourPriceFilter();

            renderGridManageTourPriceFilter();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#TOUR_PRICE_FILTER_ID').val() > "0") {
                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

              

                if (jQuery('#TOUR_PRICE_FILTER_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });


            initSearchForm();

        }

        var execFilterForm = function () {

            var conditions = {
            };

            var type_id = $('#TYPE_ID', '#searchForm').val();
           

            conditions.TOUR_PRICE_FILTER = {};

            if (isEmpty(type_id) == false) {
                type_id = type_id.trim();

                conditions.TOUR_PRICE_FILTER.TYPE_ID = type_id;
            }

          

            grid_manage_tour_price_filter_configs.data = {
                package_name: 'PK_BD_TOUR_PRICE_FILTER',
                object_name: 'GET_LIST_TOUR_PRICE_FILTER',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_tour_price_filter_configs.page_size
            };

            grid_manage_tour_price_filter_paged.init(grid_manage_tour_price_filter_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').click(function () {

                return execFilterForm();

            });

            $('#searchForm').enter(function () {

                return execFilterForm();

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