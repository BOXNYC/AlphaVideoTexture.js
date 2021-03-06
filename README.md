# Three.js / AlphaVideoTexture.js
Three.js Alpha Channel Video Texture. Renders a VideoTexture with transparency. When playing in a browser supporting alpha channel, will simply play the alpha channel video, otherwise plays opaque videos while generating transparent pixels using the SeeThru method.

## SeeThru
https://github.com/m90/seeThru

## Arguments
src: * [Array] An array of video file paths in formats .mp4, .m4v, .ogv, and webm

options: [Object] Settings object.
  - alphaVideo: [string] Path to a true alpha channel video. Will be used if supported.
  - videoElement: [HTMLVideoElement] The Video element you wish to render on the texture. Default is a dynamically generated tag, not inserted in the DOM.
  - renderEvery: [int] Determine how many frames get rendered. Example, set to 2 to rendere every other frame. Default 1.
  - quality: [float] 0.0 - 1.0 percent quality. Example, 0.5 is 50% quality. Warning, if the fallback imageTexture is DATA, the quality option must be set to a foldable percent, for example .75 .5, .25, .125, etc. If not, the texture will distort non-uniformly. Default 1.0.
  - (v0.1) fallbackImageTexture: [string] Options: AlphaVideoTextureImageTexture.DATA & AlphaVideoTextureImageTexture.CANVAS. Explained below.
  - antialiasData: [bool] If fallbackImageTexture is set to DATA, then antialias is set. Default true.
  - size: [Mixed] Sets the size of the rendered video texture. Posible format examples: 1024, [512,512], {width:1024,height:1024}, "512x512". Size and video size must be at a power of 2. Default 512x512;
  
mapping: https://threejs.org/docs/#api/en/textures/Texture.mapping

wrapS: https://threejs.org/docs/#api/en/textures/Texture.wrapS

wrapT: https://threejs.org/docs/#api/en/textures/Texture.wrapT

magFilter: https://threejs.org/docs/#api/en/textures/Texture.magFilter

minFilter: https://threejs.org/docs/#api/en/textures/Texture.minFilter

format: https://threejs.org/docs/#api/en/textures/Texture.format

type: https://threejs.org/docs/#api/en/textures/Texture.type

anisotropy: https://threejs.org/docs/#api/en/textures/Texture.anisotropy

## Attributes
.video: [HTMLVideoElement] The video tag element being rendered.

.image: [Mixed] Will either be an HTMLVideoElement, HTMLCanvasElement, or ImageData Object.

.options: [Object] The rendered options argument.

.renderEvery: [int] See in options.

.quality: [float] See in options.

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
  antialiasData: true,
  size: 512
};
const texture = new THREE.AlphaVideoTexture( videos, options );
```
## TODO
1. Needed tests:
   - Android Chrome
   - Android Web Browser
   - Windows Edge

## Tests
- MacOS 10.14.6
  - Chrome 80.0.3987.87 √
  - FireFox 72.0.2 √
  - Safari 13.0.5 √
- iOS 13.3
  - Safari √
  - Chrome √
