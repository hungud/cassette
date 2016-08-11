(function () {

    VA.views.airline.CheapTicketMonth = function () {

        var _configs = {
        }

        var setMask = function () {

            //http://www.decorplanit.com/plugin/    
            $('.money-mask').autoNumeric('init', { aSign: ' VND', pSign: 's' });

            $('.number-mask').autoNumeric('init');

            $('.int-mask').autoNumeric('init', { mDec: 0 });


            $("input[type=submit], input[type=button], input[type=reset], button").button();

            $('.date-mask').mask('00/00/0000');

        }

        var grid_cheap_ticket_month_configs = null;

        var grid_cheap_ticket_month_paged = null;

        var initGridCheapTicketMonth = function () {

            grid_cheap_ticket_month_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

           
            grid_cheap_ticket_month_configs.data = {
                package_name: 'PK_BD_CHEAP_TICKET_MONTH',
                object_name: 'GET_LIST_CHEAP_TICKET_MONTH',
                p_conditions: JSON.stringify(conditions)
            };

        }

      
       
        var initControlDateTime = function () {

          
            //$('#DEPARTURE_DATE').datepick({
            //    constrainInput: true,
            //    showWeeks: false,
            //    showOtherMonths: false,
            //    showStatus: false,
            //    numberOfMonths: 2,
            //    showOn: 'both',
            //    gotoToday: true,
            //    buttonImageOnly: true,
            //    buttonImage: '/content/images/icons/calendar.png',
            //    dateFormat: 'dd/mm/yy',
            //    mandatory: true,
            //    closeAtTop: true,
            //    alignment: 'bottom',
            //    //defaultDate: 5,
            //    showAnim: false,
            //    changeMonth: false,
            //    changeYear: false,
            //    beforeShowDay: null,
            //    selectFirst: true,
            //    showButtonPanel: true,
            //    ViewsHeaderVisibility: false,
            //    duration: 'fast',
            //    onSelect: null,
            //    beforeShow: null
            //});
            $('#DEPARTURE_DATE').multiDatesPicker(
                {
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (dateText, inst) {
                        inst.settings.defaultDate = dateText;
                    }
                }
            );

            $('#FROM_DATE_SEARCH').datepick({
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
        

            $('#TO_DATE_SEARCH').datepick({
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
        }
        var renderGridCheapTicketMonth = function (conditions) {

            if (conditions) {
                grid_cheap_ticket_month_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_cheap_ticket_month_paged = new SS.core.GridPaged();

            grid_cheap_ticket_month_paged.init(grid_cheap_ticket_month_configs);
        }


        var initControls = function () {

            initGridCheapTicketMonth();

            renderGridCheapTicketMonth();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddUpdate').val('Cập nhật');
                   jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });


            setMask();

            initControlDateTime();

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

            var from_code = $('#FROM_CODE_SEARCH').val();

            var to_code = $('#TO_CODE_SEARCH').val();

            var airline_code = $('#AIRLINE_CODE_SEARCH').val();

            var from_date = $('#FROM_DATE_SEARCH').val();

            var to_date = $('#TO_DATE_SEARCH').val();

            conditions.CHEAP_TICKET_MONTH = {};

            if (isEmpty(from_code) == false) {
                from_code = from_code.trim();

                conditions.CHEAP_TICKET_MONTH.FROM_CODE = from_code;
            }

            if (isEmpty(to_code) == false) {
                to_code = to_code.trim();

                conditions.CHEAP_TICKET_MONTH.TO_CODE = to_code;
            }

            if (isEmpty(airline_code) == false) {
                airline_code = airline_code.trim();

                conditions.CHEAP_TICKET_MONTH.AIRLINE_CODE = airline_code;
            }


            if (isEmpty(from_date) == false) {
                from_date = from_date.trim();

                conditions.CHEAP_TICKET_MONTH.FROM_DATE = from_date;
            }

            if (isEmpty(to_date) == false) {
                to_date = to_date.trim();

                conditions.CHEAP_TICKET_MONTH.TO_DATE = to_date;
            }

        
            grid_cheap_ticket_month_configs.data = {
                package_name: 'PK_BD_CHEAP_TICKET_MONTH',
                object_name: 'GET_LIST_CHEAP_TICKET_MONTH',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_cheap_ticket_month_configs.page_size
            };

            grid_cheap_ticket_month_paged.init(grid_cheap_ticket_month_configs);

            window.location.hash = "option_seaching";

            return false;
        }

        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_CHEAP_TICKET_MONTH';

            data_post.object_name = 'INSERT_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_cheap_ticket_month_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_CHEAP_TICKET_MONTH';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/flight/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                       
                        grid_cheap_ticket_month_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
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
