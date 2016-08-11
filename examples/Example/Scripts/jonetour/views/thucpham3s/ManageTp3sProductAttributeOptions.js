(function () {

    VA.views.thucpham3s.ManageTp3sProductAttributeOptions = function () {

        var _configs = {
        }

        var grid_manage_product_attribute_options_configs = null;

        var grid_manage_product_attribute_options_paged = null;

        var initGridManageProductAttributeOptions = function () {

            grid_manage_product_attribute_options_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_product_attribute_options_configs.data = {
                package_name: 'PK_BD_PRODUCT_ATTR_OPTIONS',
                object_name: 'GET_LIST_PRODUCT_ATTR_OPTIONS',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGridManageProductAttributeOptions = function (conditions) {

            if (conditions) {
                grid_manage_product_attribute_options_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_product_attribute_options_paged = new SS.core.GridPaged();

            grid_manage_product_attribute_options_paged.init(grid_manage_product_attribute_options_configs);
        }


        var initControls = function () {

            initGridManageProductAttributeOptions();

            renderGridManageProductAttributeOptions();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
               
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

             
                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddUpdate').val('Cập nhật');
                   jQuery(document).trigger('deserializeObjectToFormUpdate');
                }

           

            });

          //  initSearchForm();

        }


        function add() {

         
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

         
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PRODUCT_ATTR_OPTIONS';

            data_post.object_name = 'INSERT_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_product_attribute_options_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_PRODUCT_ATTR_OPTIONS';

            data_post.object_name = 'UPDATE_ROW';

          

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_product_attribute_options_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
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



        //var execFilterForm = function () {

        //    var conditions = {
        //    };


        //    conditions.MANUFACTURER = {};


        //    var manufacturer_name = $('#MANUFACTURER_NAME_SEARCH').val();

        //    if (isEmpty(manufacturer_name) == false) {
        //        manufacturer_name = manufacturer_name.trim();

        //        conditions.MANUFACTURER.NAME = manufacturer_name;
        //    }


        //    grid_manage_product_attribute_options_configs.data = {
        //        package_name: 'PK_BD_PRODUCT_ATTR_OPTIONS',
        //        object_name: 'GET_LIST_PRODUCT_ATTR_OPTIONS',
        //        p_conditions: JSON.stringify(conditions),
        //        row_start: 0,
        //        row_end: grid_manage_product_attribute_options_configs.page_size
        //    };


        //    grid_manage_product_attribute_options_paged = new SS.core.GridPaged();

        //    grid_manage_product_attribute_options_paged.init(grid_manage_product_attribute_options_configs);

        //    window.location.hash = "option_seaching";

        //    return false;
        //}
        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();

        }

        return ({

            "init": init

        });

    };

}());
