(function () {

    VA.views.travelTour.ManageTravelTourSeftBookingInfoLog = function () {

        var _configs = {
            
        }

        var option_grid_add_update = null;

        var initOptionGrid = function () {
            option_grid_add_update = {
                id: '#TRAVEL_INFO_ID',
                op_add: 'AddTravelInfo',
                op_update: 'UpdateTravelInfo',
                ajax_url_grid: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListTravelTourSeftBookingInfoLog'
            }
        }

      
        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var order_id = context.getQueryString('order_id');

            var conditions = new Array();

            if (isEmpty(order_id) == false)
                conditions.push("(a.order_id = " + order_id + ")");

            var option = 'searching';

            _grid_paged_config.data = {
                op: option, conditions: JSON.stringify(conditions)
            };
        }

        var initSearchForm = function () {

            $('#txtSearch').enter(function () {
                $('#btnSearch', '#searchForm').click();
            });

            $('#btnSearch', '#searchForm').click(function () {

                var order_id = $('#txtSearch', '#searchForm').val();

                var conditions = new Array();

                if (isEmpty(order_id) == false)
                    conditions.push("(a.order_id = " + order_id + ")");

                _grid_paged.init({
                    data: {
                        op: 'searching', conditions: JSON.stringify(conditions)
                    }
                });

                return false;
            });
        }

        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: option_grid_add_update.ajax_url_grid,
                page_size: 5,
                row_start: 0,
                row_end: 5
            }
        }

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }

        var initControls = function () {

            initOptionGrid();

            initGrid();

            setGridConfigFromQueryString();

            renderGrid();

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