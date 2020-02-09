/**
  https://github.com/BOXNYC/AlphaVideoTexture.js/
  **/

if ( typeof THREE === 'undefined' ) {
  
  THREE = window;

}

THREE.AlphaVideoTextureImageTexture = {
  
  VIDEO: 'VIDEO',
  
  CANVAS: 'CANVAS',
  
  DATA: 'DATA'
  
};

THREE.AlphaVideoTexture = function( src, options, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {
  
  // Process Arguments:
  
  src = src || [];
  if ( typeof src === 'string' ) src = src.split(/\s*\,\s*/g);
  src = processSrc( src );
  if ( !src.length ) return console.error( 'No sources.' );

  options = options || {};
  options.renderEvery = options.renderEvery || 1;
  options.quality = options.quality || 1.0;
  options.fallbackImageTexture = options.fallbackImageTexture || THREE.AlphaVideoTextureImageTexture.DATA;
  options.antialiasData = typeof options.antialiasData === 'undefined' ? true : options.antialiasData;
  options.size = processSize( options.size || { width: 512, height: 512} );
  
  this.options = options;
  
  // Set Attributes:
  
  this.video = options.videoElement = processVideoElement( options.videoElement );
  this.video.currentTime = 0.001;
  
  this.renderEvery = options.renderEvery;
  
  this.quality = options.quality;
  
  // Private vars:
  
  var bufferCanvas = null,
      buffer = null,
      displayCanvas = null,
      display = null,
      lastDrawnFrameTime = null,
      renderCount = 0;
  
  // Public methods:
  
  this.processPixels = function() {
    
    if ( this.renderEvery != options.renderEvery ) {
      
      options.renderEvery = this.renderEvery;
      renderCount = 0;
    
    }
    
    if ( this.video != options.videoElement ) options.videoElement = processVideoElement( this.video );
    
    var currentFrameTime = this.video.currentTime;
    
    if ( lastDrawnFrameTime !== currentFrameTime && this.video.readyState > 1 && !renderCount ) {
      
      var image, alphaData, i, len, currentFrameTime = this.video.currentTime;
      
      if ( this.quality != options.quality ) options.quality = this.quality;
      
      var width = options.size.width,
          height = options.size.height;
      
      if ( options.quality != 1 ) {
        
        width *= options.quality;
        height *= options.quality;
        
      }
      
      if ( !bufferCanvas ) {
        
        bufferCanvas = document.createElement( 'canvas' );
        bufferCanvas.width = width;
        bufferCanvas.height = height * 2;
        buffer = bufferCanvas.getContext( '2d' );
        
        if ( this.imageTexture == THREE.AlphaVideoTextureImageTexture.CANVAS ) {
          
          displayCanvas = document.createElement( 'canvas' );
          displayCanvas.width = width
          displayCanvas.height = height;
          display = displayCanvas.getContext( '2d' );
          
        }
        
      }
      
      var image, alphaData, i, len;
      
      buffer.drawImage( this.video, 0, 0, width, height * 2 ); //scales if <video>-dimensions are not matching
      
      image = buffer.getImageData(0, 0, width, height);
      alphaData = buffer.getImageData(0, height, width, height).data;
      
      for (i = 3, len = image.data.length; i < len; i = i + 4)
        image.data[i] = Math.max( alphaData[i - 1], alphaData[i - 2], alphaData[i - 3] );
      
      if ( this.imageTexture == THREE.AlphaVideoTextureImageTexture.CANVAS ) {
        
        display.putImageData( image, 0, 0, 0, 0, width, height );
        
      } else if ( this.imageTexture == THREE.AlphaVideoTextureImageTexture.DATA ) {
        
        var data = new Uint8Array( image.data.buffer );
        this.image = { data: data || null, width: width || 1, height: height || 1 };
        
      }
      
      lastDrawnFrameTime = currentFrameTime;
      
    }
    
    renderCount = renderCount >= options.renderEvery ? 0 : renderCount + 1;
    
  }
  
  // Private methods
  
  function processSrc( src ) {
    
    var srcData = {};
    
    for ( var index in src ) {
      
      var path = src[index],
          ext = path.split( '.' ).reverse()[0].toLowerCase();
      
      switch( ext ) {
         case 'm4v'  : srcData.mp4 = path; break;
         case 'mp4'  : srcData.none = path; break;
         case 'ogv'  : srcData.ogg = path; break;
         case 'webm' : srcData.webm = path; break;
      }
      
    }
    
    if ( typeof srcData.mp4 === 'undefined' && typeof srcData.none === 'string' ) {
      srcData.mp4 = srcData.none;
      delete srcData.none;
    }
    
    if ( typeof options.alphaVideo === 'string' ) {
      srcData.webmAlpha = options.alphaVideo;
      delete options.alphaVideo;
    }
    
    if ( typeof srcData.length === 'length' ) delete srcData.length;
    var length = 0;
    for( var type in srcData ) length++;
    srcData.length = length;
    
    return srcData;
  
  }
  
  function processSize( size ) {
    
    if ( typeof size !== 'object' ) {
      
      if (  typeof size === 'string' && size.match(/\s*[0-9]{1,}\s*x\s*[0-9]{1,}\s*/i) )
         options.size = JSON.parse( '{"width":'+size.replace(/\s*x\s*/i, ',"height":')+'}' );
      else if ( typeof size === 'number' )  size = { width: parseInt(size), height: parseInt( size ) };
    
    } else if ( typeof size === 'object' && typeof size.length === 'number' && size.length == 2 ) {
      
      size =  { width: size[0], height: size[1] };
    
    }
    
    return size;
    
  }
  
  function processVideoElement( videoElement ) {
    
    if ( videoElement ) return videoElement;
    
    var v = document.createElement('video');
    
    v.autoplay = true;
    v.setAttribute('autoplay', 'autoplay');
    
    v.playsinline = true;
    v.setAttribute('playsinline', 'playsinline');
    v.setAttribute('webkit-playsinline', 'playsinline');
    
    v.loop = options.loop || false; if (v.loop) v.setAttribute('loop', 'loop');
    
    videoElement = v;
    
    return v;
  
  }
  
  // Begin:
  
  var chromeVersion = function() {     
        var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);        
        return raw ? parseInt(raw[2], 10) : 0;
      }(),
      canPlayWebm = this.video.canPlayType( 'video/webm' ),
      sources = '';
  
  if ( !canPlayWebm || ( canPlayWebm && chromeVersion && chromeVersion < 31 ) ) {
    
    if ( src.mp4 ) sources += '<source src="'+src.mp4+'" type="video/mp4">';
    if ( src.ogg ) sources += '<source src="'+src.ogg+'" type="video/ogg">';
    if ( canPlayWebm && src.webm) sources += '<source src="'+src.webm+'" type="video/webm">';
    if ( src.none ) sources += '<source src="'+src.none+'">';
    
    this.video.innerHTML = sources;
    
    if ( options.fallbackImageTexture == THREE.AlphaVideoTextureImageTexture.CANVAS ) {
      
      this.imageTexture = THREE.AlphaVideoTextureImageTexture.CANVAS;
      
      this.processPixels();
      
      AlphaVideoTexture.prototype.isCanvasTexture = true;
      THREE.Texture.call( this, displayCanvas, mapping, wrapS, wrapT, magFilter, minFilter, THREE.RGBAFormat, type, anisotropy );
      
      this.needsUpdate = true;
    
    } else if ( options.fallbackImageTexture == THREE.AlphaVideoTextureImageTexture.DATA ) {
      
      this.imageTexture = THREE.AlphaVideoTextureImageTexture.DATA;
      
      AlphaVideoTexture.prototype.isDataTexture = true;
      THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, THREE.RGBAFormat, type, anisotropy );
      
      if ( options.antialiasData ) {
        this.generateMipmaps = true;
      } else {
        this.magFilter = magFilter !== undefined ? magFilter : THREE.NearestFilter;
        this.minFilter = minFilter !== undefined ? minFilter : THREE.NearestFilter;
        this.generateMipmaps = false;
      }
      
      this.flipY = true;
      this.unpackAlignment = 1;
      
      this.processPixels();
      if ( this.image ) this.needsUpdate = true;
      
    }
    
  } else {
    
    this.imageTexture = THREE.AlphaVideoTextureImageTexture.VIDEO;
    
    this.video.innerHTML = '<source src="'+src.webmAlpha+'" type="video/webm">';
    this.video.removeAttribute('style');
    
    THREE.Texture.call( this, this.video, mapping, wrapS, wrapT, magFilter, minFilter, THREE.RGBAFormat, type, anisotropy );
    this.format = format || THREE.RGBAFormat;
    this.minFilter = minFilter || THREE.LinearFilter;
    this.magFilter = magFilter || THREE.LinearFilter;
    this.generateMipmaps = false;
    
  }

}

THREE.AlphaVideoTexture.prototype = Object.assign( Object.create( THREE.Texture.prototype ), {

  constructor: THREE.AlphaVideoTexture,

  isVideoTexture: true,

  update: function () {
    
    var video = this.video;
    
    if ( video.readyState >= video.HAVE_CURRENT_DATA ) {
            
      this.processPixels();
      if ( this.image ) this.needsUpdate = true;

    }

  }

} );
