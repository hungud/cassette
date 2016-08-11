(function () {

    VA.views.customer.ManageCustomer001 = function () {

        var _configs = {
        }

        var grid_config = null;

        var grid = null;

        var initGridContext = function () {

            grid_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {
            }

            grid_config.data = {
                package_name: 'PK_BD_CUSTOMER',
                object_name: 'GET_LIST_CUSTOMER_001',
                p_conditions: JSON.stringify(conditions)
            };

        }

        var renderGrid = function () {

            grid = new SS.core.GridPaged();
            grid.init(grid_config);

        }

        var renderCustomer001 = function (conditions) {

            if (conditions) {
                grid_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid = new SS.core.GridPaged();

            grid.init(grid_config);
        }

        function update() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.P_MB_ID = jLoki.User.Status.GmId;

            data_post.P_CTM_SEX = $("input:radio[name='CTM_SEX']:checked").val();

            data_post.package_name = 'PK_BD_CUSTOMER';

            data_post.object_name = 'UPDATE_CUSTOMER_001';
  
            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                       
                        grid.renderGrid();
                        viewManageCustomer(data_post.P_SQ_ID);
                      

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;

        }

        var getSex = function (sq_id) {

            var conditions = {
            };

            conditions.P_SQ_ID = sq_id;

            jQuery.ajax({

                url: _configs.service_wss_vietair_tv_url + "/service03/customer/get",
                dataType: 'json',
                type: 'POST',
                data: {
                    package_name: 'PK_BD_CUSTOMER',
                    object_name: 'GET_CUSTOMER_SEX',
                    P_SQ_ID: conditions.P_SQ_ID
                },
                success: function (data) {

                    if (data != null && data.TypeMsg > 0) {

                        $('input[data-sex="' + data.Data.CURSOR_DATA[0].CTM_SEX + '"]').attr('checked', true);
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id, true);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewManageCustomer(sq_id);
                return false;
            });
        }

        var viewManageCustomer = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/Customer/ViewManageCustomer001Log",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanagecustomer001log').show();

                    $('html, body').animate({
                        scrollTop: $("#viewmanagecustomer001log").offset().top
                    }, 100);

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var execFilterForm = function (exportFile) {

            var conditions = {
            };

            var se_ctm_code = $('#SE_CTM_CODE').val();

            var se_full_name = $('#SE_FULL_NAME').val();

            var mobile = $('#MOBILE', '#filterForm').val();

            var email = $('#EMAIL', '#filterForm').val();

            var ctm_group_name = $('#CTM_GROUP_NAME', '#filterForm').val();



            conditions.CTM_001 = {};

            conditions.SETTING_POLICY_CUSTOMER_001 = {};

            if (isEmpty(se_ctm_code) == false) {
                se_ctm_code = se_ctm_code.trim();
                conditions.CTM_001.se_ctm_code = se_ctm_code;
            }

            if (isEmpty(se_full_name) == false) {
                se_full_name = se_full_name.trim();
                conditions.CTM_001.se_full_name = se_full_name;
            }

            if (isEmpty(mobile) == false) {
                mobile = mobile.trim();
                conditions.CTM_001.MOBILE = mobile;
            }

            if (isEmpty(email) == false) {
                email = email.trim();
                conditions.CTM_001.EMAIL = email;
            }

            if (isEmpty(ctm_group_name) == false) {
                ctm_group_name = ctm_group_name.trim();
                conditions.SETTING_POLICY_CUSTOMER_001.SQ_ID = ctm_group_name;
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
                                package_name: 'PK_BD_CUSTOMER',
                                object_name: 'GET_LIST_CUSTOMER_001_EXPORT',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(grid_config.ajax_url, data_post_download);
                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {
                grid_config.data = {
                    package_name: 'PK_BD_CUSTOMER',
                    object_name: 'GET_LIST_CUSTOMER_001',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: grid_config.page_size

                };

                renderCustomer001();
            }

            return false; 
        }


        var initSearchCtmGroupName= function (typeId) {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service03/customer/get';

            data.PACKAGE_NAME = 'PK_BD_CUSTOMER';

            data.OBJECT_NAME = 'GET_LIST_POLICY_CTM_001';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999999;

            data.P_CONDITIONS = JSON.stringify({
              
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {
                        
                      
                        $('#CTM_GROUP_NAME').empty();

                        jQuery('#CTM_GROUP_NAME').html('<option value="">-- [ Chọn nhóm khách hàng ] --</option>');

                        $('#tmp_list_ctm_group_name').tmpl(resp.Data.CURSOR_DATA).appendTo("#CTM_GROUP_NAME");

                    }

                },

                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var initControls = function () {

            initGridContext();

            renderGrid();

            initInsertUpdateForm();

            initSearchCtmGroupName();

            jQuery(document).bind('deserializeObjectToForm', function (e) {
                getSex($('#SQ_ID_HIDDEN').val());

                $('#btnAddUpdate1').show();
            });

            jQuery('#btnAddUpdate1').click(function () {

                return update();
            });


            initSearchForm();

        }



        var initSearchForm = function ()
        {
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

        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initControls();

          

        }

        return ({

            "init": init

        });

    };

}());