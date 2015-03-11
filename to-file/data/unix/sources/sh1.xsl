<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atomrdf="http://djpowell.net/schemas/atomrdf/0.3/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                exclude-result-prefixes="xsl rdf atom"
                >

  <!--   xsl:variable name="NS_ATOM" select="'http://www.w3.org/2005/Atom'" / -->

  <!--   xsl:output method="xml" encoding="utf-8" indent="yes" media-type="application/rdf+xml" / -->
  
<!-- <html><body><ul><li><a> -->

  <xsl:template match="/html/body">
      <xsl:for-each select="ul">
        <xsl:call-template name="ul" />
      </xsl:for-each>
  </xsl:template>

  <xsl:template name="ul">
       <xsl:for-each select="li">
      <xsl:call-template name="li" />
      </xsl:for-each>
  </xsl:template>

  <xsl:template name="li">
      <xsl:call-template name="a" />
  </xsl:template>
  
  <xsl:template name="a">  
          <xsl:value-of select="./*" />
          <xsl:text>&#xa;</xsl:text>
  </xsl:template> 

</xsl:stylesheet>
