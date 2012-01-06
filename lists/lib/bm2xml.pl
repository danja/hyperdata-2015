#!/usr/bin/perl

open (IN, $ARGV[0]);
@all = <IN>;
close (IN);

$all = join ("", @all);

$all =~ s/^.*<\/H1>/<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- 
    created with bm2xml.pl 
    (c) 2002 by Frank Spychalski (frank\@spychalski.de) 

-->
<group title="Root">
/s;

$all =~ s/<DT>//g;
$all =~ s/<DL>//g;
$all =~ s/<HR>//g;

#$all =~ s/<DL>//g;
$all =~ s/<p>//g;
#$all =~ s/  / /g;
$all =~ s/<H3/<group/g;
$all =~ s/>([^<]*)<\/H3>/ title="$1">/g;
$all =~ s/<\/DL>/<\/group>/g;

$all =~ s/<A/<link/g;
$all =~ s/<\/A/<\/link/g;

$all =~ s/&/&amp;/g;
$all =~ s/(HREF="[^"]*)</$1&lt;/;
$all =~ s/(HREF="[^"]*)>/$1&gt;/;

$all =~ s/HREF/href/g;
$all =~ s/ADD_DATE/add_date/g;
$all =~ s/LAST_MODIFIED/last_modified/g;
$all =~ s/LAST_CHARSET/last_charset/g;
$all =~ s/LAST_VISIT/last_visit/g;

print $all;
