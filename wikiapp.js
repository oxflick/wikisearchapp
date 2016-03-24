
$(document).ready(function() {

	//checks if results exist, if yes remove them
	function clearResults() {
		var results = $('.result');
		if (results.children().length > 0) {
			results.children().remove();
		}
	}

    var sherror = document.getElementById("error");
    document.getElementById("buttonSearch").onclick = doSearch;

	function doSearch() {
		clearResults();
		var v = document.getElementById("search").value;
		//checks if search word has been typed
		if (v.length === 0) {
			alert("Please enter a search term");
			return;
		}

	    // this is a url for open search on wikipedia
	    var urlOpen = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + v + '&limit=20&format=json&callback=?';
	   
        		

		$.ajax({
			dataType: "json",
			url: urlOpen,
			success: getResult,
			error: function(jqXHR, exception) {
	            if (jqXHR.status === 0) {
	                alert('Not connect.\n Verify Network.');
	            } else if (jqXHR.status == 404) {
	                alert('Requested page not found. [404]');
	            } else if (jqXHR.status == 500) {
	                alert('Internal Server Error [500].');
	            } else if (exception === 'parsererror') {
	                alert('Requested JSON parse failed.');
	            } else if (exception === 'timeout') {
	                alert('Time out error.');
	            } else if (exception === 'abort') {
	                alert('Ajax request aborted.');
	            } else {
	                alert('Uncaught Error.\n' + jqXHR.responseText);
                }
            }
		});


	    function getResult(data) {

		    //process data and make a 2d array to make triples from the returned object      

		    var consArray = [];

		    for (var k=0; k < data[1].length; k++ ){
		    	consArray.push([data[1][k], data[2][k], data[3][k]]);

		    }
		    // to go try array and append to the DOM

		    for ( var i=0; i < consArray.length; i++) {
		    	$('.result').append('<div class="thumbnail"><a class="artlink" target="_blank" href="' + consArray[i][2] + '"><p class="arttitle">' + consArray[i][0] + '<div class="snippet">' + consArray[i][1] + '</div></p></a></div>');
		    	$('.result').show();

		    } 
   
	    }




		// reset the form input
		$('form').each(function(){
		    this.reset();
		});

		return false;
	}
}); 


