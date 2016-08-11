(function () {

    VA.views.marketing.ManagePromotionCode = function () {

        var _configs = {
        }

        var grid_manage_promotion_code_configs = null;

        var grid_manage_promotion_code_paged = null;

        var initGridManagePromotionCode = function () {

            grid_manage_promotion_code_configs = {
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

            grid_manage_promotion_code_configs.data = {
                package_name: 'PK_BD_PROMOTION_CODE',
                object_name: 'GET_LIST_PROMOTION_CODE',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var setGridConfigFromQueryString = function () {

            var context = new SS.core.helpers.context();

            var action = context.getQueryString('action');

            var option = action;

            var promotion_code = context.getQueryString('promotion_code');

            var conditions = {};

            conditions.PROMOTION_CODE = {};

            if (isEmpty(promotion_code) == false) {
                promotion_code = promotion_code.trim();

                conditions.PROMOTION_CODE.PROMOTION_CODE = promotion_code;
            }

            if (action == "view") {
                option = 'searching';
            }

            grid_manage_promotion_code_configs.data = {
                package_name: 'PK_BD_PROMOTION_CODE',
                object_name: 'GET_LIST_PROMOTION_CODE',
                p_conditions: JSON.stringify(conditions)
            };

            grid_manage_promotion_code_configs.onRenderComplete = function () {

                if (window.location.hash.indexOf('action_complete') >= 0) return;

                if (window.location.hash == "#option_seaching") return;

                if (action == "view") $('#insertUpdate').deserializeObjectToFormView({
                    tmpId: '#tmp_grid', idx: null, keyName: 'PROMOTION_CODE', keyValue: promotion_code
                });

                window.location.hash = 'action_complete';

            };
        }

        var renderGridManagePromotionCode = function (conditions) {

            if (conditions) {
                grid_manage_promotion_code_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_promotion_code_paged = new SS.core.GridPaged();

            grid_manage_promotion_code_paged.init(grid_manage_promotion_code_configs);
        }


        var initControls = function () {

            $('#btnSinhMa').click(function () {
                $('#box_sinhMa').show();

                return false;
            });

            initPromotionCodeEventSinhMa();

            initPromotionCodeEventSearch();

            initGridManagePromotionCode();

            setGridConfigFromQueryString();

            renderGridManagePromotionCode();

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



            $('#btnGenerate').click(function () {
              
                addSinhMa();

                

                return false;
            });


            initFilterForm();

            initPromotionCodeEvent();

            initPromotionCodeLog();
        }


        var initFilterForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });

            $('#btnXuatExcel', '#filterForm').click(function () {

                return execFilterForm(true);

            });
        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post.MB_ID = $('#MB_ID').val();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PROMOTION_CODE';

            data_post.object_name = 'INSERT_PROMOTION_CODE';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        renderGridManagePromotionCode();
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

            data_post.MB_ID = $('#MB_ID').val();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PROMOTION_CODE';

            data_post.object_name = 'UPDATE_PROMOTION_CODE';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        renderGridManagePromotionCode();
                        
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }



        function addSinhMa() {

            var form_valid = $('#sinhMa').validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $('#sinhMa').serializeObject();

            data_post.MB_ID = $('#MB_ID').val();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PROMOTION_CODE';

            data_post.object_name = 'GENERATE_PROMOTION_CODE';


            jwm.Alert.ShowAjaxProcessing('#sinhMa');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#sinhMa');
                    jwm.Alert.ShowMsg('#sinhMa', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        renderGridManagePromotionCode();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#sinhMa');
                    jwm.Alert.ShowMsg('#sinhMa', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var execFilterForm = function (exportFile) {

            var conditions = {
            };


            var promotion_code = $('#PROMOTION_CODE_ID').val();
            var status = $('#STATUS', '#filterForm').val();
            var ref_sq_id = $('#REF_SQ_ID', '#filterForm').val();
            var money = $('#MONEY', '#filterForm').autoNumeric('get');
            var ref_event_id = $('#REF_EVENT_ID_SEARCH', '#filterForm').val();

            conditions.PROMOTION_CODE = {};

            if (isEmpty(promotion_code) == false) {
                promotion_code = promotion_code.trim();

                conditions.PROMOTION_CODE.PROMOTION_CODE = promotion_code;
            }

            if (isEmpty(status) == false) {
                status = status.trim();

                conditions.PROMOTION_CODE.STATUS = status;
            }


            if (isEmpty(ref_sq_id) == false) {
                ref_sq_id = ref_sq_id.trim();

                conditions.PROMOTION_CODE.REF_SQ_ID = ref_sq_id;
            }


            if (isEmpty(money) == false) {
                money = money.trim();

                conditions.PROMOTION_CODE.MONEY = money;
            }


            if (isEmpty(ref_event_id) == false) {
                ref_event_id = ref_event_id.trim();

                conditions.PROMOTION_CODE.REF_EVENT_ID = ref_event_id;
            }

            if (exportFile == true) {

                _configs.args = {
                };

                _configs.args.DataForm = {
                };

                var config_popup = {
                    file_url: '/html/popup/accounting/ExportFile.html',
                    args: {
                        Title: 'Nhập thông tin kết xuất file',
                        DataForm: _configs.args.DataForm,
                        FunctionCallBack: function () {


                            var data_post_download = {
                                package_name: 'PK_BD_PROMOTION_CODE',
                                object_name: 'GET_LIST_PROMOTION_CODE_EXPORT',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(grid_manage_promotion_code_configs.ajax_url, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {
                
                //grid_manage_promotion_code_configs.data = {
                //    package_name: 'PK_BD_PROMOTION_CODE',
                //    object_name: 'GET_LIST_PROMOTION_CODE',
                //    p_conditions: JSON.stringify(conditions),
                //    row_start: 0,
                //    row_end: grid_manage_promotion_code_configs.page_size
                //};

                //grid_manage_promotion_code_paged.init(grid_manage_promotion_code_configs);

                //window.location.hash = "option_seaching";

                //return false;
                grid_manage_promotion_code_configs.data = {
                    package_name: 'PK_BD_PROMOTION_CODE',
                    object_name: 'GET_LIST_PROMOTION_CODE',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: grid_manage_promotion_code_configs.page_size

                };

                renderGridManagePromotionCode();

            }

            return false;
        }


        var initPromotionCodeLog = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewPromotionCode(sq_id);
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                return false;
            });
        }

        var viewPromotionCode = function (sqid) {

            var data_post = {
            };

            data_post.sq_id = sqid;

            jQuery.ajax({
                url: "/Marketing/ViewManagePromotionCodeLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewManagePromotionCodeLog').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        function initPromotionCodeEvent() {

            //nhan vien xu ly -> fill data

            var data_post = {};

            data_post.package_name = "PK_BD_PROMOTION_CODE_EVENT";

            data_post.object_name = "GET_LIST_EVENT";

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

                    jQuery('#tmp_Promotion_Code_Event').data('data_source', data_list);

                    jQuery('#REF_EVENT_ID').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_Promotion_Code_Event').tmpl(data_list).appendTo('#REF_EVENT_ID');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        function initPromotionCodeEventSearch() {

            //nhan vien xu ly -> fill data

            var data_post = {};

            data_post.package_name = "PK_BD_PROMOTION_CODE_EVENT";

            data_post.object_name = "GET_LIST_EVENT";

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: "json",
                type:'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Promotion_Code_Event').data('data_source', data_list);

                    jQuery('#REF_EVENT_ID_SEARCH').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_Promotion_Code_Event').tmpl(data_list).appendTo('#REF_EVENT_ID_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        function initPromotionCodeEventSinhMa() {

            //nhan vien xu ly -> fill data

            var data_post = {};

            data_post.package_name = "PK_BD_PROMOTION_CODE_EVENT";

            data_post.object_name = "GET_LIST_EVENT";

            jwm.Alert.HideAjaxProcessing('#sinhMa');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#sinhMa');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_Promotion_Code_Event').data('data_source', data_list);

                    jQuery('#REF_EVENT_ID_SM').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_Promotion_Code_Event').tmpl(data_list).appendTo('#REF_EVENT_ID_SM');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#sinhMa');
                    jwm.Alert.ShowMsg('#sinhMa', -1, message + " " + exc, 'Thông báo');
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
