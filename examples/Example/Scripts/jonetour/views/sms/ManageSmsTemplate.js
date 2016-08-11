(function () {

    VA.views.sms.ManageSmsTemplate = function () {

        var _configs = {
        }

        var form_info = null;

        var initFormInfo = function () {
            form_info = {
                form_id: '#insertUpdate',
                button_add_update_id: '#btnAddUpdate',
                input_key_id: '#SQ_ID',
                grid_paged: null,
                grid_configs: {
                    tmp_paged_selector: '#tmp_GridPaged',
                    paged_selector: '#grid_paged',
                    tmp_grid_selector: '#tmp_grid',
                    grid_selector: '#grid',
                    ajax_url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                    is_call_package: true,
                    page_size: 10,
                    row_start: 0,
                    row_end: 10
                },
                RenderGrid: function () {
                    form_info.grid_paged = new SS.core.GridPaged();
                    form_info.grid_paged.init(form_info.grid_configs);
                },
                InitContext: function () {
                    var context = new SS.core.helpers.context();
                    var sq_id = context.getQueryString('sq_id');
                    var conditions = {
                    };


                    var action = context.getQueryString('action');

                    var option = 'edit';

                    form_info.grid_configs.data = {
                        package_name: 'PK_BD_SMS_BRANDNAME',
                        object_name: 'GET_LIST_TEMPLATE',
                        p_conditions: JSON.stringify(conditions)
                    };

                    form_info.grid_configs.onRenderComplete = function () {
                        if (window.location.hash.indexOf('action_complete') >= 0) return;
                        if (action == "edit") $('#insertUpdate').deserializeObjectToForm('#tmp_grid', null,
                                'sq_id', sq_id);
                        window.location.hash = 'action_complete';
                    };
                }
            }
        }

        var viewInfo = function (sqId) {

            var data_post = {
            };

            data_post.sq_id = sqId;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: "/SMS/ViewBrandSmsTemplateInfoActionLog",
                dataType: 'html',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    $('#formView').empty();
                    $('#formView').html(data);
                    $('#ViewBrandSmsTemplateInfoActionLog').show();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;
        }

        var initCountTextArea = function () {
            $('#CONTENT').keyup(function () {
                var text_length = $('#CONTENT').val().length;
                var number_of_msg = Math.ceil(text_length / 160);
                if (number_of_msg == 0) {
                    number_of_msg = 1;
                }
                $('#count-of-text').text(text_length);
                $('#count-of-number-msg').text(number_of_msg);
            });
        }

        var initInsertUpdateForm = function () {


            jQuery(document).on('click', 'a[data-submit-sq-id]', function () {
                var sq_id = jQuery(this).attr('data-submit-sq-id');
                submitRow(sq_id);
                return false;
            });
            jQuery(document).on('click', 'a[data-view-sq-id]', function () {

                var sq_id = jQuery(this).attr('data-view-sq-id');

                viewInfo(sq_id);

                $('html, body').animate({
                    scrollTop: $("#ViewBrandSmsTemplateInfoActionLog").offset().top
                }, 100);

                return false;
            });
        }


        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {

            var conditions = {};

            conditions.parent_id = '0';

            jwm.Alert.ShowAjaxProcessing('#categories');

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: "json",
                data: {
                    package_name: 'PK_BD_SMS_TEMPLATE_CATEGORY',
                    object_name: 'GET_SMS_TEM_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing('#categories');

                    //jwm.Alert.ShowMsg("#categories", resp.TypeMsg, resp.Msg, 'VIETAIR-Thông báo');


                    if (resp.TypeMsg > 0) {
                        if (callback) {
                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            callback(resp.Data.CURSOR_DATA);
                        }
                    }

                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing('#categories');
                    jwm.Alert.ShowMsg('#categories', -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            var cat_ids = $('#CATEGORIES').val().split(',');

            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].SQ_ID + ' - ' + children[i].TITLE;
                node.key = children[i].SQ_ID;
                node.tooltip = children[i].TITLE;

                if ($.inArray(node.key + '', cat_ids) !== -1) {
                    node.selected = true;
                } else {
                    node.selected = false;
                }

                node.children = [];
                if (children[i].CHILD_CNT > 0) {
                    node.folder = true;
                    node.expanded = true;
                    node.children = prepareDataHierarchicalFancyTree(children[i].CHILDREN);
                }
                fancy_tree_children_data.push(node);
            }
            return fancy_tree_children_data;
        }

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#categories").fancytree("destroy");
            $("#categories").fancytree({
                checkbox: true,
                selectMode: 2,
                source: treeData,
                select: function (event, data) {
                    var cat_ids = [];
                    var nodes_selected = $("#categories").fancytree("getTree").getSelectedNodes();
                    $.each(nodes_selected, function (index, item) {
                        cat_ids.push(item.key);

                    });

                    var value_categories = cat_ids.join();

                    $('#CATEGORIES').val(value_categories)
                }
            });
        }



        var addSms = function () {

            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_SMS_BRANDNAME';

            data_post.object_name = 'INSERT_SMS_TEMPLATE';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {

                        form_info.grid_paged.renderGrid();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var updateSms = function () {
            var form_valid = $(_configs.form_id).validateForm();

            if (form_valid == false) return false;

            var data_post = $(_configs.form_id).serializeObject();

            data_post = addPrefixParamToObject(data_post, 'P_');

            data_post.p_mb_id = jLoki.User.Status.GmId;

            data_post.package_name = 'PK_BD_SMS_BRANDNAME';

            data_post.object_name = 'UPDATE_SMS_TEMPLATE';

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        form_info.grid_paged.renderGrid();
                        viewInfo(data_post.P_SQ_ID);

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var initLevelCheckBox = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_CHECK_BOX = getCheckBox(row.CATEGORY_ID);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelCheckBox(row.CHILDREN);
                }
            }
            return list;
        }

        var getCheckBox = function (category_id) {
            var checked = '';
            var categories = $('#CATEGORIES').val(); //11
            if (parseFloat(category_id) > 0) {

                var array = null;

                if (categories.indexOf(',') > 0) {
                    array = categories.split(',');
                }
                else {
                    array = new Array();
                    array.push(categories);
                }

                if (jQuery.inArray('' + category_id, array) >= 0)
                    checked = 'checked="checked"';
            }
            return '<input type="checkbox" value="' + category_id + '" ' + checked + ' onchange="selectCategories()" name="ck_categories" />';
        }

        var initLevelSpace = function (list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return list;
        }

        var getHtmlLevelSpace = function (level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }

        var setLinkSEO = function () {
            $('#TITLE').keyup(function () {
                var seo = new SEO();
                var title = seo.getTitleSeo($('#TITLE').val());
                $('#TITLE_EN').val(title);
            });
        }

        //-----------------------------------------------------
        var initControls = function () {

            initFormInfo();

            form_info.InitContext();

            form_info.RenderGrid();

            jQuery(form_info.button_add_update_id).click(function () {
                if (jQuery(form_info.input_key_id).val() != "0") {
                    return updateSms();
                }
                else {
                    return addSms();
                }
            });
            jQuery(document).bind('deserializeObjectToForm', function (e) {
                if (jQuery(form_info.input_key_id).val() != "0") {

                    $(form_info.button_add_update_id).val('Cập nhật');

                    jQuery(document).trigger('deserializeObjectToFormUpdate');

                }

                $('#CATEGORIES').val(e.objectForm.CATEGORIES);

                initFancyTree();


            });

            initFancyTree();

            initInsertUpdateForm();

            initCountTextArea();
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

        var init = function (options) {
            _configs = $.extend({}, _configs, {}, options);

            initControls();

        }

        return ({

            "init": init

        });

    };

}());