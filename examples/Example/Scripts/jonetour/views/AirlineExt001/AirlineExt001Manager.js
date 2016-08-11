(function () {

    VA.views.AirlineExt001.AirlineExt001Manager = function () {

        var _configs = {

        }

        var form_info = null;

        var initFormInfo = function () {

            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                input_key_parent_id: '#ATP_002_REF_ID',
                op_add: 'AddAtp001',
                op_update: 'UpdateAtp001',
                op_add_handler: '/Handler/AirlineHandlerExt001.ashx',
                op_update_handler: '/Handler/AirlineHandlerExt001.ashx',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListAtp001',
                    page_size: 5,
                    row_start: 0,
                    row_end: 5
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();
                    var sq_parent_id = context.getQueryString('sq_atp_002_id');
                    var conditions = new Array();
                    if (isEmpty(sq_parent_id) == false) {
                        conditions.push("(a.atp_002_ref_id = " + sq_parent_id + ")");
                        $(form_info.input_key_parent_id).val(sq_parent_id);
                    }

                    var action = context.getQueryString('action');

                    option = 'searching';

                    form_info.grid_configs.data = {
                        op: option, conditions: JSON.stringify(conditions)
                    };
                }
            }
        }
       

        var initControlDateTime = function () {

            $('#DEPARTURE_DATE, #ARRIVE_DATE').datetimepicker({
                format: 'd/m/Y H:i',
                mask: true,
            });

        }

        var add = function() {

            var AIRLINE_INFO = CKEDITOR.instances.AIRLINE_INFO.getData();

            AIRLINE_INFO = encodeURIComponent(AIRLINE_INFO);

            $('#AIRLINE_INFO').val(AIRLINE_INFO);

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
                        $(form_info.input_key_id).val(data.Data.SQ_ID);
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

        var update = function() {

            var AIRLINE_INFO = CKEDITOR.instances.AIRLINE_INFO.getData();

            AIRLINE_INFO = encodeURIComponent(AIRLINE_INFO);

            $('#AIRLINE_INFO').val(AIRLINE_INFO);

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
                if (jQuery(form_info.input_key_id).val() != "0")
                    return update();
                else
                    return add();
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    CKEDITOR.instances.AIRLINE_INFO.setData(e.objectForm.airline_info);
                    $(form_info.button_add_update_id).val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                }
            });

            initControlDateTime();

            var cities = new SS.services.cities();
            cities.init();

            var airlines = new SS.services.airlines();
            airlines.init();

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