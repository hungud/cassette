(function () {

    VA.views.flightCustomer.ManagePolicyCustomer002 = function () {


        var _configs = {
        }

        var grid_flight_customer_configs = null;

        var grid_flight_customer_paged = null;

        var initGridFlightCustomer = function () {

            grid_flight_customer_configs = {
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

            grid_flight_customer_configs.data = {
                package_name: 'PK_BD_FS_POLICY_CUSTOMER_002',
                object_name: 'GET_LIST_POLICY_CUSTOMER_002',
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

            data_post.package_name = "PK_BD_FS_POLICY_CUSTOMER_002";

            data_post.object_name = "INSERT_POLICY_CUSTOMER_002";

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

                        renderGridFlightCustomer();
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

            data_post.package_name = "PK_BD_FS_POLICY_CUSTOMER_002";

            data_post.object_name = "UPDATE_POLICY_CUSTOMER_002";

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
                        renderGridFlightCustomer();
                        viewManageFlightCustomer(data_post.P_SQ_ID);
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
                viewManageFlightCustomer(sq_id);
                return false;
            });
        }

        var viewManageFlightCustomer = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/FlightCustomer/ViewManagePolicyCustomerLog002",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanageflightcustomerlog').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        var renderGridFlightCustomer = function (conditions) {

            if (conditions) {
                grid_flight_customer_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_flight_customer_paged = new SS.core.GridPaged();

            grid_flight_customer_paged.init(grid_flight_customer_configs);
        }

        var initFlightCustomerDate = function () {

            $('#IDATE').datepick({
                constrainInput: true,
                showWeeks: false,
                showOtherMonths: false,
                showStatus: false,
                numberOfMonths: 2,
                showOn: 'both',
                gotoToday: true,
                buttonImageOnly: true,
                buttonImage: '/content/images/icons/calendar.png',
                dateFormat: 'dd/mm/yy',
                mandatory: true,
                closeAtTop: true,
                alignment: 'bottom',
                defaultDate: 5,
                minDate: '-329D',
                maxDate: '+329D',
                showAnim: false,
                changeMonth: false,
                changeYear: false,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });

        }



        var initControls = function () {

            initGridFlightCustomer();

            renderGridFlightCustomer();

            initInsertUpdateForm();

            initFlightCustomerDate();

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