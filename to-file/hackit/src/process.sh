# export from OO as HTML (OpenOffice Impress, .png)
./resize.sh 
rm html/*.html
python rename.py

# yes!!!
mencoder "mf://html/*.png" -ovc x264 -mf  fps=1.16666667  -o output.avi

# LiVES
# open output.avi

# resample to 25fps

# load audio (final.mp3)

# Encode - as defaults, let it resize
# (multi_encoder, High Quality AVI (XVID/MP3), mp3)
