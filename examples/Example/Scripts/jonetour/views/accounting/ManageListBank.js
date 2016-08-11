(function () {

    VA.views.accounting.ManageListBank = function () {

        var _configs = {
        }

        var form_info = null;

        var initFormInfo = function () {
            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + "/Core.asmx/GetPackageData",
                    is_call_package: true,
                    page_size: 10,
                    row_start: 0,
                    row_end: 10
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();
                    var sq_id = context.getQueryString('sq_id');
                    var conditions = {
                    };


                    var action = context.getQueryString('action');

                    var option = 'edit';

                    form_info.grid_configs.data = {
                        package_name: 'PK_BD_ACC_BANK',
                        object_name: 'GET_LIST_BANK',
                        p_conditions: JSON.stringify(conditions)
                    };

                    form_info.grid_configs.onRenderComplete = function () {
                        if (window.location.hash.indexOf('action_complete') >= 0) return;
                        if (action == "edit") $('#insertUpdate').deserializeObjectToForm('#tmp_grid', null,
                                'sq_id', sq_id);
                        window.location.hash = 'action_complete';
                    };
                }
            }
        }


        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-submit-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-submit-sq-id');
                submitRow(sq_id);
                return false;
            });
            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewManageBankLogInfo(sq_id);
                return false;
            });
        }

        var viewManageBankLogInfo = function (sqId) {
            var data_post = {
            };

            data_post.sq_id = sqId;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/Accounting/ViewManageBankLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanagebanklog').show();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var addBank = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;


            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_ACC_BANK';

            data_post.object_name = 'INSERT_BANK';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/CallPackage",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        form_info.grid_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var updateBank = function () {

            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;
            var data_post = $(_configs.form_id).serializeObject();

            //console.log(data_post);

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_ACC_BANK';

            data_post.object_name = 'UPDATE_BANK';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/CallPackage",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        form_info.grid_paged.renderGrid();
                        viewManageBankLogInfo(data_post.P_SQ_ID);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }
     
        var initControls = function () {

            initFormInfo();

            form_info.InitContext();

            form_info.RenderGrid();


            jQuery(form_info.button_add_update_id).click(function () {

                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery(form_info.input_key_id).val() != "0") {

                    return updateBank();
                }
                else {
                    return addBank();
                }
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery(form_info.input_key_id).val() != "0") {
                    $(form_info.button_add_update_id).val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                    $('#sq_id_code').show();


                }
            });
            initInsertUpdateForm();
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