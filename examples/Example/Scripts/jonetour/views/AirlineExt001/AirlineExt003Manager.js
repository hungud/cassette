(function () {

    VA.views.AirlineExt001.AirlineExt003Manager = function () {

        var _configs = {

        }

        var form_info = null;

        var initFormInfo = function () {

            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                op_add: 'AddAtp003',
                op_update: 'UpdateAtp003',
                op_add_handler: '/Handler/AirlineHandlerExt001.ashx',
                op_update_handler: '/Handler/AirlineHandlerExt001.ashx',
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

                    conditions.atp_003 = {
                    };

                    if (isEmpty(sq_id) == false) {
                        //conditions.push("(a.sq_id = " + sq_id + ")");
                        conditions.atp_003.sq_id = sq_id;
                    }

                    var action = context.getQueryString('action');

                    var option = 'edit';

                    form_info.grid_configs.data = {
                        package_name: 'PK_BD_VIETAIR_TICKET_PROMOTION',
                        object_name: 'GET_LIST_ATP003',
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
       
        var getListTypeTickets = function () {
            jwm.Alert.ShowAjaxProcessing(_configs.form_id, true);
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/Core.asmx/GetPackageData",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_BD_VIETAIR_TICKET_PROMOTION',
                    object_name: 'GET_LIST_TYPE_TICKETS'
                },
                success: function (data) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);

                    if (data != null && data.TypeMsg > 0) {

                        $('#tmp_list_ticket_type_id').tmpl(data.Data.CURSOR_DATA).appendTo("#TYPE_TICKET_ID");

                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var add = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_TICKET_PROMOTION_001';

            data_post.object_name = 'INSERT_ATP_003';

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
                        $(form_info.input_key_id).val(data.Data.OUTPUT_PARAMS.R_SQ_ID);
                        $(form_info.button_add_update_id).val('Cập nhật');
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

        var update = function () {
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_TICKET_PROMOTION_001';

            data_post.object_name = 'UPDATE_ATP_003';

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

        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }
      
        var initControls = function () {

            initFormInfo();

            form_info.InitContext();

            form_info.RenderGrid();

            jQuery(form_info.button_add_update_id).click(function () {
                $('#btnAddUpdate1').show();
                $('#btnAddUpdate').hide();
                if (jQuery(form_info.input_key_id).val() != "0") {
                    return update();
                }
                else {
                    return add();
                }
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    $(form_info.button_add_update_id).val('Cập nhật');
                    $('#btnManageATP002s').button('enable');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                }
            });

            $('#btnManageATP002s').click(function () {

                var link = '/AirlineExt001/ATPExt002Manager?sq_atp_003_id=' + $(form_info.input_key_id).val();
                window.open(link, '_seft');

                return false;

            });

            getListTypeTickets();

            setLinkSEO();
          
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