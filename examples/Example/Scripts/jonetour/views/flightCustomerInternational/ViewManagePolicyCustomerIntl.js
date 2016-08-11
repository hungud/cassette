(function () {

    VA.views.flightCustomerInternational.ViewManagePolicyCustomerIntl = function () {

        var _configs = {
        }

        var grid_flight_customer_intl_configs_001 = null;

        var grid_flight_customer_intl_paged_001 = null;

        var grid_flight_customer_intl_configs_002 = null;

        var grid_flight_customer_intl_paged_002 = null;

        var grid_paged_policy_customer_intl_001 = null;

        var initGridFlightCustomerIntl001 = function () {

            grid_flight_customer_intl_configs_001 = {
                tmp_paged_selector: '#tmp_policy_customer_intl',
                paged_selector: '#grid_paged_policy_customer_intl_001',
                tmp_grid_selector: '#tmp_grid_001',
                grid_selector: '#grid_policy_customer_intl_001',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_intl_configs_001.data = {
                package_name: 'PK_BD_FS_POLICY_CTM_INTL_001',
                object_name: 'GET_LIST_POLICY_CTM_INTL_001',
                p_conditions: JSON.stringify(conditions)
            };

        }

   
        var initGridFlightCustomerIntl002 = function () {

            grid_flight_customer_intl_configs_002 = {
                tmp_paged_selector: '#tmp_policy_customer_intl',
                paged_selector: '#grid_paged_policy_customer_intl_002',
                tmp_grid_selector: '#tmp_grid_002',
                grid_selector: '#grid_policy_customer_intl_002',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_intl_configs_002.data = {
                package_name: 'PK_BD_FS_POLICY_CTM_INTL_002',
                object_name: 'GET_LIST_POLICY_CTM_INTL_002',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridFlightCustomerIntl001 = function (conditions) {

            if (conditions) {
                grid_flight_customer_intl_configs_001.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_intl_paged_001 = new SS.core.GridPaged();

            grid_flight_customer_intl_paged_001.init(grid_flight_customer_intl_configs_001);
        }

        var renderGridFlightCustomerIntl002 = function (conditions) {

            if (conditions) {
                grid_flight_customer_intl_configs_002.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_intl_paged_002 = new SS.core.GridPaged();

            grid_flight_customer_intl_paged_002.init(grid_flight_customer_intl_configs_002);
        }

        view_policy_customer_intl_001 = function () {

            window.open('/FlightCustomerInternational/ManagePolicyCustomerIntl001', '_blank');

        }

        view_policy_customer_intl_002 = function () {

            window.open('/FlightCustomerInternational/ManagePolicyCustomerIntl002', '_blank');

        }


        var initControls = function () {

            initGridFlightCustomerIntl001();

            initGridFlightCustomerIntl002();

            renderGridFlightCustomerIntl001();

            renderGridFlightCustomerIntl002();

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