(function () {

    VA.views.thucpham3s.ManageTp3sCategories = function () {

        var _configs = {
        }

        var grid_manage_thucpham3s_categories_configs = null;

        var grid_manage_thucpham3s_categories_paged = null;

        var initGridManageThucpham3sCategories = function () {

            grid_manage_thucpham3s_categories_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                is_call_package: true,
                page_size: 10,
                row_start: 0,
                row_end: 10
            };

            var conditions = {

            };

            grid_manage_thucpham3s_categories_configs.data = {
                package_name: 'PK_BD_TP3S_CATEGORY',
                object_name: 'GET_LIST_TP3S_CATEGORY',
                p_conditions: JSON.stringify(conditions)
            };

        }


        var renderGridManageThucpham3sCategories = function (conditions) {

            if (conditions) {
                grid_manage_thucpham3s_categories_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_manage_thucpham3s_categories_paged = new SS.core.GridPaged();

            grid_manage_thucpham3s_categories_paged.init(grid_manage_thucpham3s_categories_configs);
        }


        //khoi tao du lieu phan danh muc cha
        var getDataAjaxFancyTree = function () {

            var conditions = {};

            conditions.CATEGORY = {};

            conditions.CATEGORY.parent_id = '0';


            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_TP3S_CATEGORY',
                    object_name: 'GET_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {
                       
                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            data_list.value = initLevelTitle(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#PARENT_ID', '#insertUpdate').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#PARENT_ID', '#insertUpdate');

                         
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#insertUpdate");
                    jwm.Alert.ShowMsg("#insertUpdate", -1, message + " " + exc, 'Thông báo');
                }
            });
        }



        var initCursorDataJson = function (list) {
            var data_rows = [];
            if (typeof (list) === 'string') {
                var cursor = eval('(' + list + ')');
                if (cursor.ROWSET) {
                    if (Object.prototype.toString.call(cursor.ROWSET) === '[object Array]') {
                        data_rows = cursor.ROWSET;
                    }
                    else if (cursor.ROWSET.ROW) {
                        data_rows.push(cursor.ROWSET.ROW);
                    }
                }
                else {
                    return null;
                }
            }
            else {
                data_rows = list;
            }
            for (var i = 0; i < data_rows.length; i++) {
                var row = data_rows[i];
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initCursorDataJson(row.CHILDREN);
                }
                else {
                    row.CHILDREN = null;
                }
            }
            return data_rows;
        }


        var initLevelTitle = function (treeList, parentTitle) {

            for (var idx = 0; idx < treeList.length; idx++) {

                var note = treeList[idx];

                if (parentTitle != null) {
                    note.LEVEL_TITLE = parentTitle + ' >> ' + note.TITLE;
                }
                else {
                    note.LEVEL_TITLE = note.TITLE;
                }

                if (note.CHILD_CNT > 0) {
                    note.CHILDREN = initLevelTitle(note.CHILDREN, note.TITLE);
                }

            }

            return treeList;
        }


        var execFilterForm = function () {

            var conditions = {
            };

            var title = $('#TITLE_SEARCH').val();

            var alias = $('#ALIAS_SEARCH').val();

            conditions.CATEGORY = {};
          

            if (isEmpty(title) == false) {
                title = title.trim();

                conditions.CATEGORY.TITLE = title;
            }

            if (isEmpty(alias) == false) {
                alias = alias.trim();

                conditions.CATEGORY.ALIAS = alias;
            }


            grid_manage_thucpham3s_categories_configs.data = {
                package_name: 'PK_BD_TP3S_CATEGORY',
                object_name: 'GET_LIST_TP3S_CATEGORY',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_manage_thucpham3s_categories_configs.page_size
            };


            grid_manage_thucpham3s_categories_paged = new SS.core.GridPaged();

            grid_manage_thucpham3s_categories_paged.init(grid_manage_thucpham3s_categories_configs);

            window.location.hash = "option_seaching";

            return false;
        }


        var initSearchForm = function () {
            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            });

            $('#filterForm').enter(function () {

                return execFilterForm();

            });
        }

        var initControls = function () {

            initGridManageThucpham3sCategories();

            renderGridManageThucpham3sCategories();


            jQuery('#btnAddCategory').click(function () {
                $('#btnAddCategory').show();
                if (jQuery('#SQ_ID').val() > "0") {

                    return updateCategory();
                }
                else {

                    return addCategory();
                }
            });


            jQuery(document).bind('deserializeObjectToForm', function (e) {

                setImageThumb(e.objectForm.IMAGE_THUMB);

                if (jQuery('#SQ_ID').val() != "") {
                    $('#btnAddCategory').val('Cập nhật');
                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }
            });

            setLinkSEO();

            getDataAjaxFancyTree();

            initSearchForm();

        }


        function addCategory() {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};
            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TP3S_CATEGORY';

            data_post.object_name = 'INSERT_ROW';


            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {

                        grid_manage_thucpham3s_categories_paged.renderGrid();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        function updateCategory() {



            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;
            //------------------------------------------------------

            var data_post = {};

            data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.package_name = 'PK_BD_TP3S_CATEGORY';

            data_post.object_name = 'UPDATE_ROW';

            jwm.Alert.ShowAjaxProcessing('#insertUpdate');

            jQuery.ajax({
                url: _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL + "/service03/tp3s/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');

                    if (resp.TypeMsg > 0) {
                        grid_manage_thucpham3s_categories_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#insertUpdate');
                    jwm.Alert.ShowMsg('#insertUpdate', -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;

        }

        function setLinkSEO() {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }


        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            _configs.SERVICE_WSS_THUC_PHAM_3S_COM_URL = $('#SERVICE_WSS_ROOT_URL').val();

            initControls();


        }

        return ({

            "init": init

        });

    };

}());
