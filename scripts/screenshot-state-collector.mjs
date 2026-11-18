// Passive collection plus exactly one requested pre/post state read. Reads can perturb timing.
export function installEventCollector() {
  const key = '__timelineScreenshotState_20261118';
  if (Object.prototype.hasOwnProperty.call(window, key)) throw new Error('Collector collision');
  const capacity = 512, records = [], timeOrigin = performance.timeOrigin;
  const documentId = String(timeOrigin);
  let dropped = 0, target = null, lastPointer = null;
  const identify = el => target && el === target ? 'all-events-link' :
    el?.matches?.('.mobile-app-back') ? 'return-button' :
    el?.matches?.('a[data-event-id="nvidia-groot2-research"]') ? 'expected-card' : 'other';
  const add = (kind, data = {}) => {
    if (records.length === capacity) { records.shift(); dropped++; }
    records.push({at:performance.now(),kind,...data});
  };
  const state = () => target ? {text:target.textContent?.slice(0,100),class:target.getAttribute('class'),ariaCurrent:target.getAttribute('aria-current')} : null;
  const attach = () => {
    const found = document.querySelector('.timeline-navigation-heading > a');
    if (!found || found === target) return;
    target = found;
    add('target-observed', {state:state()});
    new MutationObserver(changes => {
      for (const change of changes) {
        add('target-mutation', {mutationType:change.type,attribute:change.attributeName,oldValue:change.oldValue?.slice(0,100) ?? null,state:state()});
      }
    }).observe(target, {attributes:true,attributeFilter:['class','aria-current'],attributeOldValue:true,childList:true,characterData:true,subtree:true,characterDataOldValue:true});
  };
  // Observe DOM additions only until this document's target is discovered.
  const boot = new MutationObserver(() => { attach(); if(target) boot.disconnect(); });
  boot.observe(document, {childList:true,subtree:true});
  attach(); if(target) boot.disconnect();
  for (const type of ['pointermove','pointerdown','pointerup','mouseover','mouseout','mousemove','mousedown','mouseup','touchstart','touchend']) {
    document.addEventListener(type, event => {
      const touch = event.changedTouches?.[0];
      const point = touch || event;
      const data = {type,identity:identify(event.target),pointerType:event.pointerType ?? (touch?'touch':null),clientX:Number.isFinite(point.clientX)?point.clientX:null,clientY:Number.isFinite(point.clientY)?point.clientY:null,isTrusted:event.isTrusted};
      lastPointer = {...data,at:performance.now(),documentId};
      add('pointer', data);
    }, {capture:true,passive:true});
  }
  for(const type of ['focusin','focusout']) document.addEventListener(type,event => add('focus',{type,identity:identify(event.target),relatedIdentity:identify(event.relatedTarget),isTrusted:event.isTrusted}),{capture:true,passive:true});
  for(const type of ['transitionrun','transitionstart','transitionend','transitioncancel']) document.addEventListener(type,event => {
    if(event.target === target || event.target?.matches?.('.mobile-app-back')) add('target-transition',{identity:identify(event.target),type,propertyName:event.propertyName,elapsedTime:event.elapsedTime,pseudoElement:event.pseudoElement,isTrusted:event.isTrusted});
  },{capture:true,passive:true});
  const scalar = value => typeof value === 'number' ? (Number.isFinite(value) ? value : String(value)) : value ?? null;
  const element = el => {
    if (!el) return null;
    const style = getComputedStyle(el), rect = el.getBoundingClientRect();
    const animations = el.getAnimations({subtree:false});
    return {identity:identify(el),connected:el.isConnected,text:el.textContent?.slice(0,100),class:el.getAttribute('class'),
      ariaCurrent:el.getAttribute('aria-current'),ariaLabel:el.getAttribute('aria-label'),
      pseudo:{hover:el.matches(':hover'),focus:el.matches(':focus'),focusVisible:el.matches(':focus-visible'),active:el.matches(':active')},
      rect:{x:rect.x,y:rect.y,width:rect.width,height:rect.height,top:rect.top,right:rect.right,bottom:rect.bottom,left:rect.left},
      rendered:style.display!=='none' && style.visibility!=='hidden' && rect.width>0 && rect.height>0,
      style:{display:style.display,visibility:style.visibility,color:style.color,backgroundColor:style.backgroundColor,
        borderColor:style.borderColor,borderRadius:style.borderRadius,fontWeight:style.fontWeight,
        transitionProperty:style.transitionProperty,transitionDuration:style.transitionDuration,transitionDelay:style.transitionDelay},
      animationCount:animations.length,animations:animations.slice(0,16).map(animation => {
        const timing=animation.effect?.getComputedTiming();
        return {type:animation.constructor.name,transitionProperty:animation.transitionProperty ?? null,
          animationName:animation.animationName ?? null,playState:animation.playState,pending:animation.pending,
          currentTime:scalar(animation.currentTime),startTime:scalar(animation.startTime),playbackRate:animation.playbackRate,
          timing:timing ? Object.fromEntries(['delay','endDelay','fill','iterationStart','iterations','duration','direction','easing','endTime','activeDuration','localTime','progress','currentIteration'].map(k=>[k,scalar(timing[k])])) : null};
      })};
  };
  Object.defineProperty(window,key,{configurable:false,value:(phase='post') => {
    if(phase!=='pre' && phase!=='post') throw new Error('Unexpected probe phase');
    const readStart=performance.now();
    const current=document.querySelector('.timeline-navigation-heading > a');
    const snapshot={label:phase+'-capture sampled state, NOT raster state',targetStillCurrent:target===current,
      target:element(current),returnButton:element(document.querySelector('.mobile-app-back')),
      activeIdentity:identify(document.activeElement),scroll:{x:scrollX,y:scrollY},dpr:devicePixelRatio,
      visualViewport:window.visualViewport ? {offsetLeft:visualViewport.offsetLeft,offsetTop:visualViewport.offsetTop,pageLeft:visualViewport.pageLeft,pageTop:visualViewport.pageTop,width:visualViewport.width,height:visualViewport.height,scale:visualViewport.scale} : null,
      media:Object.fromEntries(['(hover: hover)','(any-hover: hover)','(pointer: fine)','(pointer: coarse)','(prefers-reduced-motion: reduce)'].map(q=>[q,matchMedia(q).matches])),
      fontStatus:document.fonts?.status ?? null};
    const now=performance.now();
    return {version:2,phase,documentId,timeOrigin,readStart,now,capacity,dropped,records:phase==='post'?records.splice(0):[],lastPointer,
      pointerAgeMs:lastPointer ? now-lastPointer.at : null,snapshot};
  }});
}
