(function () {

    VA.views.accounting.ManagePaymentGoogleAdwords = function () {

        var _configs = {
        }

        var form_info = {
            form_id: '#insertUpdate',
            button_add_update_id: '#btnAddUpdate',
            input_key_id: '#SQ_ID',
            grid_paged: null,
            grid_configs: {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/accounting/get",
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
                    package_name: 'PK_BD_ACC_GOOGLE_ADS',
                    object_name: 'GET_LIST_GOOGLE_ADS',
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

  
        var initControls = function () {
            form_info.InitContext();

            form_info.RenderGrid();

        
            $('#btnAddUpdate').unbind('click');
            $('#btnAddUpdate').click(function () {
                return false;

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