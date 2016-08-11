(function () {

    VA.views.JapanRailPass.ManageTicketJapanRailPass = function () {

        var _configs = {
        }

        var grid_manage_ticket_japan_rail_pass_configs = null;

        var grid_manage_ticket_japan_rail_pass_paged = null;

        var initGridManageTicketJapanRainPass = function () {

            grid_manage_ticket_japan_rail_pass_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_ticket_japan_rail_pass_configs.data = {
                package_name: 'PK_BD_TICKET_JRP',
                object_name: 'GET_LIST_TICKET_JRP',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridManageTicketJapanRainPass = function (conditions) {

            if (conditions) {
                grid_manage_ticket_japan_rail_pass_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_ticket_japan_rail_pass_paged = new SS.core.GridPaged();

            grid_manage_ticket_japan_rail_pass_paged.init(grid_manage_ticket_japan_rail_pass_configs);
        }


        var initControls = function () {

            initGridManageTicketJapanRainPass();

            renderGridManageTicketJapanRainPass();

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

            initFilterForm();

            initCompanyPass();

            initTypeDate();

            initCompanyNameSearch();

            initPassSearch();

         
        }

       
        function initCompanyPass() {

            var data_post = {};

            data_post.package_name = "PK_BD_TICKET_JRP";

            data_post.object_name = "GET_LIST_PASS_JRP";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Company_Pass').data('data_source', data_list);

                    jQuery('#REF_COMPANY_PASS_ID').html('<option value="">-- [ Chọn chặng đi ] --</option>');

                    jQuery('#tmp_Company_Pass').tmpl(data_list).appendTo('#REF_COMPANY_PASS_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

       
        function initTypeDate() {

            var data_post = {};

            data_post.package_name = "PK_BD_TICKET_JRP";

            data_post.object_name = "GET_LIST_TYPE_DATE";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Type_Date').data('data_source', data_list);

                    jQuery('#REF_TYPE_DATE_ID').html('<option value="">-- [ Chọn thời gian ] --</option>');

                    jQuery('#tmp_Type_Date').tmpl(data_list).appendTo('#REF_TYPE_DATE_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        function initCompanyNameSearch() {

            var data_post = {};

            data_post.package_name = "PK_BD_TICKET_JRP";

            data_post.object_name = "GET_LIST_COMPANY_NAME";

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Company_Name').data('data_source', data_list);

                    jQuery('#COMPANY_NAME_SEARCH').html('<option value="">-- [ Chọn tên công ty ] --</option>');

                    jQuery('#tmp_Company_Name').tmpl(data_list).appendTo('#COMPANY_NAME_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        function initPassSearch() {

            var data_post = {};

            data_post.package_name = "PK_BD_TICKET_JRP";

            data_post.object_name = "GET_LIST_PASS_JRP";

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Company_Pass').data('data_source', data_list);

                    jQuery('#PASS_SEARCH').html('<option value="">-- [ Chọn tên chặng] --</option>');

                    jQuery('#tmp_Company_Pass').tmpl(data_list).appendTo('#PASS_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TICKET_JRP';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_ticket_japan_rail_pass_paged.renderGrid();
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
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TICKET_JRP';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/jrp/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_ticket_japan_rail_pass_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });


        }

        var execFilterForm = function () {

            var conditions = {
            };

            var pass = $('#PASS_SEARCH', '#filterForm').val();
            var company_name = $('#COMPANY_NAME_SEARCH', '#filterForm').val();
          

            conditions.COMPANY_PASS = {};
            conditions.COMPANY = {};

            if (isEmpty(pass) == false) {
                pass = pass.trim();

                conditions.COMPANY_PASS.PASS = pass;
            }

            if (isEmpty(company_name) == false) {
                company_name = company_name.trim();

                conditions.COMPANY.NAME = company_name;
            }


            grid_manage_ticket_japan_rail_pass_configs.data = {
                package_name: 'PK_BD_TICKET_JRP',
                object_name: 'GET_LIST_TICKET_JRP',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_ticket_japan_rail_pass_configs.page_size
            };


            grid_manage_ticket_japan_rail_pass_paged = new SS.core.GridPaged();

            grid_manage_ticket_japan_rail_pass_paged.init(grid_manage_ticket_japan_rail_pass_configs);

            window.location.hash = "option_seaching";

            return false;
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
