# AlphaVideoTexture.js
Three.js Alpha Channel Video Texture. Renders a VideoTexture when alpha channel is supported, otherwise uses the SeeThru method.

## SeeThru
https://github.com/m90/seeThru

## Arguments
src: [Array] An array of video file paths in formats .mp4, .m4v, .ogv, and webm

options: [Object] Settings object.
  - alphaVideo: [string] Path to a true alpha channel video. Will be used if when supported.
  - renderEvery: [int] Determine how many frames get rendered. Example, set to 2 to rendere every other frame. Default 1.
  - quality: [float] 0.0 - 1.0 percent quality. Example, 0.5 is 50% quality. Defailt 1.0.
  - fallbackImageTexture: [string] Options: AlphaVideoTextureImageTexture.DATA & AlphaVideoTextureImageTexture.CANVAS. Explained below.
  - antialiasData: [bool] If fallbackImageTexture is set to DATA, then antialias is set. Default true.
  - size: [Mixed] Sets the size of the rendered video texture. Posible format examples: 1024, [512,512], {width:1024,height:1024}, "512x512"
  
mapping: See documentation for THREE.Texture

wrapS: See documentation for THREE.Texture

wrapT: See documentation for THREE.Texture

magFilter: See documentation for THREE.Texture

minFilter: See documentation for THREE.Texture

format: See documentation for THREE.Texture

type: See documentation for THREE.Texture

anisotropy: See documentation for THREE.Texture

## Example
`JavaScript
const videos = [
  'videos/TestFootage_wAlpha'+(low?'.low':'')+'.mp4',
  'videos/TestFootage_wAlpha'+(low?'.low':'')+'.m4v',
  'videos/TestFootage_wAlpha'+(low?'.low':'')+'.ogv',
  'videos/TestFootage_wAlpha'+(low?'.low':'')+'.webm'
];
const options = {
  alphaVideo: 'videos/true-alpha-video.webm',
  quality: query('quality', 0.5),
  renderEvery: query('renderEvery', 3),
  loop: true,
  fallbackImageTexture: AlphaVideoTextureImageTexture[query('image', 'DATA')],
  antialiasData: query('antialiasData', true),
  size: low ? 512 : 1024
};
const texture = new AlphaVideoTexture( videos, options );
`

### TODO
1. Use src when alphaVideo option is not set and alpha channel video is supported.
