(function () {

    VA.core.comment = function () {

        var _configs = {
            form_id: '',
            service_wss_vietair_tv_url: '',
            captcha: null,
            mb_id: ''
        }

        var addPrefixParamToObject = function (objectParams, prefix) {

            var object_return = {};
            for (var prop in objectParams) {
                var prop_prefix = prefix + prop;
                object_return[prop_prefix] = objectParams[prop];
            }
            return object_return;
        }

        var isEmpty = function (obj) {
            if (typeof obj == 'undefined' || obj === null || obj === '') return true;
            if (typeof obj == 'number' && isNaN(obj)) return true;
            if (obj instanceof Date && isNaN(Number(obj))) return true;
            return false;
        }

        var setupCaptcha = function () {

            _configs.captcha = new VA.core.helpers.captcha();

            _configs.captcha.init({
                id: '#comment_captcha',
                numImages: 5
            });

        }

        var initComment = function () {

            $('#comments-container').comments({
                fieldMappings: {
                    id: 'sq_id',
                    parent: 'parent_sq_id',
                    created: 'idate',
                    modified: 'uptdate',
                    content: 'message',
                    fullname: 'full_name',
                    profilePictureURL: 'profile_picture_url',
                    createdByAdmin: 'created_by_admin',
                    createdByCurrentUser: 'created_by_current_user',
                    upvoteCount: 'upvote_count',
                    userHasUpvoted: 'user_has_upvoted',
                    status: 'status'
                },
                enableEditing: true,
                profilePictureURL: '/Images/Comment/newcustomerIcon.png',
                roundProfilePictures: true,
                textareaRows: 3,
                youText: 'Quý Khách',
                textareaPlaceholderText: 'Viết 1 bình luận',
                popularText: 'Hay nhất',
                newestText: 'Mới nhất',
                oldestText: 'Cũ nhất',
                sendText: 'Gửi ý kiến',
                replyText: 'Trả lời',
                editText: 'Sửa',
                editedText: 'Đã chỉnh sửa',
                showCommentText: 'Xét Hiển thị',
                hideCommentText: 'Xét Ẩn',
                saveText: 'Lưu',
                deleteText: 'Xóa',
                viewAllRepliesText: 'Xem tất cả bình luận',
                hideRepliesText: 'Ẩn bình luận',
                noCommentsText: 'Không có bình luận',
                timeFormatter: function (time) {
                    return moment(time).locale('vi').fromNow();
                },
                refresh: function () {//neu f5 thi thuc hien ham nay
                },
                getComments: function (success, error) {//lay toan bo comments

                    var conditions = new Array();

                    conditions.push("(a.type_comment_id = " + _configs.type_comment_id + ")");

                    conditions.push("(a.ref_sq_id = " + _configs.ref_sq_id + ")");

                    $.ajax({
                        type: 'POST',
                        dataType: "jsonp",
                        data: {
                            conditions: JSON.stringify(conditions)
                        },
                        url: _configs.service_wss_vietair_tv_url + '/comment.asmx/GetForAdminListCommentByRefId',
                        success: function (data) {
                            if (data.TypeMsg > 0) {

                                data.Data.forEach(function (item) {

                                    item.parent_sq_id = item.parent_sq_id == 0 ? null : item.parent_sq_id;
                                    item.user_has_upvoted =  parseFloat(item.user_has_upvoted) == 0 ? false : true;

                                });

                                success(data.Data)
                            }
                            else {
                                error([]);
                            }
                        },
                        error: error
                    });

                },
                postComment: function (commentJSON, success, error) {

                    commentJSON.parent_sq_id = commentJSON.parent_sq_id == null ? 0 : commentJSON.parent_sq_id;

                    commentJSON.type_comment_id = _configs.type_comment_id;

                    commentJSON.ref_sq_id = _configs.ref_sq_id;

                    commentJSON.created_by_admin = _configs.mb_id == '' ? 0 : 1;

                    commentJSON.created_by_current_user = _configs.created_by_current_user == true ? 1 : 0;

                    commentJSON.full_name = _configs.full_name;

                    commentJSON.email = _configs.email;

                    commentJSON.phone = '';

                    commentJSON.status = 1;

                    commentJSON = addPrefixParamToObject(commentJSON, 'P_');

                    commentJSON.op = "HTTP_POST";                

                    commentJSON.path_ajax_post = '/comment.asmx/PostComment';

                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);

                    $.ajax({
                        type: 'POST',
                        url: "/Handler/CoreHandler.ashx",
                        dataType: 'json',
                        data: commentJSON,
                        success: function (data) {
                            
                            if (data != null && data.TypeMsg > 0) {
                                jwm.Alert.HideAjaxProcessing(_configs.form_id);
                                jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'Thông báo');
                                initComment();
                            }
                            else {
                                jwm.Alert.ShowMsg(_configs.form_id, -1, 'Cập nhật không thành công', 'Thông báo');
                                error([]);
                            }                           
                        },
                        error: function (http, message, exc) {
                            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                            jwm.Alert.ShowMsg(_configs.form_id, -1, message, 'Thông báo');
                            error([]);
                        }
                    });
                    return false;
                },
                upvoteComment: function (commentJSON, success, error) {//bam like thi cap thuc hien

                    commentJSON = addPrefixParamToObject(commentJSON, 'P_');

                    commentJSON.op = "HTTP_POST";

                    commentJSON.path_ajax_post = '/comment.asmx/UpvoteComment';

                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);

                    $.ajax({
                        type: 'POST',
                        url: "/Handler/CoreHandler.ashx",
                        dataType: 'json',
                        data: commentJSON,
                        success: function (data) {
                            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                            try {
                                if (data.TypeMsg > 0) {
                                    success(data.Data)
                                }
                                else {
                                    jwm.Alert.ShowMsg(_configs.form_id, -1, data.Msg, 'Thông báo');
                                    error([]);
                                }
                            }
                            catch (e) {
                                jwm.Alert.ShowMsg(_configs.form_id, -1, e.message, 'Thông báo');
                                error([]);
                            }
                        },
                        error: error
                    });


                },
                showOrHideComment: function (commentJSON, success, error) {//bam like thi cap thuc hien

                    commentJSON.parent_sq_id = commentJSON.parent_sq_id == null ? 0 : commentJSON.parent_sq_id;

                    commentJSON.type_comment_id = _configs.type_comment_id;

                    commentJSON.ref_sq_id = _configs.ref_sq_id;

                    commentJSON.created_by_admin = _configs.mb_id == '' ? 0 : 1;

                    commentJSON.created_by_current_user = _configs.created_by_current_user == true ? 1 : 0;

                    commentJSON.full_name = _configs.full_name;

                    commentJSON.email = _configs.email;

                    commentJSON.phone = '';

                    commentJSON = addPrefixParamToObject(commentJSON, 'P_');

                    commentJSON.op = "HTTP_POST";

                    commentJSON.path_ajax_post = '/comment.asmx/ShowOrHideComment';

                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);

                    $.ajax({
                        type: 'POST',
                        url: "/Handler/CoreHandler.ashx",
                        dataType: 'json',
                        data: commentJSON,
                        success: function (data) {
                            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                            try {
                                if (data.TypeMsg > 0) {
                                    initComment();
                                }
                                else {
                                    jwm.Alert.ShowMsg(_configs.form_id, -1, data.Msg, 'Thông báo');
                                    error([]);
                                }
                            }
                            catch (e) {
                                jwm.Alert.ShowMsg(_configs.form_id, -1, e.message, 'Thông báo');
                                error([]);
                            }
                        },
                        error: error
                    });


                },
                putComment: function (commentJSON, success, error) {
                    commentJSON.parent_sq_id = commentJSON.parent_sq_id == null ? 0 : commentJSON.parent_sq_id;

                    commentJSON.type_comment_id = _configs.type_comment_id;

                    commentJSON.ref_sq_id = _configs.ref_sq_id;

                    commentJSON.created_by_admin = _configs.mb_id == '' ? 0 : 1;

                    commentJSON.created_by_current_user = _configs.created_by_current_user == true ? 1 : 0;

                    commentJSON.full_name = _configs.full_name;

                    commentJSON.email = _configs.email;

                    commentJSON.phone = '';

                    commentJSON = addPrefixParamToObject(commentJSON, 'P_');

                    commentJSON.op = "HTTP_POST";

                    commentJSON.path_ajax_post = '/comment.asmx/PutComment';

                    jwm.Alert.ShowAjaxProcessing(_configs.form_id);

                    $.ajax({
                        type: 'POST',
                        url: "/Handler/CoreHandler.ashx",
                        dataType: 'json',
                        data: commentJSON,
                        success: function (data) {

                            if (data != null && data.TypeMsg > 0) {
                                jwm.Alert.HideAjaxProcessing(_configs.form_id);
                                jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'Thông báo');
                                initComment();
                            }
                            else {
                                jwm.Alert.ShowMsg(_configs.form_id, -1, 'Cập nhật không thành công', 'Thông báo');
                                error([]);
                            }
                        },
                        error: function (http, message, exc) {
                            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                            jwm.Alert.ShowMsg(_configs.form_id, -1, message, 'Thông báo');
                            error([]);
                        }
                    });
                    return false;
                },
                deleteComment: function (commentJSON, success, error) {
                    commentJSON.parent_sq_id = commentJSON.parent_sq_id == null ? 0 : commentJSON.parent_sq_id;

                    commentJSON.type_comment_id = _configs.type_comment_id;

                    commentJSON.ref_sq_id = _configs.ref_sq_id;

                    commentJSON.created_by_admin = _configs.mb_id == '' ? 0 : 1;

                    commentJSON.created_by_current_user = _configs.created_by_current_user == true ? 1 : 0;

                    commentJSON.full_name = _configs.full_name;

                    commentJSON.email = _configs.email;

                    commentJSON.phone = '';

                    commentJSON = addPrefixParamToObject(commentJSON, 'P_');

                    commentJSON.op = "HTTP_POST";

                    commentJSON.path_ajax_post = '/comment.asmx/DeleteComment';

                    $.ajax({
                        type: 'POST',
                        url: "/Handler/CoreHandler.ashx",
                        dataType: 'json',
                        data: commentJSON,
                        success: function (data) {
                            jwm.Alert.HideAjaxProcessing(_configs.form_id);
                            try {
                                if (data.TypeMsg > 0) {
                                    success();
                                }
                                else {
                                    jwm.Alert.ShowMsg(_configs.form_id, -1, data.Msg, 'Thông báo');
                                    error();
                                }
                            }
                            catch (e) {
                                jwm.Alert.ShowMsg(_configs.form_id, -1, e.message, 'Thông báo');
                                error();
                            }
                        },
                        error: error
                    });
                }
            });
        }

        /*public property*/
        var init = function (configs) {

            _configs = $.extend({}, _configs, {}, configs);

            initComment();

        }


        return ({

            "init": init

        });

    };

})();
