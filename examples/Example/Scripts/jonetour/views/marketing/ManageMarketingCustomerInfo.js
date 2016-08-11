(function () {

    VA.views.marketing.ManageMarketingCustomerInfo = function () {

        var _configs = {
        }

        var grid_manage_marketing_customer_config = null;

        var grid_manage_marketing_customer_paged = null;

        var initGridContext = function () {

            grid_manage_marketing_customer_config = {
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


            conditions.CUSTOMER_INFORMATION = {};

            conditions.CUSTOMER_INFORMATION.SITE_ID = $('#SITE_ID').val();

            grid_manage_marketing_customer_config.data = {
                package_name: 'PK_BD_MRT_CUSTOMER_INFO',
                object_name: 'GET_LIST_CUSTOMER_INFO',
                p_conditions: JSON.stringify(conditions)
            };
            
        }

        var renderGrid = function (conditions) {


            if (conditions) {
                grid_manage_marketing_customer_config.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_marketing_customer_paged = new SS.core.GridPaged();

            grid_manage_marketing_customer_paged.init(grid_manage_marketing_customer_config);

        }


        var initControls = function () {

            initGridContext();

            renderGrid();

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

            initSearchForm();
           
        }

        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //---------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MRT_CUSTOMER_INFO';

            data_post.object_name = 'INSERT_CUSTOMER_INFO';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_marketing_customer_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function update() {

            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false)
                return false;

            //---------------------------------------------------------
            var data_post = {};

            data_post=$(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_MRT_CUSTOMER_INFO';

            data_post.object_name = 'UPDATE_CUSTOMER_INFO';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/marketing/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_marketing_customer_paged.renderGrid();
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;

        }


        var initSearchForm = function () {
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

        var execFilterForm = function (exportFile) {

            var conditions = {
            };

            var email = $('#EMAIL', '#filterForm').val();

            conditions.CUSTOMER_INFORMATION = {};
           

            if (isEmpty(email) == false) {
                email = email.trim();

                conditions.CUSTOMER_INFORMATION.EMAIL = email;
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
                                package_name: 'PK_BD_MRT_CUSTOMER_INFO',
                                object_name: 'GET_LIST_CUSTOMER_INFO_EXPORT',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(grid_manage_marketing_customer_config.ajax_url, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {

              
                grid_manage_marketing_customer_config.data = {
                    package_name: 'PK_BD_MRT_CUSTOMER_INFO',
                    object_name: 'GET_LIST_CUSTOMER_INFO',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: grid_manage_marketing_customer_config.page_size

                };

                renderGrid();

            }

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