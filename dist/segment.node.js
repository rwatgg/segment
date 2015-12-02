/**
 * segment - A little JavaScript class (without dependencies) to draw and animate SVG path strokes
 * @version v0.1.2
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */
function Segment(t,e,n){this.path=t,this.length=t.getTotalLength(),this.path.style.strokeDashoffset=2*this.length,this.begin="undefined"!=typeof e?this.valueOf(e):0,this.end="undefined"!=typeof n?this.valueOf(n):this.length,this.circular=!1,this.timer=null,this.draw(this.begin,this.end)}!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var n=(new Date).getTime(),i=Math.max(0,16-(n-t)),s=window.setTimeout(function(){e(n+i)},i);return t=n+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}(),Segment.prototype={draw:function(t,e,n,i){if(n){var s=i&&i.hasOwnProperty("delay")?1e3*parseFloat(i.delay):0,h=i&&i.hasOwnProperty("easing")?i.easing:null,a=i&&i.hasOwnProperty("callback")?i.callback:null,r=i&&i.hasOwnProperty("onStart")?i.onStart:null,l=this;if(this.circular=i&&i.hasOwnProperty("circular")?i.circular:!1,this.stop(),s)return delete i.delay,this.timer=setTimeout(function(){"function"==typeof r&&r.call(l.context),l.draw(t,e,n,i)},s),this.timer;var o=new Date,g=this.begin,d=this.end,c=this.valueOf(t),u=this.valueOf(e);"function"==typeof r&&r.call(l.context),function f(){var t=new Date,e=(t-o)/1e3,i=e/parseFloat(n),s=i;return"function"==typeof h&&(s=h(s)),i>1?s=1:l.timer=window.requestAnimationFrame(f),l.begin=g+(c-g)*s,l.end=d+(u-d)*s,l.begin=l.begin<0&&!l.circular?0:l.begin,l.begin=l.begin>l.length&&!l.circular?l.length:l.begin,l.end=l.end<0&&!l.circular?0:l.end,l.end=l.end>l.length&&!l.circular?l.length:l.end,l.end-l.begin<l.length&&l.end-l.begin>0?l.draw(l.begin,l.end):l.circular&&l.end-l.begin>l.length?l.draw(0,l.length):l.draw(l.begin+(l.end-l.begin),l.end-(l.end-l.begin)),i>1&&"function"==typeof a?a.call(l):void 0}()}else this.path.style.strokeDasharray=this.strokeDasharray(t,e)},strokeDasharray:function(t,e){if(this.begin=this.valueOf(t),this.end=this.valueOf(e),this.circular){var n=this.begin>this.end||this.begin<0&&this.begin<-1*this.length?parseInt(this.begin/parseInt(this.length)):parseInt(this.end/parseInt(this.length));0!==n&&(this.begin=this.begin-this.length*n,this.end=this.end-this.length*n)}if(this.end>this.length){var i=this.end-this.length;return[this.length,this.length,i,this.begin-i,this.end-this.begin].join(" ")}if(this.begin<0){var s=this.length+this.begin;return this.end<0?[this.length,this.length+this.begin,this.end-this.begin,s-this.end,this.end-this.begin,this.length].join(" "):[this.length,this.length+this.begin,this.end-this.begin,s-this.end,this.length].join(" ")}return[this.length,this.length+this.begin,this.end-this.begin].join(" ")},valueOf:function(t){var e=parseFloat(t);if(("string"==typeof t||t instanceof String)&&~t.indexOf("%")){var n;~t.indexOf("+")?(n=t.split("+"),e=this.percent(n[0])+parseFloat(n[1])):~t.indexOf("-")?(n=t.split("-"),e=n[0]?this.percent(n[0])-parseFloat(n[1]):-this.percent(n[1])):e=this.percent(t)}return e},stop:function(){window.cancelAnimationFrame(this.timer),this.timer=null},percent:function(t){return parseFloat(t)/100*this.length}};module.exports=Segment;