(function () {

    VA.views.customerAgent.CustomerAgent = function () {

        var _configs = {
        }

        var grid_customer_agent_configs = null;

        var grid_customer_agent_paged = null;

        var initGridCustomerAgent = function () {

            grid_customer_agent_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/agent/get",
                is_call_package: true,
                page_size: 5,
                row_start: 0,
                row_end: 5
            };

            var conditions = {

            };
           

            grid_customer_agent_configs.data = {
                package_name: 'PK_BD_CUSTOMER_AGENT',
                object_name: 'GET_LIST_CUSTOMER_AGENT',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridCustomerAgent = function (conditions) {

            if (conditions) {
                grid_customer_agent_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_customer_agent_paged = new SS.core.GridPaged();

            grid_customer_agent_paged.init(grid_customer_agent_configs);
        }

        var initControls = function () {

            initGridCustomerAgent();

            renderGridCustomerAgent();

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


            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

        }
 


        function add() {
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            //--------------------------------------------------       

           
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

           
            


                data_post = addPrefixParamToObject(data_post, 'P_');

                data_post.package_name = 'PK_BD_CUSTOMER_AGENT';

                data_post.object_name = 'INSERT_CUSTOMER_AGENT';


                jwm.Alert.ShowAjaxProcessing('#insertUpdate');

                jQuery.ajax({
                    url: _configs.service_wss_vietair_tv_url + "/service03/agent/get",
                    dataType: 'json',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing('#insertUpdate');
                        jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                        if (data.TypeMsg > 0) {

                            renderGridCustomerAgent();
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

                data_post.package_name = 'PK_BD_CUSTOMER_AGENT';

                data_post.object_name = 'UPDATE_CUSTOMER_AGENT';

                jwm.Alert.ShowAjaxProcessing('#insertUpdate');


                jQuery.ajax({
                    url: _configs.service_wss_vietair_tv_url + "/service03/agent/get",
                    dataType: 'json',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing('#insertUpdate');
                        jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                        if (data.TypeMsg > 0) {

                            renderGridCustomerAgent();
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
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                return false;
            });
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var agent_name = $('#AGENT_NAME1').val();
            var email = $('#EMAIL_AGENT').val();

            var address = $('#ADDRESS_AGENT').val();



            conditions.CUSTOMER_AGENT = {};

            if (isEmpty(agent_name) == false) {

                agent_name = agent_name.trim();

                conditions.CUSTOMER_AGENT.AGENT_NAME = agent_name;
            }


            if (isEmpty(email) == false) {

                email = email.trim();

                conditions.CUSTOMER_AGENT.EMAIL = email;
            }


            if (isEmpty(address) == false) {

                address = address.trim();

                conditions.CUSTOMER_AGENT.ADDRESS = address;
            }
            grid_customer_agent_configs.data = {
                package_name: 'PK_BD_CUSTOMER_AGENT',
                object_name: 'GET_LIST_CUSTOMER_AGENT',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_customer_agent_configs.page_size
            };

            grid_customer_agent_paged.init(grid_customer_agent_configs);

            window.location.hash = "option_seaching";

            return false;
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