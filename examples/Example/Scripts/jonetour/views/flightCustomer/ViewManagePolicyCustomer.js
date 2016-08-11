(function () {

    VA.views.flightCustomer.ViewManagePolicyCustomer = function () {

        var _configs = {
        }

        var grid_flight_customer_configs_001 = null;

        var grid_flight_customer_paged_001 = null;

        var grid_flight_customer_configs_002 = null;

        var grid_flight_customer_paged_002 = null;

        var grid_flight_customer_configs_003 = null;

        var grid_flight_customer_paged_003 = null;

        var grid_flight_customer_configs_004 = null;

        var grid_flight_customer_paged_004 = null;

        var grid_flight_customer_configs_005 = null;

        var grid_flight_customer_paged_005= null;

        var initGridFlightCustomer001 = function () {

            grid_flight_customer_configs_001 = {
                tmp_paged_selector: '#tmp_policy_customer',
                paged_selector: '#grid_paged_policy_customer_001',
                tmp_grid_selector: '#tmp_grid_001',
                grid_selector: '#grid_policy_customer_001',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_configs_001.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_001',
                object_name: 'GET_LIST_POLICY_CUSTOMER_001',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initGridFlightCustomer002 = function () {

            grid_flight_customer_configs_002 = {
                tmp_paged_selector: '#tmp_policy_customer',
                paged_selector: '#grid_paged_policy_customer_002',
                tmp_grid_selector: '#tmp_grid_002',
                grid_selector: '#grid_policy_customer_002',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_configs_002.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_002',
                object_name: 'GET_LIST_POLICY_CUSTOMER_002',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initGridFlightCustomer003 = function () {

            grid_flight_customer_configs_003 = {
                tmp_paged_selector: '#tmp_policy_customer',
                paged_selector: '#grid_paged_policy_customer_003',
                tmp_grid_selector: '#tmp_grid_003',
                grid_selector: '#grid_policy_customer_003',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_configs_003.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_003',
                object_name: 'GET_LIST_POLICY_CUSTOMER_003',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initGridFlightCustomer004 = function () {

            grid_flight_customer_configs_004 = {
                tmp_paged_selector: '#tmp_policy_customer',
                paged_selector: '#grid_paged_policy_customer_004',
                tmp_grid_selector: '#tmp_grid_004',
                grid_selector: '#grid_policy_customer_004',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_configs_004.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_004',
                object_name: 'GET_LIST_POLICY_CUSTOMER_004',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var initGridFlightCustomer005 = function () {

            grid_flight_customer_configs_005 = {
                tmp_paged_selector: '#tmp_policy_customer',
                paged_selector: '#grid_paged_policy_customer_005',
                tmp_grid_selector: '#tmp_grid_005',
                grid_selector: '#grid_policy_customer_005',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_flight_customer_configs_005.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_005',
                object_name: 'GET_LIST_POLICY_CUSTOMER_005',
                p_conditions: JSON.stringify(conditions)
            };

        }




        var renderGridFlightCustomer001 = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs_001.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged_001 = new SS.core.GridPaged();

            grid_flight_customer_paged_001.init(grid_flight_customer_configs_001);
        }

        var renderGridFlightCustomer002 = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs_002.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged_002 = new SS.core.GridPaged();

            grid_flight_customer_paged_002.init(grid_flight_customer_configs_002);
        }

        var renderGridFlightCustomer003 = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs_003.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged_003 = new SS.core.GridPaged();

            grid_flight_customer_paged_003.init(grid_flight_customer_configs_003);
        }

        var renderGridFlightCustomer004 = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs_004.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged_004 = new SS.core.GridPaged();

            grid_flight_customer_paged_004.init(grid_flight_customer_configs_004);
        }

        var renderGridFlightCustomer005 = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs_005.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged_005 = new SS.core.GridPaged();

            grid_flight_customer_paged_005.init(grid_flight_customer_configs_005);
        }



        view_policy_customer_001 = function () {

            window.open('/FlightCustomer/ManagePolicyCustomer', '_blank');

        }

        view_policy_customer_002 = function () {

            window.open('/FlightCustomer/ManagePolicyCustomer002', '_blank');

        }

        view_policy_customer_003 = function () {

            window.open('/FlightCustomer/ManagePolicyCustomer003', '_blank');

        }

        view_policy_customer_004 = function () {

            window.open('/FlightCustomer/ManagePolicyCustomer004', '_blank');

        }

        view_policy_customer_005 = function () {

            window.open('/FlightCustomer/ManagePolicyCustomer005', '_blank');

        }


        var initControls = function () {

            initGridFlightCustomer001();

            initGridFlightCustomer002();

            initGridFlightCustomer003();

            initGridFlightCustomer004();

            initGridFlightCustomer005();

            renderGridFlightCustomer001();

            renderGridFlightCustomer002();

            renderGridFlightCustomer003();

            renderGridFlightCustomer004();

            renderGridFlightCustomer005();

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