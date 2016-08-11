(function () {

    VA.views.flightCustomer.ManagePolicyCustomer004 = function () {


        var _configs = {
        }

        var grid_flight_customer_004_configs = null;

        var grid_flight_customer_004_paged = null;

        var initGridFlightCustomer004 = function () {

            grid_flight_customer_004_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_004_configs.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_004',
                object_name: 'GET_LIST_POLICY_CUSTOMER_004',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function add() {


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            //--------------------------------------------------       

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = "PK_BD_FS_POLICY_CUSTOMER_004";

            data_post.object_name = "INSERT_POLICY_CUSTOMER_004";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        renderGridFlightCustomer004();
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

            //--------------------------------------------------       

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = "PK_BD_FS_POLICY_CUSTOMER_004";

            data_post.object_name = "UPDATE_POLICY_CUSTOMER_004";

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        renderGridFlightCustomer004();
                        viewManageFlightCustomer004(data_post.P_SQ_ID);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewManageFlightCustomer004(sq_id);
                return false;
            });
        }

        var viewManageFlightCustomer004 = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/FlightCustomer/ViewManagePolicyCustomerLog004",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanageflightcustomer004log').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        var renderGridFlightCustomer004 = function (conditions) {

            if (conditions) {
                grid_flight_customer_004_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_004_paged = new SS.core.GridPaged();

            grid_flight_customer_004_paged.init(grid_flight_customer_004_configs);
        }




        var initControls = function () {

            initGridFlightCustomer004();

            renderGridFlightCustomer004();

            initInsertUpdateForm();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });


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