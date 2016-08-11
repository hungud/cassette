(function () {

    VA.views.document.ManageDocuments = function () {

        var _configs = {
        }


        var resetForm = function () {
            jQuery('input[type=text], input[type=hidden], textarea', _configs.form_id).val('');
            jQuery('input[type=text], input[type=hidden], textarea', _configs.form_id).each(function () {

                var default_value = $(this).attr('data-default-value');
                $(this).val(default_value);

            });
            $("#btnInsertUpdate", _configs.form_id).val('Thêm mới');
            CKEDITOR.instances.CONTENT.setData('');
        }

        var addCategory = function () {
            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);
            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;
            var data_post = $(_configs.form_id).serializeObject();
            data_post.op = "AddCategory";
            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {

                        initFancyTree();
                        resetForm();
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
        }

        var UpdateCategory = function () {

            var content = CKEDITOR.instances.CONTENT.getData();

            content = encodeURIComponent(content);

            $('#CONTENT').val(content);

            var form_valid = $(_configs.form_id).validateForm();
            if (form_valid == false) return false;
            var data_post = $(_configs.form_id).serializeObject();
            data_post.op = "UpdateCategory";
            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: "/Handler/AirlineHandler.ashx",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0)
                        initFancyTree();
                    resetForm();
                },
                error: function (http, message, exc) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
            return false;
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

        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {
            jwm.Alert.ShowAjaxProcessing("#categories");
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListHierarchicalCategories",
                dataType: "jsonp",
                data: {
                    parent_id: 0, site_id: _configs.document_site_id, is_get_content: false
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#categories");
                    jwm.Alert.ShowMsg("#categories", data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            data_list.value = data.Data;

                            data_list.value = initLevelSpace(data_list.value);

                            jQuery('#tmp_categories_option').data('data-source', data_list.value);

                            jQuery('#PARENT_ID').empty();

                            jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#PARENT_ID');

                            callback(data.Data);//du lieu tu ajax duoc cho vao lam tham so 

                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#categories");
                    jwm.Alert.ShowMsg("#categories", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].TITLE;
                node.key = children[i].CATEGORY_ID;
                node.tooltip = children[i].TITLE;
                node.selected = children[i].PERMISSION > 0 ? true : false;
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
                checkbox: false,
                selectMode: 3,
                source: treeData,
                activate: function (event, data) {

                },
                renderNode: function (event, data) {

                    var node = data.node;

                    if ($(node.span).attr('data-edit')) {
                        return;
                    }

                    var edit_button = $('<span><a type="button" class="btnEdit">Sửa</a></span>');

                    $(node.span).append(edit_button);

                    $(node.span).attr('data-edit', 'true');

                    edit_button.click(function () {

                        $(_configs.form_id).deserializeObjectAtSelfToFormArgJson(node.data);

                    });


                }
            });
        }

        var getCategoryContent = function (categoryId, callBack) {
            jwm.Alert.ShowAjaxProcessing(_configs.form_id);
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetCategory",
                dataType: "jsonp",
                data: {
                    site_id: _configs.document_site_id, is_get_content: true, category_id: categoryId
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    if (data.TypeMsg > 0) {

                        if (callBack) callBack(data.Data.content);

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);
                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var initControls = function () {

            initFancyTree();

            jQuery('#btnInsertUpdate').click(function () {
                if (jQuery('#CATEGORY_ID').val() != "0")
                    UpdateCategory();
                else
                    addCategory();
                $('#btnInsertUpdate').val('Thêm mới');
                jQuery('#CATEGORY_ID').val('0');
                document.getElementById("insertUpdate").reset();
                return false;
            });
            jQuery(document).bind('deserializeObjectAtSelfToForm', function (e) {
                if (jQuery('#CATEGORY_ID').val() != "0")
                    $('#btnInsertUpdate').val('Cập nhật');

                getCategoryContent(e.objectForm.CATEGORY_ID, function (content) {

                    CKEDITOR.instances.CONTENT.setData(content);

                });
            });

            setLinkSEO();

            $('#btnReset').click(function () {
                resetForm();
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
