(function () {

    SS.core.MessengerHub = function () {

        var _configs = {
            messengerHub: null,
            onReceiveMessage: null,
            trigger: true,
            lastClientMessage: null
        }

        _configs.messengerHub = $.connection.messengerHub;

        _configs.messengerHub.client.onReceiveMessage = function (clientMessage) {

            if (_configs.onReceiveMessage) {
                _configs.onReceiveMessage(clientMessage);
            }
            _configs.lastClientMessage = clientMessage;
            if (_configs.trigger) {
                $(document).trigger({
                    type: 'onReceiveMessageFromHub',
                    clientMessage: clientMessage
                });
            }
        }
        // Start the connection.
        $.connection.hub.start().done(function () {
        });

        /**********************************************************************************/

        /*public property*/
        var init = function (options) {

            _configs = $.extend({}, _configs, {}, options);

            initPlayer();
        }


        var sendMessage = function (clientMessage) {
            _configs.messengerHub.server.sendMessage(clientMessage);
        }

        /*
        clientMessage

        public string Title { get; set; }

        public string Content { get; set; }

        public int Duration { get; set; }

        public object Data { get; set; }

        public string GroupId { get; set; }

        public string LastUpdatedByConnectionId { get; set; }

        */

        var isEmpty = function (obj) {
            if (typeof obj == 'undefined' || obj === null || obj === '') return true;
            if (typeof obj == 'number' && isNaN(obj)) return true;
            if (obj instanceof Date && isNaN(Number(obj))) return true;
            return false;
        }


        var alertTitleWindow = function (message) {

            if (!$.titleAlert) return;          

            $.titleAlert(message, {                
                duration: 0,
                interval: 700,
                stopOnMouseMove:true
            });

        }

        var initPlayer = function () {

            if (!$.jPlayer) return;

            var media = ['LYNC_ringing.wav', 'LYNC_ringtone2.wav', 'LYNC_ringtone3.wav', 'LYNC_ringtone4.wav', 'LYNC_ringtone5.wav', 'LYNC_ringtone6.wav'];

            $("body").append("<div id='vietAirPlayer1' style='visibility: hidden; width: 0px; height: 0px'></div>");

            var player = '#vietAirPlayer1';

            $(player).jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        wav: '/Content/media/' + media[0]
                    });
                },
                ended: function () {
                },
                swfPath: "/Content/media/",
                supplied: "wav",
                wmode: "window"
            });
            $(player).bind($.jPlayer.event.play, function () {

                $(this).jPlayer("pauseOthers"); // pause all players except this one.

            });
            $(player).bind($.jPlayer.event.ended, function (event) { // Add a listener to report the time play began                

            });
        }

        var play = function () {
            $('#vietAirPlayer1').jPlayer("play");
        }

        return ({

            "init": init,
            "play": play,
            "alertTitleWindow": alertTitleWindow,
            "sendMessage": sendMessage

        });

    };

})();
