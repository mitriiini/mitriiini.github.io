(function($) {
    $.fn.countdown = function(options, callback) {
        thisEl = $(this);
        var settings = {
            'date': null,
            'format': null
        };

        if (options) {
            $.extend(settings, options);
        }

        function countdown_proc() {
            var eventDate = Date.parse(settings.date) / 1000;
            var currentDate = Math.floor($.now() / 1000);

            if (eventDate <= currentDate) {
                callback.call(this);
                clearInterval(interval);
            }

            var seconds = eventDate - currentDate;
            var days = Math.floor(seconds / (60 * 60 * 24));
            seconds -= days * 60 * 60 * 24;
            var hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * 60 * 60;
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            if (days == 1) { thisEl.find(".timeRefDays").text("jour"); } else { thisEl.find(".timeRefDays").text("jours"); }
            if (hours == 1) { thisEl.find(".timeRefHours").text("heure"); } else { thisEl.find(".timeRefHours").text("heures"); }
            if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
            if (seconds == 1) { thisEl.find(".timeRefSeconds").text("seconde"); } else { thisEl.find(".timeRefSeconds").text("secondes"); }

            if (settings.format == "on") {
                days = (String(days).length >= 2) ? days : "0" + days;
                hours = (String(hours).length >= 2) ? hours : "0" + hours;
                minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
            }

            thisEl.find(".days").text(days);
            thisEl.find(".hours").text(hours);
            thisEl.find(".minutes").text(minutes);
            thisEl.find(".seconds").text(seconds);
        }

        countdown_proc();
        interval = setInterval(countdown_proc, 1000);
    };

})(jQuery);

$("#countdown").countdown({
    date: "25 September 2025 07:00:00",
    format: "on"
},
function() {
});