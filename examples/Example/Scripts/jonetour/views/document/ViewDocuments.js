(function () {

    VA.views.document.ViewDocuments = function () {

        var _configs = {
        }

        var initDocumentForm = function () {
            jQuery(window).scroll(function () {
                var offset_footer = $('#footer').offset().top;
                var offset_slidebar = $('#left-slidebar').offset().top;
                var offset_scroll = jQuery(window).scrollTop();
                if (offset_slidebar <= offset_scroll) {
                    $('#left-slidebar').addClass('fix');
                    $('.copy-slidebar').height($('#left-slidebar').height());
                }
                var offset_copy_slidebar = $('.copy-slidebar').offset().top;
                if (offset_copy_slidebar > offset_slidebar) {
                    $('#left-slidebar').removeClass('fix');
                    $('.copy-slidebar').height(0);
                }
                if (offset_footer - $('html').height() - 15 <= offset_slidebar) {
                    //khi scroll nếu gặp footer thì cố định chiều cao của left-slidebar
                    $('#left-slidebar').css('height', '753px');
                } else {
                    $('#left-slidebar').css('height', '100%');
                }
                if ($('#right-content').height() <= 584) {
                    //nếu chiều cao right-content <= 584px thì fix chiều cao left-slidebar 100%, xem thực tế để hiểu 
                    $('#left-slidebar').css('height', '100%');
                }
            });
        }

        var setDocumentForm = function () {
            if ($('#right-content').height() <= 584) {
                $('#left-slidebar').removeClass('fix');
                $('#left-slidebar').css('height', '100%');
                $('.copy-slidebar').css('height', '0');
            }
        }

        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree(prepareDataFancyTree);
        }

        var getDataAjaxFancyTree = function (callback) {
            jwm.Alert.ShowAjaxProcessing("#leftPane");
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetListHierarchicalCategories",
                dataType: "jsonp",
                data: {
                    parent_id: 0, site_id: _configs.document_site_id
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#leftPane");
                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (data.TypeMsg > 0) {
                        if (callback) {
                            callback(data.Data);//du lieu tu ajax duoc cho vao lam tham so 
                        }
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#leftPane");
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                if (isEmpty(children[i].LINK_TO) == false) {
                    node.title = '<a href="' + children[i].LINK_TO + '">' + children[i].TITLE + '</a>';
                }
                else {
                    node.title = children[i].TITLE;
                }
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

            $("#leftPane").fancytree("destroy");
            $("#leftPane").fancytree({
                checkbox: false,
                selectMode: 3,
                source: treeData,
                activate: function (event, data) {
                    getCategoryContent(data.node.key);
                }
            });

        }

        var getCategoryContent = function (categoryId) {
            jwm.Alert.ShowAjaxProcessing("#leftPane", true);
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/ListInfo.asmx/GetCategory",
                dataType: "jsonp",
                data: {
                    site_id: _configs.document_site_id, is_get_content: true, category_id: categoryId
                },
                success: function (data) {
                    jwm.Alert.HideAjaxProcessing("#leftPane");

                    if (data.TypeMsg > 0) {

                        $('#document_content').html(data.Data.content);

                        setDocumentForm();

                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#leftPane", true);
                    jwm.Alert.ShowMsg(form_info.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });
        }


        var initControls = function () {

            initDocumentForm();

            initFancyTree();
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
