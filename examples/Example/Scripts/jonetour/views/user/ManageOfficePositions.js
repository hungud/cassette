(function () {

    VA.views.user.ManageOfficePositions = function () {

        var _configs = {
        }

        var grid_positions_configs = null;

        var grid_positions_paged = null;

        var initGridPositions = function () {

            grid_positions_configs = {
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

            grid_positions_configs.data = {
                package_name: 'PK_BD_USERS_OFFICE_POSITIONS',
                object_name: 'GET_LIST_OFFICE_POSITIONS',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function add() {

            var name = $('#NAME').val();

            if (!name) {
                jwm.Alert.ShowMsg('#formView', 0, 'Tên chức vụ không được bỏ trống!');
                $('#NAME').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_OFFICE_POSITIONS';

            data_post.object_name = 'INSERT_OFFICE_POSITIONS';

            data_post.p_NAME = name;

            data_post.p_STATUS = $('#STATUS').val();

            data_post.p_MB_ID = jLoki.User.Status.GmId;

          
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                   
                   
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        renderGridPositions();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var name = $('#NAME').val();

            if (!name) {
                jwm.Alert.ShowMsg('#formView', 0, 'Tên chức vụ không được bỏ trống!');
                $('#NAME').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_OFFICE_POSITIONS';

            data_post.object_name = 'UPDATE_OFFICE_POSITIONS';

            data_post.P_MB_ID = jLoki.User.Status.GmId;

            data_post.P_SQ_ID = $('#SQ_ID').val();

            data_post.p_NAME = name;

            data_post.p_STATUS = $('#STATUS').val();

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                  
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                  
                    if (data.TypeMsg > 0) {
                        renderGridPositions();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }




        var renderGridPositions = function (conditions) {

            if (conditions) {
                grid_positions_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_positions_paged = new SS.core.GridPaged();

            grid_positions_paged.init(grid_positions_configs);
        }

        var initControls = function () {

            initGridPositions();

            renderGridPositions();

          

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