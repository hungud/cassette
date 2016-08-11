(function () {

    VA.views.email.EmailNotify = function () {
    
        var _configs = {
        };
        
        var _grid_paged = null;

        var _grid_paged_config = null

        var initGrid = function () {
            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + '/service03/email/get',
                is_call_package: true,
                page_size: 5,
                row_start: 0,
                row_end: 5
            }

            var conditions = {

            };



            _grid_paged_config.data = {
                package_name: 'PK_BD_EMAIL_NOTIFY_LOG',
                object_name: 'GET_ROWS',
                p_conditions: JSON.stringify(conditions)
            };
        }

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
        }




        var initControls = function () {

            initGrid();

            renderGrid();

            initFilterForm();


            //initDate
            $('#IDATE', '#filterForm').datepick({
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

            var idate = $('#IDATE', '#filterForm').val();
            var subject_email = $('#SUBJECT_EMAIL', '#filterForm').val();
            var body_email = $('#BODY_EMAIL', '#filterForm').val();
           

            conditions.EMAIL_NOTIFY_LOG = {};

            if (isEmpty(idate) == false) {
                idate = idate.trim();

                conditions.EMAIL_NOTIFY_LOG.IDATE = idate;
            }

            if (isEmpty(subject_email) == false) {
                subject_email = subject_email.trim();

                conditions.EMAIL_NOTIFY_LOG.SUBJECT_EMAIL = subject_email;
            }

            if (isEmpty(body_email) == false) {
                body_email = body_email.trim();

                conditions.EMAIL_NOTIFY_LOG.BODY_EMAIL = body_email;
            }

            _grid_paged_config.data = {
                package_name: 'PK_BD_EMAIL_NOTIFY_LOG',
                object_name: 'GET_ROWS',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: _grid_paged_config.page_size
            };

            _grid_paged.init(_grid_paged_config);

            window.location.hash = "option_seaching";

            return false;
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