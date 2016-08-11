(function () {

    VA.views.airline.ManageTicketingVn = function () {

        var _configs = {
        }


        var _grid_paged = null;

        var _grid_paged_config = null;

        var initGrid = function () {

            _grid_paged_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + '/MembershipExt.asmx/GetListTwmb001RoundAction',
                page_size: 10,
                row_start: 0,
                row_end: 10,
                onRenderComplete: function () {

                    initToggleUpdateRoundAction();

                }
            }
        }
       

        var renderGrid = function () {
            _grid_paged = new SS.core.GridPaged();
            _grid_paged.init(_grid_paged_config);
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

            var mb_id = $('#MB_ID', '#filterForm').val();

            var full_name = $('#FULL_NAME', '#filterForm').val();

            var office_department_id = $('#OFFICE_DEPARTMENT_ID', '#filterForm').val();

            var nk_nm = $('#NK_NM', '#filterForm').val();

            var eml = $('#EML', '#filterForm').val();

            var round_action_status = $('#ROUND_ACTION_STATUS', '#filterForm').val();

            var conditions = new Array();

            //--------------------------------------------------------
            //Check input
            if (isEmpty(mb_id) == false) {
                mb_id = mb_id.trim();
                conditions.push('(a.mb_id = ' + mb_id + ')');
            }

            if (isEmpty(full_name) == false) {
                full_name = full_name.trim();
                conditions.push("(regexp_like(a.full_name,'" + full_name + "','i'))");
            }

            if (isEmpty(office_department_id) == false) {
                office_department_id = office_department_id.trim();
                conditions.push('(a.office_department_id = ' + office_department_id + ')');
            }

            if (isEmpty(nk_nm) == false) {
                nk_nm = nk_nm.trim();
                conditions.push("(regexp_like(a.nk_nm,'" + nk_nm + "','i'))");
            }

            if (isEmpty(eml) == false) {
                eml = eml.trim();
                conditions.push("(regexp_like(a.eml,'" + eml + "','i'))");
            }

            if (isEmpty(round_action_status) == false) {
                round_action_status = round_action_status.trim();
                conditions.push('(a.mb_id in (select mb_id from vietair.twmb_round_action where office_department_id = a.office_department_id and status = ' + round_action_status + '))');
            }

            //fix dua ve trang dau tien, row_start = 0, row_end = 10
            _grid_paged_config.data = {
                op: 'searching', conditions: JSON.stringify(conditions)
            };

            _grid_paged.init(_grid_paged_config);

            window.location.hash = "option_seaching";

            return false;
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

                    jQuery('#tmp_ListOfficeDepartments').tmpl(data_list).appendTo('#filterForm #OFFICE_DEPARTMENT_ID');

                    jQuery('#tmp_ListOfficeDepartments').tmpl(data_list).appendTo('#insertUpdate #OFFICE_DEPARTMENT_ID');


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

        var initToggleUpdateRoundAction = function () {


            $('.itoggle_round_action_status', '#itoggle').iToggle({
                easing: 'easeOutExpo',
                onSlideOn: function () {
                    var input_id = '#' + $(this).attr('for');
                    var mb_id = $(input_id).attr('data-mb-id');
                    var round_action_status = 1;
                    updateRoundActionStatus(mb_id, round_action_status);
                },
                onSlideOff: function () {
                    var input_id = '#' + $(this).attr('for');
                    var mb_id = $(input_id).attr('data-mb-id');
                    var round_action_status = 0;
                    updateRoundActionStatus(mb_id, round_action_status);
                }
            });

        }

        var updateRoundActionStatus = function (mbId, roundActionStatus) {

            var data_post = {
            };
            data_post.mb_id = mbId;
            data_post.status = roundActionStatus;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/MembershipExt.asmx/UpdateRoundActionStatus",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    _grid_paged.renderGrid();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initControls = function () {

            initGrid();

            renderGrid();

            initFilterForm();

            getListOfficeDepartments();

            getListOfficePositions();

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                $('#insertUpdateDiv').css('display', '');
                if (_configs.current_mb_id_selected != e.objectForm.mb_id) {
                    _configs.current_mb_id_selected = e.objectForm.mb_id;
                    _configs.current_init_fancy_tree_ready = false;
                    initFancyTree();
                }
            });

            jQuery('#btnAddUpdate').click(function () {
                UpdateUser();
                return false;
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