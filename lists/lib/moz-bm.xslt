<?xml version="1.0"?>

<!DOCTYPE xsl:stylesheet [
<!ENTITY font    "Arial, Helvetica">
<!ENTITY docBg   "#F0F0F0">
<!ENTITY sec1    "#C0C0C0">
<!ENTITY sec2    "#D0D0D0">
<!ENTITY sec3    "#B0B0B0">
<!ENTITY secBg   "#000000">
<!ENTITY secTxt  "white">
]>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="html" encoding="iso-8859-1"/>
  
  <xsl:template match="/group">

    <html>
      <head>
        <style>
          <xsl:comment>
            li {margin-left: -10pt;}
          </xsl:comment>
        </style>
      </head>
      <body text="#000000" link="#101010" vlink="#202020" alink="#303030">
        <font size="-1">
          <h1>Moz-BM by bm2xml.pl</h1>
          <b>by <a href="http://www.spychalski.de">Frank 'Psycho' Spychalski</a></b>
          <div style="position: fixed; top: 5px; right: 5px; width:150px; background-color:#D0D0D0; border-width:thin; border-color:#000000; border-style:solid;">
            <xsl:call-template name="tree"/>
          </div>          
          <ul>
            <xsl:apply-templates select="group|link"/>
          </ul>
        </font>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="tree">
    <ul>
      <xsl:for-each select="group">
        <li>
          <a href="#{@title}"><xsl:value-of select="@title"/></a>
          <xsl:if test="group">
            <xsl:call-template name="tree"/>
          </xsl:if>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>

  <xsl:template match="group">
    <li>
      <b><a name="{@title}"/><xsl:value-of select="@title"/></b>
      <ul>
        <xsl:apply-templates select="link|group"/>
      </ul>
    </li>
  </xsl:template>

  <xsl:template match="link">
    <li>
      <a href="{@href}"><xsl:value-of select="text()"/></a>
    </li>
  </xsl:template>

</xsl:stylesheet>

