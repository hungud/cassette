(function () {

    VA.views.marketing.ManagePromotion001 = function () {

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


        var grid_manage_promotion_001_configs = null;

        var grid_manage_promotion_001_paged = null;

        var initGridManagePromotion001 = function () {

            grid_manage_promotion_001_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_promotion_001_configs.data = {
                package_name: 'PK_BD_PROMOTION_001',
                object_name: 'GET_LIST_PROMOTION_001',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridManagePromotion001 = function (conditions) {

            if (conditions) {
                grid_manage_promotion_001_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_promotion_001_paged = new SS.core.GridPaged();

            grid_manage_promotion_001_paged.init(grid_manage_promotion_001_configs);
        }


        var initControls = function () {



            initGridManagePromotion001();

            execFilterForm();


            // renderGridManagePromotion001();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }

            });

            initControlDateTime();

            initFilterForm();

            setMask();

            initPromotion001();

            $('#DEPARTURE_DATE_SEARCH', '#filterForm').datepick({
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

            initPromotion001EventSearch();

            initPromotion001Event();

        }

        //khoi tao su kien trong muc tim kiem
        function initPromotion001EventSearch() {

            var data_post = {};

            data_post.package_name = "PK_BD_PROMOTION_001_EVENT";

            data_post.object_name = "GET_LIST_PROMOTION_001_EVENT";

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Promotion_001_Event').data('data_source', data_list);

                    jQuery('#EVENT_ID_SEARCH').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_Promotion_001_Event').tmpl(data_list).appendTo('#EVENT_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        //khoi tao su kien trong phan cap nhat, them moi ve khuyen mai
        function initPromotion001Event() {

            var data_post = {};

            data_post.package_name = "PK_BD_PROMOTION_001_EVENT";

            data_post.object_name = "GET_LIST_PROMOTION_001_EVENT";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Promotion_001_Event').data('data_source', data_list);

                    jQuery('#EVENT_ID').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_Promotion_001_Event').tmpl(data_list).appendTo('#EVENT_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var initPromotion001 = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');

                viewPromotion001(sq_id);

                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                return false;
            });
        }

        //xem log ve khuyen mai
        var viewPromotion001 = function (sqid) {

            var data_post = {
            };

            data_post.sq_id = sqid;

            jQuery.ajax({
                url: "/Marketing/ViewManagePromotion001Log",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewManagePromotion001').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }



        var initControlDateTime = function () {

            $('#DEPARTURE_DATE').multiDatesPicker(
                 {
                     dateFormat: 'dd/mm/yy',
                     onSelect: function (dateText, inst) {
                         inst.settings.defaultDate = dateText;
                     }                    
                 }
             );

        }

        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PROMOTION_001';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_promotion_001_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_PROMOTION_001';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_promotion_001_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

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

            var status = $('#STATUS', '#filterForm').val();
            var departure_code = $('#DEPARTURE_CODE', '#filterForm').val();
            var arrival_code = $('#ARRIVAL_CODE', '#filterForm').val();
            var airline_code = $('#AIRLINE_CODE', '#filterForm').val();
            var departure_date = $('#DEPARTURE_DATE_SEARCH', '#filterForm').val();
            var event_id = $('#EVENT_ID_SEARCH', '#filterForm').val();
            var adt_net = $('#ADT_NET_SEARCH', '#filterForm').autoNumeric('get');
            var adt_net_promo = $('#ADT_NET_PROMO_SEARCH', '#filterForm').autoNumeric('get');

            conditions.SETTING_PROMOTION_001 = {};

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.SETTING_PROMOTION_001.STATUS = status;
            }

            if (isEmpty(departure_code) == false) {
                departure_code = departure_code.trim();

                conditions.SETTING_PROMOTION_001.DEPARTURE_CODE = departure_code;
            }

            if (isEmpty(arrival_code) == false) {
                arrival_code = arrival_code.trim();

                conditions.SETTING_PROMOTION_001.ARRIVAL_CODE = arrival_code;
            }

            if (isEmpty(airline_code) == false) {
                airline_code = airline_code.trim();

                conditions.SETTING_PROMOTION_001.AIRLINE_CODE = airline_code;
            }

            if (isEmpty(departure_date) == false) {
                departure_date = departure_date.trim();

                conditions.SETTING_PROMOTION_001.DEPARTURE_DATE = departure_date;
            }


            if (isEmpty(event_id) == false) {
                event_id = event_id.trim();

                conditions.SETTING_PROMOTION_001.EVENT_ID = event_id;
            }

            if (isEmpty(adt_net) == false) {
                adt_net = adt_net.trim();

                conditions.SETTING_PROMOTION_001.ADT_NET = adt_net;
            }


            if (isEmpty(adt_net_promo) == false) {
                adt_net_promo = adt_net_promo.trim();

                conditions.SETTING_PROMOTION_001.ADT_NET_PROMO = adt_net_promo;
            }

            grid_manage_promotion_001_configs.data = {
                package_name: 'PK_BD_PROMOTION_001',
                object_name: 'GET_LIST_PROMOTION_001',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_promotion_001_configs.page_size
            };


            grid_manage_promotion_001_paged = new SS.core.GridPaged();

            grid_manage_promotion_001_paged.init(grid_manage_promotion_001_configs);

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
