(function () {

    VA.views.chartDomestic.ChartOptionMenuDomestic = function () {

        var _configs = {
        }



        var initControls = function () {
          
            var id_type_chart_link = $('#ID_TYPE_CHART_LINK').val()

            $('#TYPE_CHART_LINK').val(id_type_chart_link);

            $('#btnChoiceChart').click(function () {

                var type_chart_link = $('#TYPE_CHART_LINK').val();

                window.location.href = type_chart_link;

                return false;

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