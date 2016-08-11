(function () {

    VA.views.airline.ManageAirline = function () {

        var _configs = {
        }

        var form_info = null;

        var initFormInfo = function () {

            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#CODE',
                op_add: 'AddAirline',
                op_update: 'UpdateAirline',
                op_add_handler: '/Handler/AirlineHandler.ashx',
                op_update_handler: '/Handler/AirlineHandler.ashx',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListAirlinesForAddEdit',
                    page_size: 5,
                    row_start: 0,
                    row_end: 5
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                }
            }
        }
        
        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').bind('click', function () {
                searchFormAction();
                return false;
            });
            $('#txtSearch', '#searchForm').bind('keypress', function (e) {
                var code = e.keyCode || e.which;
                if (code == 13) { //Enter keycode
                    searchFormAction();
                    return false;
                }
            });
        }

        var searchFormAction = function () {
            var name = $('#txtSearch', '#searchForm').val();

            var conditions = new Array();
            if (name.length > 0) {
                conditions.push("(regexp_like(a.name,'" + name.toLowerCase() + "','i'))");
            }
            form_info.grid_paged.init({
                data: {
                    op: 'searching', conditions: JSON.stringify(conditions)
                }
            });
        }

        var add = function () {

            var form_valid = $(form_info.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(form_info.form_id).serializeObject();

            data_post.op = form_info.op_add;

            jwm.Alert.ShowAjaxProcessing(form_info.form_id);

            jQuery.ajax({
                url: form_info.op_add_handler,
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(form_info.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        $(form_info.input_key_id).val(data.Data.CODE);
                        $(form_info.button_add_update_id).val('Cập nhật');
                        form_info.grid_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(form_info.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var update = function () {
            var form_valid = $(form_info.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(form_info.form_id).serializeObject();

            data_post.op = form_info.op_update;

            jwm.Alert.ShowAjaxProcessing(form_info.form_id);
            jQuery.ajax({
                url: form_info.op_update_handler,
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(form_info.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0)
                        form_info.grid_paged.renderGrid();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(form_info.form_id);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initControls = function () {

            initFormInfo();
            
            form_info.RenderGrid();

            jQuery(form_info.button_add_update_id).click(function () {
                if (jQuery(form_info.input_key_id).val() != "0")
                    return update();
                else
                    return add();
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    $(form_info.button_add_update_id).val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                }
            });

            initSearchForm();
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