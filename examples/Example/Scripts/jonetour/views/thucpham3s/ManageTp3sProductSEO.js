(function () {

    VA.views.thucpham3s.ManageTp3sProductSEO = function () {

        var _configs = {
        }


       

        var initControls = function () {

          

            jQuery('#btnAddUpdate').click(function () {
             

                return update();
             
            });


            //tra gia tri ve cho box
            jQuery(document).bind('GET_PRODUCT_DETAIL', function (e) {


                var product_detail = e.productDetail;

                $('#insertUpdate').deserializeObjectAtSelfToFormArgJson(product_detail);

            });


        }

        function update() {

          

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MANAGE_PRODUCT';

            data_post.object_name = 'UPDATE_PRODUCT_SEO';

           
            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    //if (resp.TypeMsg > 0) {
                    //    grid_manage_trademark_product_paged.renderGrid();

                    //}
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
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

