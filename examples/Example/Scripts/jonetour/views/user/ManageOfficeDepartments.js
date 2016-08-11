(function () {

    VA.views.user.ManageOfficeDepartments = function () {

        var _configs = {
        }

        var grid_department_configs = null;

        var grid_department_paged = null;

        var initGridDepartment = function () {

            grid_department_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                form_id: '#insertUpdate',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_department_configs.data = {
                package_name: 'PK_BD_USERS_OFFICE_DEPARTMENTS',
                object_name: 'GET_LIST_OFFICE_DEPARTMENTS',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function add() {


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_USERS_OFFICE_DEPARTMENTS';

            data_post.object_name = 'INSERT_OFFICE_DEPARTMENTS';

            data_post.p_mb_id = jLoki.User.Status.GmId;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                   
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_department_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
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

            data_post.package_name = 'PK_BD_USERS_OFFICE_DEPARTMENTS';

            data_post.object_name = 'UPDATE_OFFICE_DEPARTMENTS';

            data_post.p_mb_id = jLoki.User.Status.GmId;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                   
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_department_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }



        var renderGridDepartment = function (conditions) {

            if (conditions) {
                grid_department_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_department_paged = new SS.core.GridPaged();

            grid_department_paged.init(grid_department_configs);
        }

        var initControls = function () {

            initGridDepartment();

            renderGridDepartment();



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