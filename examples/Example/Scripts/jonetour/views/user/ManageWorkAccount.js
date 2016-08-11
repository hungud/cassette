(function () {

    VA.views.user.ManageWorkAccount = function () {

        var _configs = {
        }

        var grid_config = null;

        var grid = null;

        var initGridWorkAccount = function () {

            grid_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            }

            conditions.WORK_ACCOUNT = {};

            conditions.WORK_ACCOUNT.mb_id = jLoki.User.Status.GmId;

            grid_config.data = {
                package_name: 'PK_BD_USERS_WORK_ACCOUNT',
                object_name: 'GET_LIST_WORK_ACCOUNT',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var getListAccountTyppe = function () {

            jQuery.ajax({

                url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_BD_USERS_WORK_ACCOUNT',
                    object_name: 'GET_LIST_WORK_ACC_TYPE',
                    P_CONDITIONS: '{}',
                    P_ROW_START: '0',
                    P_ROW_END: '50'
                },
                success: function (data) {

                    jwm.Alert.ShowMsg('#formView', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data != null) {

                        $('#tmp_list_account_type_id').tmpl(data.Data.CURSOR_DATA).appendTo("#ACCOUNT_TYPE");

                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.ShowMsg('#formView', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function add() {

            var login_id = $('#LOGIN_ID').val();

            var account_type = $('#ACCOUNT_TYPE').val();

            if (!login_id) {

                jwm.Alert.ShowMsg('#formView', 0, 'Tài khoản không được bỏ trống!');
                $('#LOGIN_ID').focus();
                return false;
            }

            if (account_type == '') {
                jwm.Alert.ShowMsg('#formView', 0, 'Bạn phải chọn kiểu !');
                $('#ACCOUNT_TYPE').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_WORK_ACCOUNT';

            data_post.object_name = 'INSERT_WORK_ACCOUNT';

            data_post.p_LOGIN_ID = login_id;

            data_post.p_ACCOUNT_TYPE = account_type;

            data_post.P_NOTE = $('#NOTE').val();

            data_post.p_STATUS = $('#STATUS').val();

            data_post.p_MB_ID = jLoki.User.Status.GmId;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    jwm.Alert.ShowMsg('#formView', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        renderWorkAccount();
                    }
                },
                error: function (http, message, exc) {

                    jwm.Alert.ShowMsg('#formView', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var login_id = $('#LOGIN_ID').val();

            var account_type = $('#ACCOUNT_TYPE').val();

            if (!login_id) {

                jwm.Alert.ShowMsg('#formView', 0, 'Tài khoản không được bỏ trống!');
                $('#LOGIN_ID').focus();
                return false;
            }

            if (account_type == '') {
                jwm.Alert.ShowMsg('#formView', 0, 'Bạn phải chọn kiểu !');
                $('#ACCOUNT_TYPE').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_WORK_ACCOUNT';

            data_post.object_name = 'UPDATE_WORK_ACCOUNT';

            data_post.P_SQ_ID = $('#SQ_ID_HIDDEN').val();

            data_post.p_LOGIN_ID = login_id;

            data_post.p_ACCOUNT_TYPE = account_type;

            data_post.P_NOTE = $('#NOTE').val();

            data_post.p_STATUS = $('#STATUS').val();

            data_post.p_MB_ID = jLoki.User.Status.GmId;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    jwm.Alert.ShowMsg('#formView', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        renderWorkAccount();

                    }
                },
                error: function (http, message, exc) {

                    jwm.Alert.ShowMsg('#formView', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;

        }

        var renderWorkAccount = function (conditions) {

            if (conditions) {
                grid_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid = new SS.core.GridPaged();

            grid.init(grid_config);
        }

        function refesh()
        {
            location.reload();
        }

        var initControls = function () {

            initGridWorkAccount();

            renderWorkAccount();

            getListAccountTyppe();

            jQuery('#btnAddUpdate').click(function () {

                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();

                return add();

            });

            jQuery('#btnAddUpdate1').click(function () {

                return update();

            });

            jQuery('#btnReset').click(function () {

                return refesh();

            });


        }

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initControls();

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                $('#btnAddUpdate1').show();
                $('#btnAddUpdate').hide();
            });

        }

        return ({

            "init": init

        });

    };

}());