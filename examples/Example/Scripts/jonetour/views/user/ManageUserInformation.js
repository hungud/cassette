(function () {

    VA.views.user.ManageUserInformation = function () {

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

        var initUserRating = function () {

            $('[data-user-rating]').barrating({
                theme: 'css-stars',
                showSelectedRating: false,
                initialRating: 4.5,
                hoverState: false
            });
        }

        function update() {

            var account_order = $('#ACCOUNT_ORDER', '#insertUpdate').autoNumeric('get');

            if (!account_order) {

                jwm.Alert.ShowMsg('#formView', 0, 'Số thứ tự không được bỏ trống!');
                $('#ACCOUNT_ORDER').focus();
                return false;
            }

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_ACCOUNT_INFO';

            data_post.object_name = 'UPDATE_ACCOUNT';

            var v_account_data = {
                ACCOUNT_INFO : $(_configs.form_id).serializeObject()
            }

            data_post.P_ACCOUNT_DATA = JSON.stringify(v_account_data);

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        renderListUser();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            $('html, body').animate({
                scrollTop: $("#filterForm").offset().top
            }, 100);

            return false;

        }

        var renderListUser = function (conditions) {

            if (conditions) {
                grid_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid = new SS.core.GridPaged();

            grid.init(grid_config);

        }

        var initBirthDay = function () {

            $("#BIRTHDAY").datepick({
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
                defaultDate: 0,
                yearRange: '1950:2030',
                showAnim: false,
                changeMonth: true,
                changeYear: true,
                beforeShowDay: null,
                selectFirst: true,
                showButtonPanel: true,
                ViewsHeaderVisibility: false,
                duration: 'fast',
                onSelect: null,
                beforeShow: null
            });
        }

        var getListOfficeDepartments = function () {

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/MembershipExt.asmx/GetListOfficeDepartments",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_ListOfficeDepartments').data('data_source', data_list);

                    jQuery('#tmp_ListOfficeDepartments').tmpl(data_list).appendTo('#OFFICE_DEPARTMENT_ID');


                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var getListOfficePositions = function () {
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/MembershipExt.asmx/GetListOfficePositions",
                dataType: "jsonp",
                data: {
                    rowStart: 0, rowEnd: 1000
                },
                success: function (data) {

                    var data_list = {
                    }

                    data_list.value = data.Data;

                    jQuery('#tmp_GetListOfficePositions').data('data_source', data_list);

                    jQuery('#tmp_GetListOfficePositions').tmpl(data_list).appendTo('#OFFICE_POSITION_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var initControls = function () {

            initGridViewListUser();

            renderListUser();

            jQuery('#btnAddUpdate1').click(function () {

                return update();

            });

            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "0") {

                    $('#boxupdate').show();

                    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                }

            });

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

            initBirthDay();

            getListOfficeDepartments();

            getListOfficePositions();
        }

        var execFilterForm = function () {
         
            var conditions = {
            };

            var se_full_name = $('#SE_FULL_NAME').val();
           
            conditions.TWMB001 = {};

            if (isEmpty(se_full_name) == false) {
                se_full_name = se_full_name.trim();
                conditions.TWMB001.se_full_name = se_full_name;
            }

            grid_config.data.p_conditions = JSON.stringify(conditions);

            renderListUser();

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