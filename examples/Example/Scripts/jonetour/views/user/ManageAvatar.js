(function () {

    VA.views.user.ManageAvatar = function () {
    
        var _configs = {
        };
         
        function update(path, siteId) {

            var data_post = {};

            data_post.package_name = 'PK_BD_USERS_ACCOUNT_INFO';

            data_post.object_name = 'UPDATE_AVATAR';

            data_post.p_MB_ID = jLoki.User.Status.GmId;

            data_post.p_AVATAR = path;

            data_post.p_SITE_ID = siteId;

            jwm.Alert.ShowAjaxProcessing(_configs.form_id);

            jQuery.ajax({
                url: _configs.service_wss_vietair_tv_url + "/service03/user/call",
                dataType: 'json',
                type: 'POST',
                data: data_post,
                success: function (data) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    jwm.Alert.ShowMsg(_configs.form_id, data.TypeMsg, data.Msg, 'VIETAIR-Thông báo');

                },
                error: function (http, message, exc) {

                    jwm.Alert.HideAjaxProcessing(_configs.form_id);

                    jwm.Alert.ShowMsg(_configs.form_id, -1, message + " " + exc, 'Thông báo');
                }
            });

            return false;

        }


        var initControls = function () {
          
            jQuery(document).bind('NOTICE_CHANGE_AVATAR', function(evt){

                var avatar_path = evt.avatar;

                var site_id = evt.site_id;

                update(avatar_path, site_id);

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