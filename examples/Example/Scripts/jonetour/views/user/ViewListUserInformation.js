(function () {

    VA.views.user.ViewListUserInformation = function () {

        var _configs = {
        }

        var grid_config = null;

        var grid = null;

        var initGridViewListUser = function () {

            grid_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/user/get",
                is_call_package: true,
                page_size: 999999,
                row_start: 0,
                row_end: 999999
            };

            var conditions = {
            }

            grid_config.data = {
                package_name: 'PK_BD_USERS_ACCOUNT_INFO',
                object_name: 'GET_LIST_ACCOUNT_INFOMATION',
                p_conditions: JSON.stringify(conditions)
            };

            grid_config.onRenderComplete = function () {
                initUserRating();
            };

        }

        var renderListUser = function (conditions) {

            if (conditions) {
                grid_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid = new SS.core.GridPaged();

            grid.init(grid_config);
        }


        var initUserRating = function () {

            $('[data-user-rating]').barrating({
                theme: 'css-stars',
                showSelectedRating: false,
                initialRating: 4.5,
                hoverState: false
            });
        }

        var initControls = function () {

            initGridViewListUser();

            renderListUser();

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