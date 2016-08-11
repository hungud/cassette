(function () {

    VA.views.AirlineExt001.AirlineExt002Manager = function () {

        var _configs = {

        }

        var form_info = null;

        var initFormInfo = function () {

            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                input_key_parent_id: '#ATP_003_REF_ID',
                op_add: 'AddAtp002',
                op_update: 'UpdateAtp002',
                op_add_handler: '/Handler/AirlineHandlerExt001.ashx',
                op_update_handler: '/Handler/AirlineHandlerExt001.ashx',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + '/ListInfo.asmx/GetListAtp002',
                    page_size: 20,
                    row_start: 0,
                    row_end: 20
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();
                    var sq_parent_id = context.getQueryString('sq_atp_003_id');
                    var conditions = new Array();
                    if (isEmpty(sq_parent_id) == false) {
                        conditions.push("(a.atp_003_ref_id = " + sq_parent_id + ")");
                        $(form_info.input_key_parent_id).val(sq_parent_id);

                        var data = {
                        };
                        data.sq_id = sq_parent_id;
                        $('#tmp_atp_003_detail').tmpl(data).appendTo('#atp_003_summary');
                    }

                    var action = context.getQueryString('action');

                    option = 'searching';

                    form_info.grid_configs.data = {
                        op: option, conditions: JSON.stringify(conditions)
                    };
                }
            }
        }
        
        var initFilterForm = function () {
            $('#filterForm').enter(function () {

                return execFilterForm();

            });

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });
        }

        var execFilterForm = function () {

            var context = new SS.core.helpers.context();
            var sq_parent_id = $(form_info.input_key_parent_id, form_info.form_id).val();
            var airline_code = $('#airline_code', '#filterForm').val();
            var departure_code = $('#departure_code', '#filterForm').val();
            var arrive_code = $('#arrive_code', '#filterForm').val();
            var price = $('#price', '#filterForm').val();
            var price_default = $('#price_default', '#filterForm').val();


            var conditions = new Array();

            //--------------------------------------------------------
            //Check input
            if (isEmpty(sq_parent_id) == false) {
                sq_parent_id = sq_parent_id;
                conditions.push("(a.atp_003_ref_id = '" + sq_parent_id + "')");
            }
            if (isEmpty(airline_code) == false) {
                airline_code = airline_code.trim().toUpperCase();
                conditions.push("(a.airline_code = '" + airline_code + "')");
            }
            if (isEmpty(departure_code) == false) {
                departure_code = departure_code.trim().toUpperCase();
                conditions.push("(a.departure_code = '" + departure_code + "')");
            }
            if (isEmpty(arrive_code) == false) {
                arrive_code = arrive_code.trim().toUpperCase();
                conditions.push("(a.arrive_code = '" + arrive_code + "')");
            }
            if (isEmpty(price) == false) {
                price = price.trim().toUpperCase();
                conditions.push("(a.price = '" + price + "')");
            }
            if (isEmpty(price_default) == false) {
                price_default = price_default.trim().toUpperCase();
                conditions.push("(a.price_default = " + price_default + ")");
            }


            //fix dua ve trang dau tien, row_start = 0, row_end = 10
            form_info.grid_paged.init({
                data: {
                    op: 'searching', conditions: JSON.stringify(conditions)
                },
                row_start: 0,
                row_end: form_info.grid_configs.page_size
            });

            window.location.hash = "option_seaching";

            return false;
        }

        var initDate = function () {
            $('#START_DATE, #END_DATE').datepick({
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

            $('#DEPARTURE_DATE_FROM, #DEPARTURE_DATE_TO').datepick({
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

        var add = function () {

            var CONTENT_01 = CKEDITOR.instances.CONTENT_01.getData();

            var CONTENT_02 = CKEDITOR.instances.CONTENT_02.getData();

            CONTENT_01 = encodeURIComponent(CONTENT_01);

            CONTENT_02 = encodeURIComponent(CONTENT_02);

            $('#CONTENT_01').val(CONTENT_01);

            $('#CONTENT_02').val(CONTENT_02);

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

        var update = function () {

            var CONTENT_01 = CKEDITOR.instances.CONTENT_01.getData();

            var CONTENT_02 = CKEDITOR.instances.CONTENT_02.getData();

            CONTENT_01 = encodeURIComponent(CONTENT_01);

            CONTENT_02 = encodeURIComponent(CONTENT_02);

            $('#CONTENT_01').val(CONTENT_01);

            $('#CONTENT_02').val(CONTENT_02);

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
                    CKEDITOR.instances.CONTENT_01.setData(e.objectForm.content_01);
                    CKEDITOR.instances.CONTENT_02.setData(e.objectForm.content_02);
                    $(form_info.button_add_update_id).val('Cập nhật');
                    $('#btnManageATP001s').button('enable');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');
                }
            });

            $('#btnManageATP001s').click(function () {

                var link = '/AirlineExt001/ATPExt001Manager?sq_atp_002_id=' + $(form_info.input_key_id).val();
                window.open(link, '_blank');

                return false;

            });

            initDate();

            var cities = new SS.services.cities();
            cities.init();

            var airlines = new SS.services.airlines();
            airlines.init();

            var countries = new SS.services.countries();
            countries.init();

            setLinkSEO();

            initFilterForm();
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