import glob, os

# img48.png
def sanify(name):
    name = name[3:]
    return name.zfill(5)

def rename(dir, pattern):
    for pathAndFilename in glob.iglob(os.path.join(dir, pattern)):
        title, ext = os.path.splitext(os.path.basename(pathAndFilename))
        os.rename(pathAndFilename, 
                  os.path.join(dir, sanify(title) + ext))



dir = r'html'
pattern = r'img*.png'

rename(dir, pattern)



