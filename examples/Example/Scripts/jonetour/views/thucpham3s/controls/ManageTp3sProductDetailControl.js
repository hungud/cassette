(function () {

    VA.views.thucpham3s.ManageTp3sProductDetailControl = function () {

        var _configs = {
        }


        function initRefProductIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_product_id = context.getQueryString('ref_product_id');

            $('#PRODUCT_DETAIL_CONTROL_REF_PRODUCT_ID').val(ref_product_id);

        }


       

        var initControls = function () {

           initRefProductIdFromQueryString();

            getProductDetail();
        }



        function getProductDetail() {

            var data_post = {};

            var sq_id = $('#PRODUCT_DETAIL_CONTROL_REF_PRODUCT_ID').val()

            data_post.PACKAGE_NAME = 'PK_BD_MANAGE_PRODUCT';

            data_post.OBJECT_NAME = 'GET_PRODUCT_DETAIL';

            data_post.P_CONDITIONS = JSON.stringify({
                PRODUCT: {
                    SQ_ID: sq_id
                }
            });

            jwm.Alert.ShowAjaxProcessing('#product_detail_summary');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#product_detail_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0 && resp.Data.CURSOR_DATA.length > 0) {

                        var product_detail = resp.Data.CURSOR_DATA[0];


                        $('#tmp_product_detail').tmpl(product_detail).appendTo('#product_detail_summary');


                        //tra gia tri ve cho box su dung trigger
                        jQuery(document).trigger({
                            type: 'GET_PRODUCT_DETAIL',
                            productDetail: product_detail
                        });

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#product_detail_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
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