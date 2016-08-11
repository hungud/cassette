(function () {

    VA.views.report.ReportTicketingMonth = function () {

        var _configs = {
        }

        var current_date = new Date();

        var grid_report_ticket_month_configs = null;

        var grid_report_ticket_month_paged = null;

        var initGridReportTicketMonth = function () {

            grid_report_ticket_month_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/report/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };

            var conditions = {

            };

            //conditions.REPORT_TICKETING_DAILY = {};

            //conditions.REPORT_TICKETING_DAILY.MB_ID = $('#MB_ID').val();

            grid_report_ticket_month_configs.data = {
                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                object_name: 'GET_LIST_REPORT_TIC_MONTH',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGridReportTicketMonth = function (conditions) {

            if (conditions) {
                grid_report_ticket_month_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_report_ticket_month_paged = new SS.core.GridPaged();

            grid_report_ticket_month_paged.init(grid_report_ticket_month_configs);
        }



        var initControls = function () {

            initGridReportTicketMonth();


            var year = $.format.date(current_date, 'yyyy');

            $('#YEAR_SEARCH').val(year);//tạo giá trị năm ban đầu

            $("#YEAR_SEARCH").datetimepicker({
               
                format: 'Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

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

            var year = $('#YEAR_SEARCH', '#filterForm').val();

            conditions.REPORT_TICKETING_DAILY = {};

            conditions.REPORT_TICKETING_DAILY.MB_ID = $('#MB_ID').val();

            if (isEmpty(year) == false) {
                year = year.trim();

                conditions.REPORT_TICKETING_DAILY.YEAR = year;
            }


            grid_report_ticket_month_configs.data = {
                package_name: 'PK_BD_REPORT_TICKETING_DAILY',
                object_name: 'GET_LIST_REPORT_TIC_MONTH',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_report_ticket_month_configs.page_size
            };


            grid_report_ticket_month_paged = new SS.core.GridPaged();

            grid_report_ticket_month_paged.init(grid_report_ticket_month_configs);

            window.location.hash = "option_seaching";

            return false;
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
