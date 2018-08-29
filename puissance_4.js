(function($) {
    $.fn.puissance_4 = function (x, y, colors = {yoda: "yellow", vador: "red"}) {
        var i = 0;
        var tmp = 0;
        var j = 0;
        var frame_count = 0;
        var color_count = 0;
        var chip_str = "";
        var player = 0;
        if (colors[Object.keys(colors)[0]] ===
            colors[Object.keys(colors)[1]]) {
            colors = ["yellow", "red"];
        }

        function apply_css(str) {
            $(str).css("width", "35px");
            $(str).css("height", "35px");
            $(str).css("margin", "2px");
            $(str).css("border", "solid 1px black");
            $(str).css("border-radius", "50%");
            $(str).css("background-color", "white");
        }

        function color_checks(current_frame, color_count) {
            if (color_count % 2 === 0 &&
                !current_frame.hasClass("full")) {
                current_frame.css("background-color", colors[Object.keys(colors)[0]]);
                current_frame.addClass("full");
                color_count = 1;
            } else if (!current_frame.hasClass("full") &&
                color_count % 2 === 1) {
                current_frame.css("background-color", colors[Object.keys(colors)[1]]);
                current_frame.addClass("full");
                color_count = 0;
            } else if (current_frame.hasClass("full") &&
                color_count % 2 === 0) {
                current_frame = current_frame.prev();
                current_frame.css("background-color", colors[Object.keys(colors)[0]]);
                current_frame.addClass("full");
                color_count = 1;
            } else if (current_frame.hasClass("full") &&
                color_count % 2 === 1) {
                current_frame = current_frame.prev();
                current_frame.css("background-color", colors[Object.keys(colors)[1]]);
                current_frame.addClass("full");
                color_count = 0;
            }
            return color_count;
        }

        function oblic_up_check(current_frame) {
            var i = 0;
            var win_count = 0;
            var matches = $(current_frame).attr("id").match(
                /frame_([0-9]+)_([0-9]+)/);
            var absciss = parseInt(matches[1]) - 3;
            var ordinate = parseInt(matches[2]) + 3;
            while (i < 7) {
                if (absciss < 0) {
                    absciss += 1;
                    if (absciss < -1) {
                        win_count = 1;
                    }
                }
                if (ordinate < 0) {
                    ordinate += 1;
                    if (ordinate < -1) {
                        win_count = 1;
                    }
                }
                if ($(current_frame).css("background-color") ===
                    $("#frame_" + absciss + "_" + ordinate).css(
                        "background-color")) {
                    win_count += 1;
                } else {
                    win_count = 0;
                }
                if (win_count === 4) {
                    return true;
                }
                absciss += 1;
                ordinate -= 1;
                i += 1;
            }
            return false;
        }

        function oblic_down_check(current_frame) {
            var i = 0;
            var win_count = 0;
            var matches = $(current_frame).attr("id").match(
                /frame_([0-9]+)_([0-9]+)/);
            var absciss = parseInt(matches[1]) - 3;
            var ordinate = parseInt(matches[2]) - 3;
            while (i < 7) {
                if (absciss < 0) {
                    absciss += 1;
                    if (absciss < -1) {
                        win_count = 1;
                    }
                }
                if (ordinate < 0) {
                    ordinate += 1;
                    if (ordinate < -1) {
                        win_count = 1;
                    }
                }
                if ($(current_frame).css("background-color") ===
                    $("#frame_" + absciss + "_" + ordinate).css(
                        "background-color")) {
                    win_count += 1;
                } else {
                    win_count = 0;
                }
                if (win_count === 4) {
                    return true;
                }
                absciss += 1;
                ordinate += 1;
                i += 1;
            }
            return false;
        }

        function horizontal_check(current_frame) {
            var win_count = 0;
            var matches = $(current_frame).attr("id").match(
                /frame_([0-9]+)_([0-9]+)/);
            var ordinate = parseInt(matches[2]);
            var start = parseInt(matches[1] - 3);
            var end = parseInt(matches[1] + 3);
            while (start < 0) {
                start += 1;
                if (start < -1) {
                    win_count = 1;
                }
            }
            while (start < end) {
                if ($(current_frame).css("background-color") ===
                    $("#frame_" + start + "_" + ordinate).css(
                        "background-color")) {
                    win_count += 1;
                } else {
                    win_count = 0;
                }
                if (win_count === 4) {
                    return true;
                }
                start += 1;
            }
            return false;
        }

        function vertical_check(current_frame) {
            var win_count = 1;
            var matches = $(current_frame).attr("id").match(
                /frame_([0-9]+)_([0-9]+)/);
            var absciss = parseInt(matches[1]);
            var start = parseInt(matches[2] - 3);
            var end = parseInt(matches[2] + 3);
            while (start < end) {
                if ($(current_frame).css("background-color") ===
                    $("#frame_" + absciss + "_" + start).css(
                        "background-color")) {
                    win_count += 1;
                } else {
                    win_count = 0;
                }
                if (win_count === 4) {
                    return true;
                }
                start += 1;
            }
            return false;
        }

        if (x >= 4 && y >= 4) {
            $(this).append("<div id=\"hidden\"></div>");
            $(this).append("<div id=\"container\"></div>");
            $(this).append("<p id=\"turn\">This is " +
                (isNaN(Object.keys(colors)[0]) ? "" : "player ")
                    + Object.keys(colors)[0] + "'s turn</p>");
            $("#turn").css("margin-left", "45%");
            while (i < x) {
                $("#hidden").append("<div id=\"chip_" + i + "\"></div>");
                apply_css("#chip_" + i);
                $("#chip_" + i).css("margin-left", ((37 * i) + (4 * i) +
                    2) + "px");
                $("#chip_" + i).hide();
                $("#container").append("<div id=\"row_" + i +"\"></div>");
                while (j < y) {
                    $("#row_" + i).append("<div id=\"frame_" + i + "_" + j +
                        "\"></div>");
                    apply_css("#frame_" + i + "_" + j);
                    j += 1;
                }
                $("#row_" + i).click(function () {
                    if (frame_count === y) {
                        frame_count = 0;
                    }
                    var str = ":nth-child(" + ($(this).children().length
                        - frame_count) + ")";
                    var current_frame = $(this).children(str);
                    if (current_frame.next().css("background-color") ===
                        "rgb(255, 255, 255)" && frame_count > 0) {
                        while (current_frame.next().css("background-color") ===
                            "rgb(255, 255, 255)" && frame_count > 0) {
                            frame_count -= 1;
                            str = ":nth-child(" + ($(this).children().length
                            - frame_count) + ")";
                            current_frame = $(this).children(str);
                        }
                    }
                    while (current_frame.prev().hasClass("full")
                        && frame_count < y) {
                        frame_count += 1;
                        str2 = ":nth-child(" + ($(this).children().length
                            - (frame_count - 1)) + ")";
                        str = ":nth-child(" + ($(this).children().length
                            - frame_count) + ")";
                        current_frame = $(this).children(str2);
                    }
                    frame_count += 1;
                    current_frame = $(this).children(str);
                    color_count = color_checks(current_frame, color_count);
                    if (vertical_check(current_frame) ||
                        horizontal_check(current_frame) ||
                        oblic_down_check(current_frame) ||
                        oblic_up_check(current_frame)) {
                        if (!confirm((isNaN(Object.keys(colors)[(
                            player % 2 === 0 ? 0 : 1)]) ? "" : "player ")
                        + Object.keys(colors)[(player % 2 === 0 ? 0 : 1)]
                            + " wins! Restart?")) {
                            $("#container").children().off("click");
                        } else {
                            location.reload();
                        }
                    }
                    player += 1;
                    $("#turn").text("This is " + 
                        (isNaN(Object.keys(colors)[(player % 2 === 0 ? 0 : 1)])
                            ? "" : "player ")
                        + Object.keys(colors)[
                        (player % 2 === 0 ? 0 : 1)] + "'s turn");
                    $(current_frame).css("position", "relative");
                    $(current_frame).css("top", "-" + ((35 * y) + (4 * y) + 2) +"px");
                    $(current_frame).animate({
                        top: "0px",
                    }, 300, function () {});
                    if (frame_count === y) {
                        confirm("This column is full, you won't be able to " +
                            "place a chip there anymore!");
                        $(this).off("click");
                    }
                    $(chip_str).css("background-color", colors[
                        Object.keys(colors)[color_count]]);
                });
                $("#row_" + i).hover(function () {
                    chip_str = "#chip_" + $(this).attr("id").substr(4,
                        $(this).attr("id").length);
                    $(chip_str).show();
                    $(chip_str).css("background-color", colors[
                        Object.keys(colors)[color_count]]);
                }, function () {
                    chip_str = "#chip_" + $(this).attr("id").substr(4,
                        $(this).attr("id").length);
                    $(chip_str).hide();
                });
                j = 0;
                i += 1;
            }
            $("#container").css("width", "" +
                ((35 * x) + (4 * x) + (2 * x)) + "px");
            $("#container").css("height", "" + ((35 * y) + (4 * y) + 2) + "px");
            $("#container").css("background-color", "blue");
            $("#container").css("margin", "auto");
            $("#container").css("display", "flex");
            $("#hidden").css("display", "flex");
            $("#hidden").css("width", "" +
                ((35 * x) + (4 * x) + (2 * x)) + "px");
            $("#hidden").css("margin", "auto");
            $("#hidden").css("height", "41px");
        }
        return $(this);
    };
})(jQuery);

$(".puissance_4").puissance_4(12, 12, {vador:"red", yoda:"purple"});