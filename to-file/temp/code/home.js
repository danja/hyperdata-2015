/*

home.js

*/

var ATOM_NS = 'http://www.w3.org/2005/Atom';

function xml_ready(result){
    var xml = result.responseXML;
	//Make sure the target area for inserting data is clear
	$("#update-target").empty();
    $(xml).find('*').ns_filter(ATOM_NS, 'entry').each(function(){
        var title_elem = $(this).find('*').ns_filter(ATOM_NS, 'title').clone();
        var link_text = $(this).find('[rel="alternate"]')
                            .ns_filter(ATOM_NS, 'link')
                            .attr('href');
        var summary_elem = $(this).find('*').ns_filter(ATOM_NS, 'summary').clone();
        
        //Deal with the case of a missing title
        if (!title_elem.text()){
            title_elem = '[No title]';
        }

        //Deal with the case where rel='alternate' is omitted
        if (!link_text){
            link_text = $(this).find('*')
                                .ns_filter(ATOM_NS, 'link')
                                .not('[rel]')
                                .attr('href');
        }

        //Update the target area with the entry information
        $('<p></p>')
            .append(
                $('<a href="' + link_text + '"></a>')
                .append(title_elem)
            )
            .append(' - ')
            .append(summary_elem.clone())
            .fadeIn('slow') //bonus animation
            .appendTo('#update-target');
    }); //close each(
}
