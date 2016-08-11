(function () {

    VA.views.customerTour.ManagePartnerTourPosition = function () {

        var _configs = {
        }

        var grid_manage_partner_tour_position_configs = null;

        var grid_manage_partner_tour_position_paged = null;

        var initGridManagePartnerTourPosition = function () {

            grid_manage_partner_tour_position_configs = {
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

            grid_manage_partner_tour_position_configs.data = {
                package_name: 'PK_BD_PARTNER_TOUR_POSITION',
                object_name: 'GET_LIST_PARTNER_TOUR_POSITION',
                p_conditions: JSON.stringify(conditions)
            };

        }

       

        var renderGridManagePartnerTourPosition = function (conditions) {

            if (conditions) {
                grid_manage_partner_tour_position_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_partner_tour_position_paged = new SS.core.GridPaged();

            grid_manage_partner_tour_position_paged.init(grid_manage_partner_tour_position_configs);
        }


        var initControls = function () {

            initGridManagePartnerTourPosition();
          

            renderGridManagePartnerTourPosition();


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

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

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

            data_post.package_name = 'PK_BD_PARTNER_TOUR_POSITION';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service05/customer/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_partner_tour_position_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_PARTNER_TOUR_POSITION';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service05/customer/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_partner_tour_position_paged.renderGrid();

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
