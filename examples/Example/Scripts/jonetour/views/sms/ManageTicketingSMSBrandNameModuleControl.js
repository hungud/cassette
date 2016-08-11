(function () {

    VA.views.sms.ManageTicketingSMSBrandNameModuleControl = function () {

        var _configs = {
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

            jwm.Alert.ShowAjaxProcessing('#categories_brand_name');
            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                dataType: "json",
                data: {
                    package_name: 'PK_BD_SMS_TEMPLATE_CATEGORY',
                    object_name: 'GET_SMS_TEM_CATEGORY_CHILDS',
                    p_conditions: JSON.stringify(conditions)
                },
                success: function (resp) {
                    jwm.Alert.HideAjaxProcessing("#categories_brand_name");
                   // jwm.Alert.ShowMsg("#categories_brand_name", data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');
                    if (resp.TypeMsg > 0) {
                        if (callback) {

                            var data_list = {
                            }

                            data_list.value = initCursorDataJson(resp.Data.CURSOR_DATA);

                            callback(resp.Data.CURSOR_DATA);//du lieu tu ajax duoc cho vao lam tham so


                        }
                    }
                },
                error: function (http, message, exc) {
                    //jwm.Alert.ShowAjaxProcessing("#categories_brand_name");
                    jwm.Alert.ShowMsg("#categories_brand_name", -1, message + " " + exc, 'Thông báo');
                }
            });
        }

        var prepareDataFancyTree = function (treeServerData) {//ham chuan bi du lieu de bind             

            bindDataFancyTree(prepareDataHierarchicalFancyTree(treeServerData));
        }

        var prepareDataHierarchicalFancyTree = function (children) {//ham xu ly ket qua dua ve dang mang tu du lieu kieu json
            var fancy_tree_children_data = [];
         
            for (var i = 0; i < children.length; i++) {

                var node = {
                };
                node.data = children[i];
                node.title = children[i].SQ_ID + ' - ' + children[i].TITLE;
                node.key = children[i].SQ_ID;
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

        var bindDataFancyTree = function (treeData) {//ham de bind du lieu

            $("#categories_brand_name").fancytree("destroy");
            $("#categories_brand_name").fancytree({
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

                    var edit_button = $('<span><a type="button" class="btnEdit">Chọn</a></span>');

                    $(node.span).append(edit_button);

                    $(node.span).attr('data-edit', 'true');

                    edit_button.click(function () {

                        var conditions = {
                        };

                        conditions.sms_template_category_relate = {};

                        conditions.sms_template_category_relate.category_id = node.key;

                        renderGridSmsTemplate(conditions);


                    });


                }
            });
        }

        function initLevelSpace(list) {
            for (var i = 0; i < list.length; i++) {
                var row = list[i];
                row.HTML_LEVEL_SPACE = getHtmlLevelSpace(row.CHILD_LEVEL);
                if (row.CHILD_CNT > 0) {
                    row.CHILDREN = initLevelSpace(row.CHILDREN);
                }
            }
            return list;
        }

        function getHtmlLevelSpace(level) {
            var s = '&nbsp;';
            for (var i = 0; i < level; i++) {
                s += '&nbsp;&nbsp;';
            }
            return s;
        }


        //--------------------------------------------------
        //SMS TEMPLATE

        var grid_sms_template_configs = null;

        var grid_sms_template_paged = null;

        var initGridSmsTemplate = function () {

            grid_sms_template_configs = {
                    tmp_paged_selector: '#tmp_GridPaged_sms_template',
                    paged_selector: '#grid_paged_sms_template',
                    tmp_grid_selector: '#tmp_grid_sms_template',
                    grid_selector: '#grid_sms_template',
                    ajax_url: _configs.service_wss_vietair_tv_url +  "/service03/sms/get",
                    is_call_package: true,
                    page_size: 20,
                    row_start: 0,
                    row_end: 20
            };

            var conditions = {
            };

            grid_sms_template_configs.data = {
                package_name: 'PK_BD_SMS_BRANDNAME',
                object_name: 'GET_LIST_TEMPLATE',
                p_conditions: JSON.stringify(conditions)
            };

            grid_sms_template_configs.onRenderComplete = function () {

                initGetContentSmsTemplate();

            };

        }

        var renderGridSmsTemplate = function (conditions) {

            if (conditions) {
                grid_sms_template_configs.data.p_conditions = JSON.stringify(conditions);
            }

            grid_sms_template_paged = new SS.core.GridPaged();
            grid_sms_template_paged.init(grid_sms_template_configs);
        }

        var initCountTextArea = function () {
            $('#sms_content').keyup(function () {
                var text_length = $('#sms_content').val().length;
                var number_of_msg = Math.ceil(text_length / 160);
                if (number_of_msg == 0) {
                    number_of_msg = 1;
                } 
                $('#count-of-text').text(text_length);
                $('#count-of-number-msg').text(number_of_msg);
            });
        }

        function initToolTip() {
            $('input[title]').qtip({
                position: {
                    my: 'left center',
                    at: 'right center'
                },
                show: {
                    event: 'focus'
                },
                hide: {
                    event: 'blur'
                }
            });
        }

        var initGetContentSmsTemplate = function () {
            $('a[data-sms-template-sq-id]', '#grid_sms_template').unbind('click');
            $('a[data-sms-template-sq-id]', '#grid_sms_template').bind('click', function () {
              
                var sq_id = $(this).attr('data-sms-template-sq-id');

                var content_template = $.grep($('#tmp_grid_sms_template').data('data-source'), function (element, index) {
                    return element.SQ_ID == sq_id;
                });

                var sms_content = content_template[0].CONTENT;
              
                $('#sms_content').val($('#sms_content').val() + sms_content + ' ');

                $('#hidden_sms').val($('#sms_content').val());

                var text_length = $('#sms_content').val().length;

                var number_of_msg = Math.ceil(text_length / 160);

                if (number_of_msg == 0) {
                    number_of_msg = 1;
                }
                $('#count-of-text').text(text_length);
                $('#count-of-number-msg').text(number_of_msg);

            });
        }
        //SMS TEMPLATE --> END
        //--------------------------------------------------


        //--------------------------------------------------
        //SMS BRAND NAME SEND LOGS

        var initSendSms = function () {

            $('#gui-sms').click(function () {

                $('#count-of-text').text('0');

                $('#count-of-number-msg').text('1');

                var content_sms = $('#sms_content').val();

                var number_customer = $('#phone-number-customer').val();

                if (!content_sms) {

                    jwm.Alert.ShowMsg('#formView', 0, 'Nội dung không được bỏ trống');
                    
                    return false;

                }
                
                var ref_sq_id = $('#ref-order-id').attr('data-ref-order-id');

                var type_id = $('#ref-order-id').attr('data-sms-brand-name-type-id');

                var data_post = {};

                data_post.package_name = 'PK_BD_SMS_BRANDNAME';

                data_post.object_name = 'INSERT_NEO_SMS_LOG';

                data_post.p_USER_PHONE = number_customer;

                data_post.p_CONTENT = content_sms;

                data_post.p_STATUS = 0;

                data_post.p_TYPE_ID = type_id;

                data_post.p_MB_ID = jLoki.User.Status.GmId;

                data_post.p_REF_SQ_ID = ref_sq_id;

                jwm.Alert.ShowAjaxProcessing('#formView');

                jQuery.ajax({
                    url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                    dataType: 'json',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing('#formView');
                        jwm.Alert.ShowMsg('#formView', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                        if (data.TypeMsg > 0) {
                            $('#sms_content').val('');
                            $('#hidden_sms').val('');
                            viewInfoLogSms();
                        }
                    },
                    error: function (http, message, exc) {
                        jwm.Alert.HideAjaxProcessing('#formView');
                        jwm.Alert.ShowMsg('#formView', -1, message + " " + exc, 'Thông báo');
                    }
                });
                return false;
            })
        }

        var viewInfoLogSms = function () {
            
                var data_post = {
                };
                var ref_sq_id = $('#ref-order-id').attr('data-ref-order-id');
                data_post.ref_sq_id = ref_sq_id;
             
                jwm.Alert.ShowAjaxProcessing("#formViewListSms");

                jQuery.ajax({
                    url: "/SMS/ViewListNeoSmsLogInfo",
                    dataType: 'html',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing("#formViewListSms");
                        $('#formViewListSms').empty();
                        $('#formViewListSms').html(data);
                        $('#viewlogSmsMessageInfo').show();
                        initGridSmsBrandNameLog();
                        renderGridSmsBrandNameLog();
                       
                    },
                    error: function (http, message, exc) {

                        jwm.Alert.HideAjaxProcessing("#formViewListSms");
                        jwm.Alert.ShowMsg("#formViewListSms", -1, message + " " + exc, 'Thông báo');

                    }
                });
             
                return false;
        }

        var updateSmsBrandNameStatus = function (sqId, status) {

                var data_post = {};
                      
                data_post.package_name = 'PK_BD_SMS_BRANDNAME';

                data_post.object_name = 'UPDATE_NEO_SMS_LOG_STATUS';

                data_post.p_STATUS = status;

                data_post.p_SQ_ID = sqId;

                data_post.P_MB_ID = jLoki.User.Status.GmId;

                jwm.Alert.ShowAjaxProcessing('#viewlogSmsMessageInfo');

                jQuery.ajax({
                    url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                    dataType: 'json',
                    type: 'POST',
                    data: data_post,
                    success: function (data) {
                        jwm.Alert.HideAjaxProcessing('#viewlogSmsMessageInfo');
                        jwm.Alert.ShowMsg('#viewlogSmsMessageInfo', data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                        if (data.TypeMsg > 0) {
                            renderGridSmsBrandNameLog();
                        }
                    },
                    error: function (http, message, exc) {
                        jwm.Alert.HideAjaxProcessing('#viewlogSmsMessageInfo');
                        jwm.Alert.ShowMsg('#viewlogSmsMessageInfo', -1, message + " " + exc, 'Thông báo');
                    }
                });
                return false;
           
        }

        var initSmsBrandNameActions = function () {

            $('button[data-action-status]', '#viewlogSmsMessageInfo').unbind('click');
            $('button[data-action-status]', '#viewlogSmsMessageInfo').bind('click', function () {
                
                var sq_id = $(this).attr('data-sq-id');
                var status = $(this).attr('data-action-status');

                updateSmsBrandNameStatus(sq_id, status);
            });


        }

        
        var grid_sms_brand_name_log = null;

        var grid_sms_brand_name_log_config = null;

        var initGridSmsBrandNameLog = function () {
            
            grid_sms_brand_name_log_config = {
                tmp_paged_selector: '#tmp_GridPaged',
                paged_selector: '#grid_page_sms_brand_name_log',
                tmp_grid_selector: '#tmp_grid_sms_brand_name_log',
                grid_selector: '#grid_sms_brand_name_log',
                ajax_url: _configs.service_wss_vietair_tv_url + "/service03/sms/get",
                is_call_package: true,
                page_size: 5,
                row_start: 0,
                row_end: 5

            };
            //init condition
            var conditions = {};
            conditions.NEO_SMS_LOG = {};
            conditions.NEO_SMS_LOG.REF_SQ_ID = $('#ref-order-id').attr('data-ref-order-id');

            grid_sms_brand_name_log_config.data = {
                package_name: 'PK_BD_SMS_BRANDNAME',
                object_name: 'GET_LIST_SMS_LOG',
                p_conditions: JSON.stringify(conditions)
            };

            grid_sms_brand_name_log_config.onRenderComplete = function () {
                
                initSmsBrandNameActions();

                //setIntervalRenderGridBrandNameLog();

                //setReloadSmsBrandNameLog();

            };


          
        }

        var id_time_out_render_grid_sms_brand_name_log = null;

        var setIntervalRenderGridBrandNameLog = function () {
            var number_status_of_waiting = $('button[data-action-status="2"]', '#viewlogSmsMessageInfo').length;
            if (number_status_of_waiting > 0) {
                if (id_time_out_render_grid_sms_brand_name_log) {
                    clearTimeout(id_time_out_render_grid_sms_brand_name_log);
                    id_time_out_render_grid_sms_brand_name_log = null;
                }                
                id_time_out_render_grid_sms_brand_name_log = setTimeout(function () {
                    renderGridSmsBrandNameLog();
                }, 5000)
            }
        }

        var setReloadSmsBrandNameLog = function () {
            var number_status_of_waiting = $('button[data-action-status="2"]', '#viewlogSmsMessageInfo').length;
            if (number_status_of_waiting > 0) {
                setTimeout(function () {
                    renderGridSmsBrandNameLog();
                    console.log(99);
                }, 5000)
            }
        }

        var renderGridSmsBrandNameLog = function () {
            //render grid
            grid_sms_brand_name_log = new SS.core.GridPaged();
            grid_sms_brand_name_log.init(grid_sms_brand_name_log_config);
        }

        //SMS BRAND NAME SEND LOGS --> END
        //--------------------------------------------------

        var initUpdateSmsBrandNameLog = function () {
            $('#update-sms-brand-name-log').unbind('click');
            $('#update-sms-brand-name-log').bind('click', function () {
                renderGridSmsBrandNameLog();
            });
        }

        var initSetValueContentSMS = function () {

            var get_content_sms = $('#hidden_sms').val();

            $('#sms_content').val(get_content_sms);

            $('#sms_content').keyup(function () {

                var content_sms = $('#sms_content').val();
              
                $('#hidden_sms').val(content_sms);

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

        //-----------------------------------------------------
        var initControls = function () {

            initFancyTree();

            initGridSmsTemplate();

            renderGridSmsTemplate();

            initCountTextArea();

            initToolTip();

            initSendSms();

            viewInfoLogSms();

            initUpdateSmsBrandNameLog();

            initSetValueContentSMS();
                
        
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