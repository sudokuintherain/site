$(function() {

    var for_first_play = 0;
    $("#sound-button").click(function() {

        if ( $('#sound-controller').get(0).paused ) {

            // play sound
            if ( for_first_play === 0 ) {
                $("#sound-controller").get(0).loop = true;
                $("#sound-controller").get(0).volume = 0.5;
                for_first_play++;
            }
            $("#sound-controller").get(0).play();

            // change button image
            $("#sound-button").attr('class', 'pause');

        } else {

            // pause sound
            $("#sound-controller").get(0).pause();

            // change button image
            $("#sound-button").attr('class', 'play');
        }
    });

    $("#volume-bar").on("input", function() {
        $("#sound-controller").get(0).volume = this.value;
    });

    $("#check-button").click(function() {

        // collect solution number
        solution = [];
        for (var i = 1; i < 82; i++) {
            var solution_number = $("#n" + i).val();

            // change zenkaku to hankaku
            solution_number = solution_number.replace(/[０-９]/g,function(s){
                return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
            });

            if(solution_number == "") {
                $("#check-display").val('FAILS');
                return false;
            } else {
                solution[i - 1] = solution_number;
            }
        }

        // compare answer and solution
        for (var i = 0; i < 82; i++) {
            if (solution[i] != answer[i]) {
                $("#check-display").val('FAILS');
                return false;
            }
        }

        $("#check-display").val('CLEAR');

    });

    $("#select-link").click(function(event) {

        // disable a link
        event.preventDefault();

        $("#select-number").css("display", "inline-block");
        $("#select-submit").css("display", "inline-block");
        $("#select-link").css("text-decoration", "none");
    });

    $("#select-submit").click(function() {
        var select_number = $("#select-number").val();
        if (0 < select_number && select_number < 10001 ) {
            window.location.href = 'https://sudokuintherain.github.io/site/' +
                                   select_number +
                                   '.html';
        } else {
            return false;
        }
    });
    
});
