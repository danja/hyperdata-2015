Make linked data for Unix/Bash/POSIX commands

script to walk dirs and do .n3 -> .rdf

put it all in a store with sparql

/resource -303 -> /page.html (or just page?)

page.rdf, page.n3

lambda?

/usr/share/man/man1
-----
local page - start with man page

@prefix unix: <http://purl.org/stuff/unix> .
@prefix r: <http://hyperdata.org/unix/resource/> .

r:echo a unix:Command ;

http://en.wikipedia.org/wiki/Echo_(command)
http://dbpedia.org/page/List_of_Unix_utilities
http://dbpedia.org/resource/Echo_(command)

pointer to Ubuntu package? source?
flags as extra meta?

*************** dbPedia says:
@prefix owl:	<http://www.w3.org/2002/07/owl#> .
<http://mpii.de/yago/resource/Echo_(command)>	owl:sameAs	<http://dbpedia.org/resource/Echo_(command)> .
@prefix rdf:	<http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix yago:	<http://dbpedia.org/class/yago/> .
<http://dbpedia.org/resource/Echo_(command)>	rdf:type	yago:ComputingCommands ,
		yago:UnixSUS2008Utilities ,
		yago:StandardUnixPrograms ;
	owl:sameAs	<http://dbpedia.org/resource/Echo_(command)> .
************************************

foaf:Document
primary topic

-----------------------
http://www4.wiwiss.fu-berlin.de/bizer/pub/LinkedDataTutorial/

opengroup.org/onlinepubs/9699919799/
shellhaters.heroku.com/posix
http://linux.about.com/library/cmd/blcmdl1_man2html.htm
http://www.linfo.org/command_index.html
http://pubs.opengroup.org/onlinepubs/9699919799/
