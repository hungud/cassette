(function () {

    VA.views.Payment.PaymentSmartlink = function () {

        var _configs = {
        }

        var _grid_paged = null;

        var _grid_paged_config = null

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/payment.asmx/GetListPaymentSmAtmR',
                page_size: 20,
                row_start: 0,
                row_end: 20
            }
        }     

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var setGridConfigFromQueryString = function () {
            var context = new SS.core.helpers.context();

            var status = context.getQueryString('status');

            var action = context.getQueryString('action');

            var option = action;

            var order_id = context.getQueryString('order_id');

            var conditions = new Array();

            if (isEmpty(status) == false)
                conditions.push("(a.status = " + status + ")");

            if (isEmpty(order_id) == false)
                conditions.push("(a.order_id = " + order_id + ")");

            if (action == "view") {
                option = 'searching';
            }

            _grid_paged_config.data = {
                op: option, conditions: JSON.stringify(conditions)
            };

            _grid_paged_config.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;
                if (window.location.hash == "#option_seaching") return;
                if (action == "view") $('#formView').deserializeObjectToFormView({
                    tmpId: '#tmp_grid', idx: null, keyName: 'order_id', keyValue: order_id
                });
                window.location.hash = 'action_complete';

            };
        }


        var initControls = function () {

            initGrid();

            setGridConfigFromQueryString();

            renderGrid();
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
