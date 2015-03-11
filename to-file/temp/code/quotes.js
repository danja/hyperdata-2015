/*

quotes.js

*/

function xml_ready(result){
    var xml = result.responseXML;
	//Make sure the target area for inserting data is clear
	$("#update-target ol").empty();
    $(xml).find('*').ns_filter('http://example.com', 'q').each(function(){
        var quote_text = $(this).text()

        $('<li></li>')
            .html(quote_text)
            .appendTo('#update-target ol');
    }); //close each(
}

