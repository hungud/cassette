(function () {

    VA.views.thucpham3s.ManageTp3sPictureProduct = function () {

        var _configs = {
        }

        var grid_manage_tp3s_product_image_configs = null;

        var grid_manage_tp3s_product_image_paged = null;

        var initGridManageTp3sProductImage = function () {

            grid_manage_tp3s_product_image_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                is_call_package: true,
                page_size: 5,
                row_start: 0,
                row_end: 5
            };

            var conditions = {

            };

            grid_manage_tp3s_product_image_configs.data = {
                package_name: 'PK_BD_MANAGE_IMAGE_PRODUCT',
                object_name: 'GET_LIST_MANAGE_IMAGE_PRODUCT',
                p_conditions: JSON.stringify(conditions)
            };
        }


        function initRefProductIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_product_id = context.getQueryString('ref_product_id');

           // alert(ref_product_id);

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

            conditions.PRODUCT_PICTURE_MAPPING = {};

            if (isEmpty(ref_product_id) == false) {
                ref_product_id = ref_product_id.trim();
                conditions.PRODUCT_PICTURE_MAPPING.REF_PRODUCT_ID = ref_product_id;
            }

            grid_manage_tp3s_product_image_configs.data = {
                package_name: 'PK_BD_MANAGE_IMAGE_PRODUCT',
                object_name: 'GET_LIST_MANAGE_IMAGE_PRODUCT',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_tp3s_product_image_configs.page_size
            };
        }


        function addImage() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MANAGE_IMAGE_PRODUCT';

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
                      //  $('#btnAddUpdate').val('Cập nhật');
                        grid_manage_tp3s_product_image_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function UpdateImage() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MANAGE_IMAGE_PRODUCT';

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
                    if (resp.TypeMsg > 0)
                        grid_manage_tp3s_product_image_paged.renderGrid();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initControls = function () {

            initRefProductIdFromQueryString();

            initGridManageTp3sProductImage();

            setGridConfigFromQueryString();

            renderGridManageTp3sProductImage();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery('#SQ_ID').val() != "0")
                    return UpdateImage();
                else
                    return addImage();
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                setImageThumb(e.objectForm.IMAGE_PATH);

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                }
            });


            
        }



     

        var renderGridManageTp3sProductImage = function (conditions) {

            if (conditions) {
                grid_manage_tp3s_product_image_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_tp3s_product_image_paged = new SS.core.GridPaged();

            grid_manage_tp3s_product_image_paged.init(grid_manage_tp3s_product_image_configs);
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