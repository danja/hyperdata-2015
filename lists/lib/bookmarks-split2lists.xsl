<?xml version="1.0"?>

<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	version="1.0" xmlns:exsl="http://exslt.org/common"
	extension-element-prefixes="exsl">
	<xsl:output indent="yes" omit-xml-declaration="yes" method="xml" />
	<xsl:template match="/html">
		<html>
			<xsl:call-template name="head" />
			<body>
				<xsl:apply-templates select="body/dl" />
			</body>
		</html>
	</xsl:template>

	<xsl:template name="head">
		<head>
			<xsl:copy-of select="head/*" />
			<script type="text/javascript" src="j/jquery-1.5.2.min.js"></script>

			<script type="text/javascript" src="j/jquery.editable-1.3.3.min"></script>

			<script type="text/javascript" src="j/jquery-ui-1.8.11.custom.min.js"></script>
			<script type="text/javascript" src="j/jquery.ui.nestedSortable.js"></script>
			<script type="text/javascript" src="j/init.js"></script>
		</head>
	</xsl:template>

	<xsl:template match="dd">
		<exsl:document href="{h3/text()}" method="html">
			<html>
				<xsl:call-template name="head" />
				<body>
					<!-- xsl:apply-templates select="body/dl" / -->
					<xsl:apply-templates select="./*" />
				</body>
			</html>
		</exsl:document>
		<xsl:apply-templates select="./*" />
	</xsl:template>

	<xsl:template match="h3">
		<div class="description">
			<xsl:value-of select="./text()" />
		</div>

	</xsl:template>

	<xsl:template match="dl">
		<ul>
			<xsl:apply-templates select="./*" />
		</ul>
	</xsl:template>

	<xsl:template match="dt">
		<li class="linkitem">
			<div class="link">
				<xsl:apply-templates select="./*" />
				<span class="description">
				</span>
			</div>
		</li>
	</xsl:template>

	<xsl:template match="a">
		<xsl:copy-of select="." />
	</xsl:template>
	<xsl:template match="text()" />
</xsl:transform>
