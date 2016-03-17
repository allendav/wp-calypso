function ChunkFileNames() {
}

const CALYPSO_ENV = process.env.CALYPSO_ENV || 'development'

ChunkFileNames.prototype.apply = function( compiler ) {
	compiler.plugin("compilation", function( compilation ) {
		compilation.mainTemplate.plugin("require-ensure", function( _, chunk ) {
			var chunkMaps = chunk.getChunkMaps();
			return this.asString( [
				"// \"0\" is the signal for \"already loaded\"",
				"if ( installedChunks[ chunkId ] === 0 ) {",
				this.indent("return callback.call( null, " + this.requireFn + " );"),
				"}",
				"// an array means \"currently loading\".",
				"if ( installedChunks[ chunkId ] !== undefined ) {",
				this.indent( "installedChunks[ chunkId ].push( callback );" ),
				" } else { ",
				this.indent( [
					"// start chunk loading",
					"installedChunks[ chunkId ] = [ callback ];",
					"var head = document.getElementsByTagName('head')[0];",
					"var script = document.createElement( 'script' );",
					"var isDebug = window.app.isDebug;",
					"script.type = 'text/javascript';",
					"script.charset = 'utf-8';",
					"script.async = true;",
					"script.onerror = function() {",
					this.indent( [
						"script.onerror = script.onload = script.onreadystatechange = null;",
						"delete installedChunks[ chunkId ];",
						"callback.call( null, " + this.requireFn + ", new Error() )"
					] ),
					"};",
					"script.src = " + this.requireFn + ".p + (" + JSON.stringify( chunkMaps.name ) + "[chunkId]||chunkId) " + (  CALYPSO_ENV !== 'development' ? ( "+ '.' + (" + JSON.stringify( chunkMaps.hash ) + "[chunkId]||chunkID)" ) : '' ) + " + ( isDebug ? '' : '.min' ) + '.js';",
					"head.appendChild( script );"
				] ),
				"}"
			] );

		} );
	});
};

module.exports = ChunkFileNames;
