(function () {

    VA.views.tour.ManageArrivalPlace = function () {

        var _configs = {
        }

        var grid_manage_arrival_place_configs = null;

        var grid_manage_arrival_place_paged = null;

        var initGridManageArrivalPlace = function () {

            grid_manage_arrival_place_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };

            var conditions = {

            };
          

            grid_manage_arrival_place_configs.data = {
                package_name: 'PK_BD_TOUR_ARRIVAL_PLACES',
                object_name: 'GET_LIST_TOUR_ARRIVAL_PLACES',
                p_conditions: JSON.stringify(conditions)
            };
        }

        

        var renderGridManageArrivalPlace = function (conditions) {

            if (conditions) {
                grid_manage_arrival_place_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_arrival_place_paged = new SS.core.GridPaged();

            grid_manage_arrival_place_paged.init(grid_manage_arrival_place_configs);
        }


        
        var initControls = function () {
           
            initGridManageArrivalPlace();

            renderGridManageArrivalPlace();

            jQuery('#btnAddUpdate').click(function () {
                $('#btnAddUpdate').show();
                $('#btnAddUpdate1').hide();
                if (jQuery('#ARRIVE_PLACE_ID').val() > "0") {
                    return UpdateArrivalPlaces();
                }
                else {

                    return AddArrivalPlaces();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                setImageThumb(e.objectForm.IMAGE);

                if (jQuery('#ARRIVE_PLACE_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }

                CKEDITOR.instances.CONTENT.setData(e.objectForm.CONTENT);
            });



            initSearchForm();

           setLinkSEO();
          
            }


        var setLinkSEO = function() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }





        var initSearchForm = function () {
            $('#btnSearch', '#searchForm').click(function () {

                return execFilterForm();

            });

            $('#searchForm').enter(function () {

                return execFilterForm();

            });
        }



        var execFilterForm = function () {

            var conditions = {
            };

            var type_id = $('#TYPE_ID', '#searchForm').val();
           // var title_en = $('#txtSearch').val();

            var arrive_place_en = $('#ARRIVE_PLACE_EN', '#searchForm').val();

            conditions.ARRIVE_PLACES = {};

            if (isEmpty(type_id) == false) {
                type_id = type_id.trim();

                conditions.ARRIVE_PLACES.TYPE_ID = type_id;
            }

            if (isEmpty(arrive_place_en) == false) {
                arrive_place_en = arrive_place_en.trim();

                conditions.ARRIVE_PLACES.ARRIVE_PLACE_EN = arrive_place_en;
            }

            //if (isEmpty(title_en) == false) {
            //    title_en = title_en.trim();

            //    conditions.ARRIVE_PLACES.TITLE_EN = title_en;
            //}

            grid_manage_arrival_place_configs.data = {
                package_name: 'PK_BD_TOUR_ARRIVAL_PLACES',
                object_name: 'GET_LIST_TOUR_ARRIVAL_PLACES',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_arrival_place_configs.page_size
            };

            grid_manage_arrival_place_paged.init(grid_manage_arrival_place_configs);

            window.location.hash = "option_seaching";

            return false;
        }



        function AddArrivalPlaces() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------
            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_ARRIVAL_PLACES';

            data_post.object_name = 'INSERT_TOUR_ARRIVAL_PLACES';

            data_post.objects_decode_url = 'P_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');
            
            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_arrival_place_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }


        function UpdateArrivalPlaces() {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);


            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TOUR_ARRIVAL_PLACES';

            data_post.object_name = 'UPDATE_TOUR_ARRIVAL_PLACES';

            data_post.objects_decode_url = 'P_CONTENT';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_ROOT_URL + "/service03/tour/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Data.OUTPUT_PARAMS.R_ERROR_MESSAGE, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_arrival_place_paged.renderGrid();
                       
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