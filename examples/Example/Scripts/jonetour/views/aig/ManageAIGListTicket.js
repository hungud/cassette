(function () {

    VA.views.aig.ManageAIGListTicket = function () {

        var _configs = {
        }

        var grid_manage_aig_list_ticket_configs = null;

        var grid_manage_aig_list_ticket_paged = null;

        var initGridManageAigListTicket = function () {

            grid_manage_aig_list_ticket_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_aig_list_ticket_configs.data = {
                package_name: 'PK_BD_AIG_LIST_TICKET',
                object_name: 'GET_LIST_AIG_TICKET',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridManageAigListTicket = function (conditions) {

            if (conditions) {
                grid_manage_aig_list_ticket_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_aig_list_ticket_paged = new SS.core.GridPaged();

            grid_manage_aig_list_ticket_paged.init(grid_manage_aig_list_ticket_configs);
        }


        var initControls = function () {

            initGridManageAigListTicket();

            renderGridManageAigListTicket();

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


            initDataAigTicket();

            initDataAigTicketSearch();

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

            var ref_type_day_id = $('#REF_TYPE_DAYS_ID_SEARCH', '#filterForm').val();
            var ref_type_region_id = $('#REF_TYPE_REGION_ID_SEARCH', '#filterForm').val();
            var ref_aig_class_type_id = $('#REF_AIG_CLASS_TYPE_ID_SEARCH', '#filterForm').val();
           
            conditions.TYPE_DAYS = {};
            conditions.TYPE_REGION = {};
            conditions.AIG_CLASS_TYPE = {};

            if (isEmpty(ref_type_day_id) == false) {
                ref_type_day_id = ref_type_day_id.trim();

                conditions.TYPE_DAYS.SQ_ID = ref_type_day_id;
            }

            if (isEmpty(ref_type_region_id) == false) {
                ref_type_region_id = ref_type_region_id.trim();

                conditions.TYPE_REGION.SQ_ID = ref_type_region_id;
            }

            if (isEmpty(ref_aig_class_type_id) == false) {
                ref_aig_class_type_id = ref_aig_class_type_id.trim();

                conditions.AIG_CLASS_TYPE.SQ_ID = ref_aig_class_type_id;
            }


            grid_manage_aig_list_ticket_configs.data = {
                package_name: 'PK_BD_AIG_LIST_TICKET',
                object_name: 'GET_LIST_AIG_TICKET',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_aig_list_ticket_configs.page_size
            };


            grid_manage_aig_list_ticket_paged = new SS.core.GridPaged();

            grid_manage_aig_list_ticket_paged.init(grid_manage_aig_list_ticket_configs);

            window.location.hash = "option_seaching";

            return false;
        }
        //khoi tao su kien trong phan cap nhat, them moi bang gia bao hiem
        function initDataAigTicket() {

            //khoi tao du lieu khu vuc
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_TYPE_REGION";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_type_region').data('data_source', data_list);

                    jQuery('#REF_TYPE_REGION_ID').html('<option value="">-- [ Chọn khu vực ] --</option>');

                    jQuery('#tmp_type_region').tmpl(data_list).appendTo('#REF_TYPE_REGION_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });


            //khoi tao du lieu loai bao hiem
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_AIG_CLASS_TYPE";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_aig_class_type').data('data_source', data_list);

                    jQuery('#REF_AIG_CLASS_TYPE_ID').html('<option value="">-- [ Chọn loại bảo hiểm ] --</option>');

                    jQuery('#tmp_aig_class_type').tmpl(data_list).appendTo('#REF_AIG_CLASS_TYPE_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });


            //khoi tao du lieu loai ngay
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_TYPE_DAYS";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_type_days').data('data_source', data_list);

                    jQuery('#REF_TYPE_DAYS_ID').html('<option value="">-- [ Chọn khoảng ngày ] --</option>');

                    jQuery('#tmp_type_days').tmpl(data_list).appendTo('#REF_TYPE_DAYS_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        function initDataAigTicketSearch() {

            //khoi tao du lieu khu vuc
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_TYPE_REGION";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_type_region').data('data_source', data_list);

                    jQuery('#REF_TYPE_REGION_ID_SEARCH').html('<option value="">-- [ Chọn khu vực ] --</option>');

                    jQuery('#tmp_type_region').tmpl(data_list).appendTo('#REF_TYPE_REGION_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });


            //khoi tao du lieu loai bao hiem
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_AIG_CLASS_TYPE";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_aig_class_type').data('data_source', data_list);

                    jQuery('#REF_AIG_CLASS_TYPE_ID_SEARCH').html('<option value="">-- [ Chọn loại bảo hiểm ] --</option>');

                    jQuery('#tmp_aig_class_type').tmpl(data_list).appendTo('#REF_AIG_CLASS_TYPE_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });


            //khoi tao du lieu loai ngay
            var data_post = {};

            data_post.package_name = "PK_BD_AIG_LIST_TICKET";

            data_post.object_name = "GET_LIST_TYPE_DAYS";

            jwm.Alert.HideAjaxProcessing('#insertUpdate');
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_type_days').data('data_source', data_list);

                    jQuery('#REF_TYPE_DAYS_ID_SEARCH').html('<option value="">-- [ Chọn khoảng ngày ] --</option>');

                    jQuery('#tmp_type_days').tmpl(data_list).appendTo('#REF_TYPE_DAYS_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_AIG_LIST_TICKET';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_aig_list_ticket_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_AIG_LIST_TICKET';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/aig/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_aig_list_ticket_paged.renderGrid();

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

            _configs.SERVICE_WSS_ROOT_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
