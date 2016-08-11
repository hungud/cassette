(function () {

    VA.views.airline.bookingInfo = function () {

        var _configs = {
        }

        //--------------------------------------------------
        //to do
        var getGroupInfoPolicyCtm001 = function () {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                dataType: "json",
                type: 'POST',
                data: {
                    PACKAGE_NAME: 'PK_BD_CUSTOMER_BOOKING_INFO',

                    OBJECT_NAME: 'GET_DOMESTIC_GP_IF_CTM_001',

                    P_ORDER_ID: _configs.booking_info.order_id
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {
                        
                        $('#booking_info_ctm_group_name').html(resp.Data.CURSOR_DATA[0].CTM_GROUP_NAME);

                        var init_flight_count_str = numeral(resp.Data.CURSOR_DATA[0].INIT_FLIGHT_COUNT).format('0,0');
                        var domestic_flight_count_str = numeral(resp.Data.CURSOR_DATA[0].DOMESTIC_FLIGHT_COUNT).format('0,0');
                        var intl_flight_count_str = numeral(resp.Data.CURSOR_DATA[0].INTL_FLIGHT_COUNT).format('0,0');

                        $('#init_flight_count').html(init_flight_count_str);
                        $('#domestic_flight_count').html(domestic_flight_count_str);
                        $('#intl_flight_count').html(intl_flight_count_str);
                       

                    }
                },
                error: function (http, message, exc) {
                }
            });

        }

        //--------------------------------------------------

        var initControls = function () {
            
            setTimeout(function () {

                getGroupInfoPolicyCtm001();

            }, 100);

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