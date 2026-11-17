// Serialized into each new document. No layout/style/animation query or app-state write.
export function installEventCollector() {
  const key = '__timelineScreenshotEvents_20261117';
  if (Object.prototype.hasOwnProperty.call(window, key)) throw new Error('Collector collision');
  const capacity = 512, records = [], timeOrigin = performance.timeOrigin;
  const documentId = String(timeOrigin);
  let dropped = 0, target = null, lastPointer = null;
  const identify = el => target && el === target ? 'all-events-link' :
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
    if(event.target === target) add('target-transition',{type,propertyName:event.propertyName,elapsedTime:event.elapsedTime,pseudoElement:event.pseudoElement,isTrusted:event.isTrusted});
  },{capture:true,passive:true});
  Object.defineProperty(window,key,{configurable:false,value:() => {
    const now = performance.now();
    return {version:1,documentId,timeOrigin,now,capacity,dropped,records:records.splice(0),lastPointer,
      postCapture:{targetStillCurrent:target === document.querySelector('.timeline-navigation-heading > a'),targetConnected:target?.isConnected ?? false,label:'post-capture only, not raster state',target:state(),activeIdentity:identify(document.activeElement)}};
  }});
}
