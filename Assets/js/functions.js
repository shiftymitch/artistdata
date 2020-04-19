$(document).ready(function() {
    console.log(data);
    //append agencies to option list
    for (var i = 0; i < data.agencies.length; i++) {
        var newOption = $("<option>").addClass("agency-option"+i);
        $("#agencies").append(newOption);
        $(".agency-option"+i).attr("value", i);
        $(".agency-option"+i).text(data.agencies[i]);
    }

    //append agents to option list
    for (var i = 0; i < data.agents.length; i++) {
        var newOption = $("<option>").addClass("agents-option"+i);
        $("#agents").append(newOption);
        $(".agents-option"+i).attr("value", i);
        $(".agents-option"+i).text(data.agents[i]);
    }
    
    //populate table with data
    function appendArtist() {
        for (var i = 0; i < data.artists.length; i++) {
            var newRow = $("<tr>").addClass("row"+i);
            $("tbody").append(newRow);
            var rowTh = $("<th>").attr("scope", "row");
            rowTh.text(data.artists[i]);
            newRow.append(rowTh);
            var rowTd1 = $("<td>").attr("id", "agc"+i);
            var rowTd2 = $("<td>").attr("id", "agt"+i);
            newRow.append(rowTd1);
            newRow.append(rowTd2);
        }
    }

    appendArtist();

    // table filter
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myList th").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

});