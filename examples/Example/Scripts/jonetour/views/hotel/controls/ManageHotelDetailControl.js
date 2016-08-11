(function () {

    VA.views.hotels.ManageHotelDetailControl = function () {

        var _configs = {
        }


        function initRefHotelIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_hotel_id = context.getQueryString('ref_hotel_id');

            $('#HOTEL_DETAIL_CONTROL').val(ref_hotel_id);

        }


       

        var initControls = function () {

            initRefHotelIdFromQueryString();

            getHotelDetail();
        }



        function getHotelDetail() {

            var data_post = {};

            var sq_id = $('#HOTEL_DETAIL_CONTROL').val();

            data_post.PACKAGE_NAME = 'PK_BD_HOTEL_INFO';

            data_post.OBJECT_NAME = 'GET_HOTEL_DETAIL';

            data_post.P_CONDITIONS = JSON.stringify({
                HOTEL_INFO: {
                    SQ_ID: sq_id
                }
            });

            jwm.Alert.ShowAjaxProcessing('#hotel_detail_summary');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#hotel_detail_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0 && resp.Data.CURSOR_DATA.length > 0) {

                        var hotel_detail = resp.Data.CURSOR_DATA[0];


                        $('#tmp_hotel_detail').tmpl(hotel_detail).appendTo('#hotel_detail_summary');


                        //tra gia tri ve cho box su dung trigger
                        //jQuery(document).trigger({
                        //    type: 'GET_PRODUCT_DETAIL',
                        //    productDetail: product_detail
                        //});

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#hotel_detail_summary');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
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