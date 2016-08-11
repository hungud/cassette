(function () {

    VA.views.airline.ManageCustomerInfo = function () {

        var _configs = {
        }

        var option_grid_add_update = null;

        var initOptionGrid = function () {
            option_grid_add_update = {
                id: '#CUSTOMER_INFO_ID',
                op_add: 'AddCustomerInfo',
                op_update: 'UpdateCustomerInfo'
            }
        }
        
        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListCustomerInfo',
                page_size: 5,
                row_start: 0,
                row_end: 5
            }
        }

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var today = new Date();

        var initDate = function () {
            $('#BIRTH_DAY').datepick({
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

        var add = function () {

            var form_valid = $('#insertUpdate').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insertUpdate').serializeObject();

            data_post.op = option_grid_add_update.op_add;

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        $(option_grid_add_update.id).val(data.Data.CUSTOMER_INFO_ID);
                        $('#btnAddUpdate').val('Cập nhật');

                        renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var update = function () {

            var form_valid = $('#insertUpdate').validateForm();

            if (form_valid == false) return false;

            var data_post = $('#insertUpdate').serializeObject();

            data_post.op = option_grid_add_update.op_update;

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0)
                        _grid_paged.renderGrid();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initControls = function () {

            initOptionGrid();

            initGrid();

            var context = new SS.core.helpers.context();

            var order_id = context.getQueryString('order_id');

            var action = context.getQueryString('action');

            var conditions = new Array();

            conditions.push("(a.order_id = " + order_id + ")");

            _grid_paged_config.data = {
                op: 'edit', conditions: JSON.stringify(conditions)
            };

            _grid_paged_config.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;
                if (action == "edit") $('#insertUpdate').deserializeObjectToForm('#tmp_grid', 0);
                $('#ORDER_ID', '#insertUpdate').val(order_id);
                window.location.hash = 'action_complete';

            };

            renderGrid();

            initDate();

            jQuery('#btnAddUpdate').click(function () {
                if (jQuery(option_grid_add_update.id).val() != "0")
                    return update();
                else
                    return add();
            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(option_grid_add_update.id).val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');

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