# AlphaVideoTexture.js
Three.js Alpha Channel Video Texture. Renders a VideoTexture when alpha channel is supported, otherwise uses the SeeThru method.

## SeeThru
https://github.com/m90/seeThru

## Arguments
src: * [Array] An array of video file paths in formats .mp4, .m4v, .ogv, and webm

options: [Object] Settings object.
  - alphaVideo: [string] Path to a true alpha channel video. Will be used if supported.
  - videoElement: [HTMLVideoElement] The Video element you wish to render on the texture. Default is a dynamically generated tag, not inserted in the DOM.
  - renderEvery: [int] Determine how many frames get rendered. Example, set to 2 to rendere every other frame. Default 1.
  - quality: [float] 0.0 - 1.0 percent quality. Example, 0.5 is 50% quality. Warning, if the fallback imageTexture is DATA, the quality option must be set to a foldable percent, for example .75 .5, .25, .125, etc. If not, the texture will distort non-uniformly. Default 1.0.
  - fallbackImageTexture: [string] Options: AlphaVideoTextureImageTexture.DATA & AlphaVideoTextureImageTexture.CANVAS. Explained below.
  - antialiasData: [bool] If fallbackImageTexture is set to DATA, then antialias is set. Default true.
  - size: [Mixed] Sets the size of the rendered video texture. Posible format examples: 1024, [512,512], {width:1024,height:1024}, "512x512". Size and video size must be at a power of 2. Default 512x512;
  
mapping: See documentation for THREE.Texture

wrapS: See documentation for THREE.Texture

wrapT: See documentation for THREE.Texture

magFilter: See documentation for THREE.Texture

minFilter: See documentation for THREE.Texture

format: See documentation for THREE.Texture

type: See documentation for THREE.Texture

anisotropy: See documentation for THREE.Texture

## Attributes
.video: [HTMLVideoElement] The video tag element being rendered.

.image: [Mixed] Will either be an HTMLVideoElement, HTMLCanvasElement, or ImageData Object.

.options: [Object] The rendered options argument.

## Useage
```javascript
const videos = [
  'videos/seethru.mp4',
  'videos/seethru.m4v',
  'videos/seethru.ogv',
  'videos/seethru.webm'
];
const options = {
  alphaVideo: 'videos/true-alpha-video.webm',
  quality: 0.5,
  renderEvery: 3,
  loop: true,
  fallbackImageTexture: AlphaVideoTextureImageTexture.DATA,
  antialiasData: true,
  size: 512
};
const texture = new AlphaVideoTexture( videos, options );
```

### TODO
1. Use src when alphaVideo option is not set and alpha channel video is supported.
2. See if changing .option attribute values changes real-time.
3. Fallback if no video sources are added.
