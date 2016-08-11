(function () {

    VA.views.document.ViewDepartmentDocumentArticles = function () {

        var _configs = {
        }


        var initFancyTree = function () {
            prepareParamsFancyTree();
        }

        var prepareParamsFancyTree = function () {
            getDataAjaxFancyTree();
        }

        var getDataAjaxFancyTree = function (callback) {


            var conditions = {};

            conditions.parent_id = '0';

            conditions.office_department_id = _configs.OFFICE_DEPARTMENT_ID;

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ARTICLE_CATEGORY',
                    object_name: 'GET_ARTICLE_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {
                        var data_list = {
                        }

                        data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                        //data_list.value = initLevelSpace(data_list.value);

                        data_list.value = initLevelTitle(data_list.value);

                        //console.log(data_list.value);

                        jQuery('#tmp_categories_option').data('data-source', data_list.value);

                        jQuery('#SE_CATEGORY_ID').empty();

                        jQuery('#tmp_categories_option').tmpl(data_list).appendTo('#SE_CATEGORY_ID');
                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#categoriesTree");
                    jwm.Alert.ShowMsg("#categoriesTree", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var execFilterForm = function () {

            var title = $('#txtSearch', '#filterForm').val();
            var seo = new SEO();
            var title_en = seo.getTitleSeo(title);
            var category_id = $('#SE_CATEGORY_ID', '#filterForm').val();
            var article_content = $('#ARTICLE_CONTENT_SEARCH', '#filterForm').val();
            var status = $('#STATUS_SEARCH', '#filterForm').val();

            var conditions = {};
            conditions.ARTICLE = {};
            conditions.ARTICLE_CATEGORY_RELATE = {};

            conditions.ARTICLE.office_department_id = _configs.OFFICE_DEPARTMENT_ID;

            if (isEmpty(title_en) == false) {
                title_en = title_en.trim();
                conditions.ARTICLE.title_en = title_en;
            }

            if (isEmpty(category_id) == false) {
                category_id = category_id.trim();
                conditions.ARTICLE_CATEGORY_RELATE.category_id = category_id;
            }


            if (isEmpty(article_content) == false) {
                article_content = article_content.trim();
                conditions.ARTICLE.article_content = article_content;
            }


            if (isEmpty(status) == false) {
                status = status.trim();
                conditions.ARTICLE.status = status;
            }

            grid_vietair_articles_configs.data.p_conditions = JSON.stringify(conditions);

            renderGridVietairArticles();

            return false;
        }

        var initFilterForm = function () {

            $('#txtSearch', '#filterForm').enter(function () {
                $('#btnSearch', '#filterForm').click();
            });

            $('#btnSearch', '#filterForm').click(function () {

                return execFilterForm();

            }).next().button({
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-s"
                }
            }).click(function () {

                var data_state = $(this).attr('data-state');
                if (data_state != 'open') {
                    $('.search-enhance-container', '#filterForm').css('display', '');
                    $(this).attr('data-state', 'open');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-e"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '0px solid #DDDDDD'
                    });

                    // initEnhanceFilterForm();

                }
                else {
                    $('.search-enhance-container', '#filterForm').css('display', 'none');
                    $(this).attr('data-state', 'close');
                    $(this).button({
                        text: false,
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        }
                    });
                    $('.search-enhance-container', '#filterForm').prev().css({
                        'border-bottom': '1px solid #DDDDDD'
                    });
                }

                return false;

            }).parent()
             .buttonset();



        }

        var grid_vietair_articles_configs = null;

        var grid_vietair_articles_paged = null;

        var initGridVietairArticles = function () {

            grid_vietair_articles_configs = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_paged',
                tmp_grid_selector: '#tmp_grid',
                grid_selector: '#grid',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                is_call_package: true,
                page_size: 20,
                row_start: 0,
                row_end: 20
            };
            var conditions = {};


            conditions.ARTICLE = {};

            conditions.ARTICLE.office_department_id = _configs.OFFICE_DEPARTMENT_ID;


            grid_vietair_articles_configs.data = {
                is_show_comment_count: true,
                package_name: 'PK_BD_ARTICLE',
                object_name: 'GET_LIST_ARTICLE',
                p_conditions: JSON.stringify(conditions)
            };

            grid_vietair_articles_configs.onRenderComplete = function () {

                //initGetContentSmsTemplate();

            };

        }


        var setGridConfigFromQueryString = function () {

            //var context = new SS.core.helpers.context();

            var title_en = _configs.QS_TITLE_EN; //context.getQueryString('title_en');

            var action = _configs.QS_ACTION; //context.getQueryString('action');

            var option = action;


            var conditions = {};

            conditions.ARTICLE = {};

            conditions.ARTICLE.office_department_id = _configs.OFFICE_DEPARTMENT_ID;

            if (isEmpty(title_en) == false) {
                title_en = title_en.trim();
                conditions.ARTICLE.title_en = title_en;
            }

            if (action == "view") {
                option = 'searching';
            }

            grid_vietair_articles_configs.data = {
                package_name: 'PK_BD_ARTICLE',
                object_name: 'GET_LIST_ARTICLE',
                p_conditions: JSON.stringify(conditions),
                row_start: 0,
                row_end: grid_vietair_articles_configs.page_size
            };

            grid_vietair_articles_configs.onRenderComplete = function () {


                if (window.location.hash.indexOf('action_complete') >= 0 || action == "") {

                    return;

                }

                if (action == "view") {

                    $('#insert_update_articles').deserializeObjectPackageToFormV2('#tmp_grid', null, 'TITLE_EN', title_en);

                }

                window.location.hash = 'action_complete';

            };
        }


        var renderGridVietairArticles = function () {

            grid_vietair_articles_paged = new SS.core.GridPaged();

            grid_vietair_articles_paged.init(grid_vietair_articles_configs);
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

        var getDataForCategoryInput = function () {

            var conditions = {};

            conditions.parent_id = '0';


            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/document/get",
                dataType: "json",
                type: 'POST',
                data: {
                    package_name: 'PK_BD_ARTICLE_CATEGORY',
                    object_name: 'GET_ARTICLE_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {

                    if (resp.TypeMsg > 0) {


                        var data_list = {
                        }

                        data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                        data_list.value = initLevelTitle(data_list.value);

                        jQuery('#tmp_categories_option_child').data('data-source', data_list.value);

                        jQuery('#CHILD_CATEGORY_IDS').empty();

                        jQuery('#CHILD_CATEGORY_IDS').html('<option value="">-- [ Chọn chuyên mục con] --</option>');

                        jQuery('#tmp_categories_option_child').tmpl(data_list).appendTo('#CHILD_CATEGORY_IDS');




                    }
                },
                error: function (http, message, exc) {
                    jwm.Alert.ShowAjaxProcessing("#insert_update_articles");
                    jwm.Alert.ShowMsg("#insert_update_articles", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        //----------------------------------------------------------
        //xử lý sự kiện scroll
        var initScrollToTop = function () {

            if ($('#scroll-to-top').offset().top > 0) {
                $('#scroll-to-top').show();
            } else {
                $('#scroll-to-top').hide();
            }

            $(window).scroll(function () {

                var offset_scroll = jQuery(window).scrollTop();

                if (offset_scroll > 0) {
                    $('#scroll-to-top').show();
                } else {
                    $('#scroll-to-top').hide();
                }
            });


            $('#scroll-to-top').click(function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
            });
        }

        var initControls = function () {

            initScrollToTop();

            initGridVietairArticles();

            setGridConfigFromQueryString();

            renderGridVietairArticles();

            jQuery(document).bind('deserializeObjectPackageToFormV2', function (e) {


                $('#block-view-document').show();


                $('html, body').animate({
                    scrollTop: $("#update-articles").offset().top
                }, 100);

                //$("#update-articles").show();
                //console.log(e.objectForm);

                $('#article_document').html('');
                $('#tmp_article_document').tmpl(e.objectForm).appendTo("#article_document");

            });     

            initFilterForm();

            initFancyTree();

            getDataForCategoryInput();


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