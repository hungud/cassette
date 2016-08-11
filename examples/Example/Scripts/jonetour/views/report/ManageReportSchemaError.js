(function () {

    VA.views.report.ManageReportSchemaError = function () {
    
        var _configs = {
        };
        
        var _grid_paged = null;

        var _grid_paged_config = null;

        var current_date = new Date();

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + '/service03/report/get',
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            }

            var conditions = {

            };

            _grid_paged_config.data = {
                package_name: 'PK_BD_REPORT_SCHEMA_ERROR',
                object_name: 'GET_LIST_REPORT_SCHEMA_ERROR',
                p_conditions: JSON.stringify(conditions)
            };
        }

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }




        var initControls = function () {

            initGrid();

            initSchemaName();

            initTableName();

            $('#IDATE_SEARCH', '#filterForm').datepick({
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
                //defaultDate: 5,
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

            execFilterForm();

            initFilterForm();

           

        }



        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

           
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var idate = $('#IDATE_SEARCH', '#filterForm').val();

            var schema_name = $('#SCHEMA_NAME', '#filterForm').val();

            var table_name = $('#TABLE_NAME', '#filterForm').val();

          
            if (isEmpty(idate) == false) {

                idate = idate.trim();

                conditions.IDATE = idate;
            }

            if (isEmpty(schema_name) == false) {

                schema_name = schema_name.trim();

                conditions.SCHEMA_NAME = schema_name;
            }

            if (isEmpty(table_name) == false) {

                table_name = table_name.trim();

                conditions.TABLE_NAME = table_name;
            }

         
            _grid_paged_config.data = {
                package_name: 'PK_BD_REPORT_SCHEMA_ERROR',
                object_name: 'GET_LIST_REPORT_SCHEMA_ERROR',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };

            _grid_paged = new SS.core.GridPaged();

            _grid_paged.init(_grid_paged_config);

            window.location.hash = "option_seaching";

            return false;
        }

        var initSchemaName = function() {

            var data_post = {};

            data_post.package_name = "PK_BD_REPORT_SCHEMA_ERROR";

            data_post.object_name = "GET_LIST_SCHEMA_NAME";

            data_post.P_SCHEMA = $('#SCHEMA_NAME').val();

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + '/service03/report/get',
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Schema_Name').data('data_source', data_list);

                    jQuery('#tmp_Schema_Name').tmpl(data_list).appendTo('#SCHEMA_NAME');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        var initTableName = function () {

            var data_post = {};

            data_post.package_name = "PK_BD_REPORT_SCHEMA_ERROR";

            data_post.object_name = "GET_LIST_TABLE";

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + '/service03/report/get',
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Table_Name').data('data_source', data_list);

                    jQuery('#tmp_Table_Name').tmpl(data_list).appendTo('#TABLE_NAME');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_ROOT_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();
        }

        return ({

            "init": init

        });

    };

}());