(function () {

    VA.views.marketing.ManagePromotionTicketEvent = function () {

        var _configs = {
        }

        var grid_manage_promotion_ticket_event_configs = null;

        var grid_manage_promotion_ticket_event_paged = null;

        var initGridManagePromotionTicketEvent = function () {

            grid_manage_promotion_ticket_event_configs = {
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

            grid_manage_promotion_ticket_event_configs.data = {
                package_name: 'PK_BD_PROMOTION_TICKET_EVENT',
                object_name: 'GET_LIST_PROMOTION_TIC_EVENT',
                p_conditions: JSON.stringify(conditions)
            };

        }

      
        var _RELEASE_DATE = "#RELEASE_DATE";

        var _EXPIRY_DATE = "#EXPIRY_DATE";

        var initControlDateTime = function () {

            $(_RELEASE_DATE).datetimepicker({
                format: 'd/m/Y',
                mask: true
            });
            $(_EXPIRY_DATE).datetimepicker({
                format: 'd/m/Y',
                mask: true
            });

        }
        var renderGridManagePromotionTicketEvent = function (conditions) {

            if (conditions) {
                grid_manage_promotion_ticket_event_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_promotion_ticket_event_paged = new SS.core.GridPaged();

            grid_manage_promotion_ticket_event_paged.init(grid_manage_promotion_ticket_event_configs);
        }


        var initControls = function () {

            initGridManagePromotionTicketEvent();

            renderGridManagePromotionTicketEvent();

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

                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddUpdate').val('Cập nhật');
                   jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });

            initControlDateTime();

        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

         
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_PROMOTION_TICKET_EVENT';

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

                        grid_manage_promotion_ticket_event_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_PROMOTION_TICKET_EVENT';

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
                        grid_manage_promotion_ticket_event_paged.renderGrid();

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

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
