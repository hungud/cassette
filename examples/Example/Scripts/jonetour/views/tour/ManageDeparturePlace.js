(function () {

    VA.views.tour.ManageDeparturePlace = function () {

        var _configs = {
        }

        var grid_manage_departure_place_configs = null;

        var grid_manage_departure_place_paged = null;

        var initGridManageDeparturePlace = function () {

            grid_manage_departure_place_configs = {
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


            grid_manage_departure_place_configs.data = {
                package_name: 'PK_BD_TOUR_DEPT_PLACES',
                object_name: 'GET_LIST_TOUR_DEPT_PLACES',
                p_conditions: JSON.stringify(conditions)
            };
        }



        var renderGridManageDeparturePlace = function (conditions) {

            if (conditions) {
                grid_manage_departure_place_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_departure_place_paged = new SS.core.GridPaged();

            grid_manage_departure_place_paged.init(grid_manage_departure_place_configs);
        }



        var initControls = function () {
            

            initGridManageDeparturePlace();

            renderGridManageDeparturePlace();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#DEPARTURE_PLACE_ID').val() > "0") {
                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                setImageThumb(e.objectForm.IMAGE);

                if (jQuery('#DEPARTURE_PLACE_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });

            initSearchForm();
            setLinkSEO();
        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_DEPT_PLACES';

            data_post.object_name = 'INSERT_TOUR_DEPT_PLACES';

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

                        grid_manage_departure_place_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_TOUR_DEPT_PLACES';

            data_post.object_name = 'UPDATE_TOUR_DEPT_PLACES';

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
                        grid_manage_departure_place_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }





        var execFilterForm = function () {

            var conditions = {
            };

            var type_id = $('#TYPE_ID_SEARCH', '#searchForm').val();
            var departure_place_en = $('#DEPARTURE_PLACE_EN', '#searchForm').val();

            conditions.DEPARTURE_PLACES = {};

            if (isEmpty(type_id) == false) {
                type_id = type_id.trim();

                conditions.DEPARTURE_PLACES.TYPE_ID = type_id;
            }

            if (isEmpty(departure_place_en) == false) {
                departure_place_en = departure_place_en.trim();

                conditions.DEPARTURE_PLACES.DEPARTURE_PLACE_EN = departure_place_en;
            }

            grid_manage_departure_place_configs.data = {
                package_name: 'PK_BD_TOUR_DEPT_PLACES',
                object_name: 'GET_LIST_TOUR_DEPT_PLACES',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_departure_place_configs.page_size
            };

            grid_manage_departure_place_paged.init(grid_manage_departure_place_configs);

            window.location.hash = "option_seaching";

            return false;
        }


        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
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