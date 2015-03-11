/*

workbench.js

*/

// The jQuery hook invoked once the DOM is fully ready
$(document).ready(function(){ 
	// Get the target XML file contents (AJAX call)
	var fileurl = $("link[rel='target_XML']").attr('href');
    $.ajax({
        url: fileurl,
        type: "GET",
        dataType: "xml",
        complete: xml_ready,
        error: error_func
     });
});


// Callback for when the AJAX call results in an error
function error_func(result) {
    alert(result.responseText);
}


// ns_filter, a jQuery extension for XML namespace queries.
(function($) {
  $.fn.ns_filter = function(namespaceURI, localName) {
    return $(this).filter(function() {
        var domnode = $(this)[0];
        return (domnode.namespaceURI == namespaceURI && domnode.localName == localName);
    });
  };

})(jQuery);

