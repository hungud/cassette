(function () {

    VA.views.hotels.ManageHotelInfoRoom = function () {

        var _configs = {
        }

        var grid_manage_hotel_info_room_configs = null;

        var grid_manage_hotel_info_room_paged = null;

        var initGridManageHotelRoomInfo = function () {

            grid_manage_hotel_info_room_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_hotel_info_room_configs.data = {
                package_name: 'PK_BD_HOTEL_INFO_ROOM',
                object_name: 'GET_LIST_HOTEL_INFO_ROOM',
                p_conditions: JSON.stringify(conditions)
            };

        }

     
        var renderGridManageHotelRoomInfo = function (conditions) {

            if (conditions) {
                grid_manage_hotel_info_room_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_hotel_info_room_paged = new SS.core.GridPaged();

            grid_manage_hotel_info_room_paged.init(grid_manage_hotel_info_room_configs);
        }


        function initRefHotelIdFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_hotel_id = context.getQueryString('ref_hotel_id');

            $('#REF_HOTEL_ID').val(ref_hotel_id);

        }


        function setGridConfigFromQueryString() {

            var context = new SS.core.helpers.context();

            var ref_hotel_id = context.getQueryString('ref_hotel_id');

            var action = context.getQueryString('action');

            var option = action;

            if (action == "view") {
                option = 'searching';
            }

            var conditions = {
            };

            conditions.HOTEL_INFO_ROOM = {};

            if (isEmpty(ref_hotel_id) == false) {
                ref_hotel_id = ref_hotel_id.trim();
                conditions.HOTEL_INFO_ROOM.REF_HOTEL_ID = ref_hotel_id;
            }

            grid_manage_hotel_info_room_configs.data = {
                package_name: 'PK_BD_HOTEL_INFO_ROOM',
                object_name: 'GET_LIST_HOTEL_INFO_ROOM',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_hotel_info_room_configs.page_size
            };
        }


        var initControls = function () {

            initRefHotelIdFromQueryString();

            initGridManageHotelRoomInfo();

            setGridConfigFromQueryString();
           
            renderGridManageHotelRoomInfo();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                if (jQuery('#SQ_ID').val() > "") {

                    return updateHotelRoom();
                }
                else {

                    return addHotelRoom();
                }
            });

          
            jQuery(document).bind('deserializeObjectToForm', function (e) {

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                 
                    }

            });

            initDateTime();

        
        }

        var initDateTime=function()
        {
            $('#FROM_DATE').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

            $('#TO_DATE').datetimepicker({
                format: 'd/m/Y',
                timepicker: false,
                mask: true,
                lang: 'vn'

            });

        }

        function addHotelRoom() {

           
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

         
            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_HOTEL_INFO_ROOM';

            data_post.object_name = 'INSERT_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_hotel_info_room_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function updateHotelRoom() {

          
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();


            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_HOTEL_INFO_ROOM';

            data_post.object_name = 'UPDATE_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/hotel/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_hotel_info_room_paged.renderGrid();

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
