(function () {

    VA.views.customerTour.ManageCustomerTourInformation = function () {

        var _configs = {
        }

        var grid_manage_customer_tour_information_configs = null;

        var grid_manage_customer_tour_information_paged = null;

        var initGridManageCustomerTourInformation = function () {

            grid_manage_customer_tour_information_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service05/customer/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_customer_tour_information_configs.data = {
                package_name: 'PK_BD_CUSTOMER_TOUR_INFO',
                object_name: 'GET_LIST_CUSTOMER_TOUR_INFO',
                p_conditions: JSON.stringify(conditions)
            };

        }

       
       
        var renderGridManageCustomerTourInformation = function (conditions) {

            if (conditions) {
                grid_manage_customer_tour_information_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_customer_tour_information_paged = new SS.core.GridPaged();

            grid_manage_customer_tour_information_paged.init(grid_manage_customer_tour_information_configs);
        }


        var initControls = function () {

            initGridManageCustomerTourInformation();
          

            renderGridManageCustomerTourInformation();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                //$('#btnAddUpdate1').hide();
                if (jQuery('#SQ_ID').val() > "0") {

                    return update();
                }
                else {

                    return add();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

               // console.log(e);

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });

            initPartnerTourType();
            
            initPartnerTourPosition();
            // khoi tao du lieu search loai doi tac
            initSearchPartnerTourType();
            // khoi tao du lieu search chuc danh
            initSearchPartnerTourPosition();

            //search du lieu tren form
            initFilterForm();
            //view them ghi chu khach hang
            initViewCustomerTourNote();

           
        }

        //lay sq_id khach hang va show them ghi chu
        var initViewCustomerTourNote = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {

                var sq_id = $(this).attr('data-view-sq-id');

                var full_name = $(this).attr('data-view-full-name');

               // alert(full_name);
                viewCustomerTourNote(sq_id, full_name);

                return false;
            });

        }



        var viewCustomerTourNote = function (sqId,fullName) {

            var data_post = {
            };


           // console.log(refCustomerTourId);
            data_post.sq_id = sqId;

            data_post.full_name = fullName;

            jwm.Alert.ShowAjaxProcessing('#viewManageCustomerTourNote');

            jQuery.ajax({
                url: "/CustomerTour/ViewCustomerTourNote",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#viewManageCustomerTourNote');
                    $('#formView').empty();
                    $('#formView').html(data);
                  
                    $('#viewManageCustomerTourNote').show();

                    $('html, body').animate({
                        scrollTop: $("#viewManageCustomerTourNote").offset().top
                    }, 100);

                    initInsertCustomerTourNote();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#viewManageCustomerTourNote');
                    jwm.Alert.ShowMsg('#viewManageCustomerTourNote', -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        // goi popup them chi chu 
        var initInsertCustomerTourNote = function () {

            var data_form = $('#REF_CUSTOMER_TOUR_ID').val();

            console.log(data_form);

            $('a[data-customer-tour-note]').unbind('click');

            $('a[data-customer-tour-note]').click(function () {
              
                var config_popup = {
                    file_url: '/html/popup/customerTour/ConfirmNoteBooking.html',
                    args: {
                        Title: 'Thêm ghi chú khách hàng mã ' + data_form,
                        DataForm: data_form,
                        FunctionCallBack: insertCustomerTourNote,
                        REF_CUSTOMER_TOUR_ID: data_form
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);

                return false;

            })
        }

        //insert vao bang ghi chu thong tin khach hang(bang CUSTOMER_TOUR_NOTE)
        var insertCustomerTourNote = function (note, refCustomerTourId) {

            jwm.Alert.ShowAjaxProcessing("#block_customer_tour_note", true);

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: {
                    op: "PACKAGE_HTTP_POST",
                    path_ajax_post: '/service05/customer/get',
                    PACKAGE_NAME: 'PK_BD_CUSTOMER_TOUR_NOTE',
                    OBJECT_NAME: 'INSERT_ROW',
                    P_NOTE: note,
                    P_REF_CUSTOMER_TOUR_ID: refCustomerTourId,
                    P_MB_ID: jLoki.User.Status.GmId,
                    P_ROW_START: 0,
                    P_ROW_END: 10
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#block_customer_tour_note", true);

                   $(document).trigger('REFRESH_GRID_CUSTOMER_TOUR_NOTE');

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing("#block_customer_tour_note", true);
                    jwm.Alert.ShowMsg("#block_customer_tour_note", -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        //search cac tieu chi tren form
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

        //them thong tin doi tac khach hag
        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_CUSTOMER_TOUR_INFO';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service05/customer/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_customer_tour_information_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        // cap nhat thong tin doi tac khach hang
        function update() {



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_CUSTOMER_TOUR_INFO';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service05/customer/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_customer_tour_information_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }



        //thuc hien chuc nang tim kiem cac thong tin doi tac
        var execFilterForm = function (exportFile) {

            var conditions = {
            };


            var ref_partner_tour_id = $('#OPT_REF_PARTNER_TOUR_ID').val();
            var email = $('#EMAIL', '#filterForm').val();
            var mobile = $('#MOBILE', '#filterForm').val();

            var company = $('#COMPANY', '#filterForm').val();
            var ref_partner_position_id = $('#OPT_REF_PARTNER_POSITION_ID', '#filterForm').val();


         

            conditions.CUSTOMER_TOUR_INFORMATION = {};

            if (isEmpty(ref_partner_tour_id) == false) {
                ref_partner_tour_id = ref_partner_tour_id.trim();

                conditions.CUSTOMER_TOUR_INFORMATION.REF_PARTNER_TOUR_ID = ref_partner_tour_id;
            }

            if (isEmpty(email) == false) {
                email = email.trim();

                conditions.CUSTOMER_TOUR_INFORMATION.EMAIL = email;
            }


            if (isEmpty(mobile) == false) {
                mobile = mobile.trim();

                conditions.CUSTOMER_TOUR_INFORMATION.MOBILE = mobile;
            }

            if (isEmpty(company) == false) {
                company = company.trim();

                conditions.CUSTOMER_TOUR_INFORMATION.COMPANY = company;
            }


            if (isEmpty(ref_partner_position_id) == false) {
                ref_partner_position_id = ref_partner_position_id.trim();

                conditions.CUSTOMER_TOUR_INFORMATION.REF_PARTNER_POSITION_ID = ref_partner_position_id;
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
                                package_name: 'PK_BD_CUSTOMER_TOUR_INFO',
                                object_name: 'GET_LIST_CUSTOMER_TOUR_EXPORT',
                                p_row_start: 0,
                                p_row_end: _configs.args.DataForm.export_total_row,
                                p_conditions: JSON.stringify(conditions),
                                ExportFile: true
                            };

                            ajax_download(grid_manage_customer_tour_information_configs.ajax_url, data_post_download);


                        }
                    }
                };

                var popup_file = new SS.core.helpers.PopupFileHtml();

                popup_file.init(config_popup);


            }
            else {

                grid_manage_customer_tour_information_configs.data = {
                    package_name: 'PK_BD_CUSTOMER_TOUR_INFO',
                    object_name: 'GET_LIST_CUSTOMER_TOUR_INFO',
                    p_conditions: JSON.stringify(conditions),
                    row_start: 0,
                    row_end: grid_manage_customer_tour_information_configs.page_size

                };

                renderGridManageCustomerTourInformation();

            }

            return false;
        }


     
        // khoi tao du lieu doi tac khach hang 
        function initPartnerTourType() {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service05/customer/get';

            data.PACKAGE_NAME = 'PK_BD_PARTNER_TOUR_TYPE';

            data.OBJECT_NAME = 'GET_LIST_PARTNER_TOUR_TYPE';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({

            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {

                        
                        $('#REF_PARTNER_TOUR_ID', '#insertUpdate').empty();

                        jQuery('#REF_PARTNER_TOUR_ID', '#insertUpdate').html('<option value="">-- [ Chọn loại đối tác] --</option>');

                        $('#tmp_Partner_Tour_Type').tmpl(resp.Data.CURSOR_DATA).appendTo("#REF_PARTNER_TOUR_ID", '#insertUpdate');


                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        // khoi tao chuc dah ng lien he 
        function initPartnerTourPosition() {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service05/customer/get';

            data.PACKAGE_NAME = 'PK_BD_PARTNER_TOUR_POSITION';

            data.OBJECT_NAME = 'GET_LIST_PARTNER_TOUR_POSITION';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({
                
            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#REF_PARTNER_POSITION_ID').empty();

                        jQuery('#REF_PARTNER_POSITION_ID').html('<option value="">-- [ Chọn chức vụ ] --</option>');

                        $('#tmp_Partner_Tour_Position').tmpl(resp.Data.CURSOR_DATA).appendTo("#REF_PARTNER_POSITION_ID");


                    }

                },

                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        // khoi tao du lieu search cua doi tac
        function initSearchPartnerTourType() {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service05/customer/get';

            data.PACKAGE_NAME = 'PK_BD_PARTNER_TOUR_TYPE';

            data.OBJECT_NAME = 'GET_LIST_PARTNER_TOUR_TYPE';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({

            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#OPT_REF_PARTNER_TOUR_ID').empty();

                        jQuery('#OPT_REF_PARTNER_TOUR_ID').html('<option value="">-- [ Chọn loại đối tác] --</option>');

                        $('#tmp_Partner_Tour_Type').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_REF_PARTNER_TOUR_ID");


                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        //khoi tao du lieu search chuc vu doi tac
        function initSearchPartnerTourPosition() {


            var data = {};

            data.op = "PACKAGE_HTTP_POST";

            data.path_ajax_post = '/service05/customer/get';

            data.PACKAGE_NAME = 'PK_BD_PARTNER_TOUR_POSITION';

            data.OBJECT_NAME = 'GET_LIST_PARTNER_TOUR_POSITION';

            data.P_ROW_START = 0;

            data.P_ROW_END = 999999999;


            data.P_CONDITIONS = JSON.stringify({

            });

            jQuery.ajax({

                url: "/Handler/CoreHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data,
                success: function (resp) {

                    if (resp != null && resp.TypeMsg > 0) {


                        $('#OPT_REF_PARTNER_POSITION_ID').empty();

                        jQuery('#OPT_REF_PARTNER_POSITION_ID').html('<option value="">-- [ Chọn chức vụ] --</option>');

                        $('#tmp_Partner_Tour_Position').tmpl(resp.Data.CURSOR_DATA).appendTo("#OPT_REF_PARTNER_POSITION_ID");


                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
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
