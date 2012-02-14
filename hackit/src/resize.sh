#!/bin/bash

FILES=./html/*.png
max=640

for f in $FILES
do
	s=`identify -format "%w" $f`
	echo "Checking $f"
	identify -format "%w, %h" $f
# 	if [ $s -gt $max ]; then
		echo "Resizing..."
		mogrify -resize $max $f
		echo "new size :"
		identify -format "%w, %h" $f
#	fi
	echo
done
