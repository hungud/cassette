(function () {

    VA.views.accounting.ManagePaymentGoogleAds = function () {

        var _configs = {
        }

        var grid_google_ads_configs = null;

        var grid_google_ads_paged = null;

        var initGridGoogleAds = function () {

            grid_google_ads_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/accounting/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            };

            grid_google_ads_configs.data = {
                package_name: 'PK_BD_ACC_GOOGLE_ADS',
                object_name: 'GET_LIST_GOOGLE_ADS',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function add() {

            var money = $('#MONEY', '#insertUpdate').autoNumeric('get');
            var idate = $('#IDATE').val();

            if (!money) {

                jwm.Alert.ShowMsg('#formView', 0, 'Số tiền không được bỏ trống');
                $('#MONEY').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_ACC_GOOGLE_ADS';

            data_post.object_name = 'INSERT_GOOGLE_ADS';

            data_post.p_MONEY = money;

            data_post.p_IDATE = idate;

            data_post.p_MB_ID = jLoki.User.Status.GmId;

            jwm.Alert.ShowAjaxProcessing('#formView');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/accounting/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#formView');
                    jwm.Alert.ShowMsg('#formView', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        $('#MONEY').val('');
                     
                        renderGridGoogleAds();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#formView');
                    jwm.Alert.ShowMsg('#formView', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {
                   
            var data_post = {};

            data_post.package_name = 'PK_BD_ACC_GOOGLE_ADS';

            data_post.object_name = 'UPDATE_GOOGLE_ADS';

            data_post.P_MB_ID = jLoki.User.Status.GmId;

            data_post.P_SQ_ID = $('#SQ_ID_HIDDEN').val();

            data_post.p_MONEY = $('#MONEY', '#insertUpdate').autoNumeric('get');

            data_post.p_IDATE = $('#IDATE').val();

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/accounting/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#viewmanagegoogleadslog');
                    jwm.Alert.ShowMsg('#viewmanagegoogleadslog', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        renderGridGoogleAds();
                        viewManagePaymentGoogleAds(data_post.P_SQ_ID);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#viewmanagegoogleadslog');
                    jwm.Alert.ShowMsg('#viewmanagegoogleadslog', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }


        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewManagePaymentGoogleAds(sq_id);
                return false;
            });
        }

        var viewManagePaymentGoogleAds = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/Accounting/ViewManageGoogleAdsLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanagegoogleadslog').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        var renderGridGoogleAds = function (conditions) {

            if (conditions) {
                grid_google_ads_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_google_ads_paged = new SS.core.GridPaged();

            grid_google_ads_paged.init(grid_google_ads_configs);
        }

        var initPaymentGoogleAdsDate = function () {

            $('#IDATE').datepick({
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
                defaultDate: 5,
                minDate: '-329D',
                maxDate: '+329D',
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



        var initControls = function () {

            initGridGoogleAds();

            renderGridGoogleAds();

            initInsertUpdateForm();

            initPaymentGoogleAdsDate();

            jQuery('#btnAddgoogleads').click(function () {
                $('#btnAddgoogleads').show();
                $('#btnUpdategoogleads').hide();
                if (jQuery('#SQ_ID').val() >"0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {
               
                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddgoogleads').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
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