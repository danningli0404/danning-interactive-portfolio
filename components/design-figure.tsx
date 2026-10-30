'use client';
import { useEffect,useId,useLayoutEffect,useRef,useState,type ReactNode } from 'react';

const figureLabels:Record<string,[string,string]>={
 TacOriginalWorkflow:['触觉图形创作与分享流程','Tactile graphics creation and sharing workflow'],
 SenseOriginalService:['音乐节无障碍服务系统','Festival accessibility service system'],
 VitalOriginalDevices:['穿戴设备与应用界面','Wearable devices and app screens'],
 VitalOriginalTests:['传感器测试、数据与标注','Sensor tests, readings and annotations'],
 VitalOriginalStory:['骑手使用场景故事板','Rider use-scenario storyboard'],
 PureOriginalStakeholders:['利益相关者地图','Stakeholder map'],
 PureOriginalSystem:['服务系统地图与信息流','Service system map and information flows'],
 PureOriginalFiltration:['净水装置爆炸图与材料连线','Exploded filtration model and material connections'],
 PureOriginalElectronics:['电子原型、传感器标注与代码','Electronic prototype, sensor labels and code'],
 VitalPhoneDashboard:['VitalRide 应用首页','VitalRide dashboard'],
 VitalPhoneBody:['VitalRide 身体状态界面','VitalRide body status screen'],
};
const figureDescriptions:Record<string,[string,string]>={
 TacOriginalWorkflow:['三个阶段连接探索与创作、转换与修改，以及触觉图形的分享与交流。','Three stages connect exploration and drawing, conversion and revision, and sharing and communication.' ],
 SenseOriginalService:['通过穿戴设备与 App，将视障、听障观众的不同需求连接到字幕、触觉反馈与观演安全方案。','Wearables and an app connect different access needs to captions, haptic feedback and viewing-area safety.'],
 VitalOriginalDevices:['背心、头盔与配套 App：查看生理数据、设备状态与异常提醒。','The vest, helmet and companion app present physiological readings, device status and alerts.'],
 VitalOriginalTests:['对照传感器状态与数据读数，展示稳定行走、行走不稳、摔倒，以及心率和体温测试。','Sensor states and readings cover steady walking, unsteady walking, falls, heart rate and temperature.'],
 VitalOriginalStory:['四个步骤呈现骑手的工作情境、身体状态提醒与设备使用场景。','Four steps show the rider’s work context, status alerts and intended device-use scenario.'],
 PureOriginalStakeholders:['围绕居民、政府与物业，展示水厂、检测机构、设备厂商等利益相关者。','The map connects residents, government and property management with utilities, testing bodies and device suppliers.'],
 PureOriginalSystem:['图中展示政府、水厂、居民与物业之间的水质报告、产品安装、反馈与维护信息流。','The map shows water-quality reports, installation, feedback and maintenance flows between government, the utility, residents and property management.'],
 PureOriginalFiltration:['沿连线查看聚丙烯棉、活性炭、树脂珠、微滤膜、紫外线灯与水质检测传感器的对应位置。','Follow the connectors to polypropylene cotton, activated carbon, resin beads, membrane, UV lamp and water-quality sensors.'],
 PureOriginalElectronics:['分别标注紫外线灯、TDS 传感器、显示屏与浊度传感器，并展示原型连接和程序。','Labels identify the UV lamp, TDS sensor, display and turbidity sensor alongside prototype connections and code.'],
};

/** Live text and source vector layers stay together in both overview and enlarged views. */
export function DesignFigure({x,y,width,height,canvasWidth,canvasHeight,label,locale,children}:{
 x:number;y:number;width:number;height:number;canvasWidth:number;canvasHeight:number;label:string;locale?:string;children:ReactNode;
}){
 const ref=useRef<HTMLDivElement>(null),dialog=useRef<HTMLDialogElement>(null),viewport=useRef<HTMLDivElement>(null);
 const [open,setOpen]=useState(false),[zoom,setZoom]=useState(1);const titleId=useId();const en=locale==='en';
 const accessibleLabel=figureLabels[label]?.[en?1:0]??label;
 const description=figureDescriptions[label]?.[en?1:0];const zoomable=!!description;
 const t=(zh:string,english:string)=>en?english:zh;
 useLayoutEffect(()=>{
  const node=ref.current;if(!node)return;
  const update=()=>node.style.setProperty('--design-scale',String(node.clientWidth/width));
  update();const observer=new ResizeObserver(update);observer.observe(node);return()=>observer.disconnect();
 },[width]);
 useEffect(()=>{
  if(!open)return;const node=dialog.current;if(!node)return;
  const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';node.showModal();
  return()=>{if(node.open)node.close();document.body.style.overflow=oldOverflow;};
 },[open]);
 const close=()=>{dialog.current?.close();setOpen(false);};
 const original=<div ref={ref} className="design-figure" data-locale={locale} role="group" aria-label={accessibleLabel} style={{aspectRatio:`${width}/${height}`}}><div className="design-figure-canvas" style={{width:canvasWidth,height:canvasHeight,transform:`scale(var(--design-scale, 0)) translate(${-x}px, ${-y}px)`}}>{children}</div></div>;
 if(!zoomable)return original;
 return <div className="figure-reader">
  {original}
  <div className="figure-reading-tools"><p className="figure-reading-note">{description}</p><button type="button" className="figure-expand" aria-haspopup="dialog" aria-label={`${t('放大查看','Enlarge')}: ${accessibleLabel}`} onClick={()=>{setZoom(1);setOpen(true);}}>{t('放大查看图示','Enlarge diagram')}<span aria-hidden="true">↗</span></button></div>
  {open&&<dialog ref={dialog} className="figure-zoom-dialog" aria-labelledby={titleId} onClose={()=>setOpen(false)} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialog.current)close();}}>
   <div className="figure-zoom-panel">
    <header className="figure-zoom-toolbar"><h2 id={titleId}>{accessibleLabel}</h2><div className="figure-zoom-controls"><button type="button" aria-label={t('缩小图示','Zoom out')} disabled={zoom<=.5} onClick={()=>setZoom(z=>Math.max(.5,(Math.ceil(z*4)-1)/4))}>−</button><output aria-live="polite">{Math.round(zoom*100)}%</output><button type="button" aria-label={t('放大图示','Zoom in')} disabled={zoom>=2} onClick={()=>setZoom(z=>Math.min(2,(Math.floor(z*4)+1)/4))}>＋</button><button type="button" className="figure-fit" onClick={()=>{if(viewport.current)setZoom(Math.min(1,Math.max(.25,(viewport.current.clientWidth-24)/width)));}}>{t('适合宽度','Fit width')}</button><button type="button" className="figure-zoom-close" aria-label={t('关闭图示','Close diagram')} onClick={close}>×</button></div></header>
    <p className="figure-zoom-help">{t('可横向、纵向滑动查看，用 ＋ / − 调整大小。','Scroll horizontally and vertically to explore; use + / − to adjust the size.')}</p>
    <div ref={viewport} className="figure-zoom-viewport" tabIndex={0} aria-label={t('可滚动的放大图示','Scrollable enlarged diagram')}><div className="design-figure figure-zoom-stage" data-locale={locale} role="group" aria-label={`${accessibleLabel} — ${t('放大图','enlarged view')}`} style={{width:width*zoom,height:height*zoom}}><div className="design-figure-canvas" style={{width:canvasWidth,height:canvasHeight,transform:`scale(${zoom}) translate(${-x}px, ${-y}px)`}}>{children}</div></div></div>
   </div>
  </dialog>}
 </div>;
}
