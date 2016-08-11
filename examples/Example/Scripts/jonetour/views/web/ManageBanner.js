(function () {

    VA.views.web.ManageBanner = function () {

        var _configs = {
        }

        var grid_banner_configs = null;

        var grid_banner_paged = null;

        var initGridBanner = function () {

            grid_banner_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/web/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };
       
            grid_banner_configs.data = {
                package_name: 'PK_BD_WEB_BANNER',
                object_name: 'GET_LIST_BANNER',
                p_conditions: JSON.stringify(conditions)
            };

        }


        function add() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_WEB_BANNER';

            data_post.object_name = 'INSERT_BANNER';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/web/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {

                        grid_banner_paged.renderGrid();
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

            data_post.package_name = 'PK_BD_WEB_BANNER';

            data_post.object_name = 'UPDATE_BANNER';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/web/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                    if (data.TypeMsg > 0) {
                        grid_banner_paged.renderGrid();
                        viewManageBannerIntl(data_post.P_SQ_ID);
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        function initBannerCodeSearch() {

            var data_post = {};

            data_post.package_name = "PK_BD_WEB_BANNER";

            data_post.object_name = "GET_LIST_BANNER_CODE";

            data_post.P_CONDITIONS = JSON.stringify({
                BANNER: {
                    SITE_ID: $('#SITE_ID').val()
                }
            });

            jwm.Alert.HideAjaxProcessing('#filterForm');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/web/get",
                dataType: "json",
                type: 'POST',
                data: data_post,
                async: false,//bat buoc ajax phai ket thuc thi moi thuc hien hanh dong khac
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');

                    var data_list = {
                    }

                    data_list.value = resp.Data.CURSOR_DATA;

                    jQuery('#tmp_banner_code').data('data_source', data_list);

                    //jQuery('#EVENT_ID_SEARCH').html('<option value="">-- [ Chọn sự kiện ] --</option>');

                    jQuery('#tmp_banner_code').tmpl(data_list).appendTo('#BANNER_CODE_SEARCH');
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#filterForm');
                    jwm.Alert.ShowMsg('#filterForm', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var initInsertUpdateForm = function () {

            jQuery(document).on('click', 'a[data-view-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-view-sq-id');
                viewManageBannerIntl(sq_id);
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                return false;
            });
        }

        var viewManageBannerIntl = function (sqid) {

            var data_post = {
            };

            data_post.ref_sq_id = sqid;

            jQuery.ajax({
                url: "/Web/ViewManageBannerLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#viewmanagebannerlog').show();

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }


        var renderGridBannerIntl = function (conditions) {

            if (conditions) {
                grid_banner_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_banner_paged = new SS.core.GridPaged();

            grid_banner_paged.init(grid_banner_configs);
        }



        var execFilterForm = function () {

            var conditions = {
            };

            var se_banner_code = $('#BANNER_CODE_SEARCH', '#filterForm').val();
            var image_url = $('#IMAGE_URL_SEARCH').val();
            var link_title = $('#LINK_TITLE_SEARCH').val();
            var image_alt = $('#IMAGE_ALT_SEARCH').val();
         
            conditions.BANNER = {};

            conditions.BANNER.SITE_ID = $('#SITE_ID').val();

            if (isEmpty(se_banner_code) == false) {
                se_banner_code = se_banner_code.trim();
                
                conditions.BANNER.se_banner_code = se_banner_code;
            }


            if (isEmpty(image_url) == false) {
                image_url = image_url.trim();
              
                conditions.BANNER.image_url = image_url;
            }


            if (isEmpty(link_title) == false) {
                link_title = link_title.trim();
                
                conditions.BANNER.link_title = link_title;
            }

            if (isEmpty(image_alt) == false) {
                image_alt = image_alt.trim();
              
                conditions.BANNER.image_alt = image_alt;
            }


            grid_banner_configs.data = {
                package_name: 'PK_BD_WEB_BANNER',
                object_name: 'GET_LIST_BANNER',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_banner_configs.page_size
            };

            grid_banner_paged = new SS.core.GridPaged();

            grid_banner_paged.init(grid_banner_configs);

            window.location.hash = "option_seaching";

            return false;
        }


        var initControls = function () {

            initBannerCodeSearch();

            initGridBanner();

            execFilterForm();

            initInsertUpdateForm();

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

                setImageThumb(e.objectForm.IMAGE_URL);

                if (jQuery('#SQ_ID').val() != "0") {
                    $('#btnAddUpdate').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });

            

            initFilterForm();

           

        }

        var initFilterForm=function()
        {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

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