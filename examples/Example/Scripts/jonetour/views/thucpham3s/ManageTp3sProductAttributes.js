(function () {

    VA.views.thucpham3s.ManageTp3sProductAttributes = function () {

        var _configs = {
        }

        var grid_product_attribute_configs = null;

        var grid_product_attribute_paged = null;

        var initGridProductAttribute = function () {

            grid_product_attribute_configs = {
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

            grid_product_attribute_configs.data = {
                package_name: 'PK_BD_PRODUCT_ATTRIBUTES',
                object_name: 'GET_LIST_PRODUCT_ATTRIBUTES',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function initRefProductIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_product_id = context.getQueryString('ref_product_id');

            $('#REF_PRODUCT_ID').val(ref_product_id);

        }



        function setGridConfigFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_product_id = context.getQueryString('ref_product_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }

            var conditions = {
            };

            conditions.PRODUCT_ATTRIBUTES = {};

            if (isEmpty(ref_product_id) == false) {
                ref_product_id = ref_product_id.trim();
                conditions.PRODUCT_ATTRIBUTES.REF_PRODUCT_ID = ref_product_id;
            }

            grid_product_attribute_configs.data = {
                package_name: 'PK_BD_PRODUCT_ATTRIBUTES',
                object_name: 'GET_LIST_PRODUCT_ATTRIBUTES',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_product_attribute_configs.page_size
            };
        }



        var renderGridProductAttribute = function (conditions) {

            if (conditions) {
                grid_product_attribute_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_product_attribute_paged = new SS.core.GridPaged();

            grid_product_attribute_paged.init(grid_product_attribute_configs);
        }


        var initControls = function () {

            initRefProductIdFromQueryString();

            initGridProductAttribute();

            setGridConfigFromQueryString();

            renderGridProductAttribute();

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


                    $('#REF_PRODUCT_ATTR_OPT_ID').val(e.objectForm.REF_PRODUCT_ATTR_OPT_ID);
                    $('#REF_PRODUCT_ATTR_OPT_ID').trigger("chosen:updated");

                }

            });


            initInputChosen();

            initProductAttributes();

        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PRODUCT_ATTRIBUTES';

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
                        $('#SQ_ID').val(resp.Data.SQ_ID);

                        grid_product_attribute_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_PRODUCT_ATTRIBUTES';

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
                        grid_product_attribute_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        var initInputChosen = function () {

           
            $('#REF_PRODUCT_ATTR_OPT_ID').chosen({
                no_results_text: "Không tìm thấy kết quả nào!",
                search_contains: true,
                allow_single_deselect: true,
                max_selected_options: 1 // chỉ chọn 1 giá trị trong chosen

            });

        }


        var initProductAttributes= function () {

            var data_post = {};

            data_post.PACKAGE_NAME = 'PK_BD_PRODUCT_ATTRIBUTES';

            data_post.OBJECT_NAME = 'GET_LIST_ATTRIBUTES';

            //data_post.P_ROW_START = 0;

            //data_post.P_ROW_END = 999999999;

            data_post.P_CONDITIONS = JSON.stringify({

            });


            jQuery.ajax({

                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                async: false,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        $('#REF_PRODUCT_ATTR_OPT_ID').empty();

                        //jQuery('#REF_PRODUCT_ATTR_OPT_ID').html('<option value="">-- [ Chọn thông số sản phẩm ] --</option>');

                        $('#tmp_list_product_attribute').tmpl(resp.Data.CURSOR_DATA).appendTo("#REF_PRODUCT_ATTR_OPT_ID");

                        $('#REF_PRODUCT_ATTR_OPT_ID').trigger("chosen:updated");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#insertUpdate", true);
                    jwm.Alert.ShowMsg("#insertUpdate", -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


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

