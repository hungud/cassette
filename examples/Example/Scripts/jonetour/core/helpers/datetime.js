(function () {

    SS.core.helpers.datetime = function () {

        var _configs = {
            date_string:'',
            date_format:'dd/MM/yyyy HH:mm'
        }

        var formatString = function (dateString, dateFormat) {

            

            _configs.date_format = dateFormat;
            _configs.date_string = dateString;

            var dateTime = new Date();
            var day = dateTime.getDay();
            var month = dateTime.getMonth();
            var year = dateTime.getFullYear();
            var hours = dateTime.getHours();
            var minutes = dateTime.getMinutes();
            var seconds = dateTime.getSeconds();
            var milliseconds = dateTime.getMilliseconds();

            if (_configs.date_string !=null && _configs.date_string.length == 14) {

                day = _configs.date_string.substr(0, 2);
                month = _configs.date_string.substr(2, 2);
                year = _configs.date_string.substr(4, 4);
                hours = _configs.date_string.substr(8, 2);
                minutes = _configs.date_string.substr(10, 2);
                seconds = _configs.date_string.substr(12, 2);

                month = parseFloat(month) - 1;

                dateTime = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            }
            else if (_configs.date_string != null && _configs.date_string.length == 8) {

                day = _configs.date_string.substr(0, 2);
                month = _configs.date_string.substr(2, 2);
                year = _configs.date_string.substr(4, 4);
                hours = '00';
                minutes = '00';
                seconds = '00';
                milliseconds = '00';

                month = parseFloat(month) - 1;

                dateTime = new Date(year, month, day, hours, minutes, seconds, milliseconds);

            }
            else if (_configs.date_string != null && _configs.date_string.length > 0) {
                dateTime = new Date(parseInt(_configs.date_string.substr(6)));
            }
            else {
                dateTime = new Date();
            }

            return $.format.date(dateTime, _configs.date_format);
        }
       
        return ({

            "formatString": formatString

        });

    };

})();

