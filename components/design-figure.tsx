'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

/** Responsive, live HTML figure: keeps native Figma text, frames and connectors together. */
export function DesignFigure({ x, y, width, height, canvasWidth, canvasHeight, label, locale, children }: {
  x: number; y: number; width: number; height: number; canvasWidth: number; canvasHeight: number; label: string; locale?: string; children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const node=ref.current;
    if (!node) return;
    const update=()=>node.style.setProperty('--design-scale',String(node.clientWidth/width));
    update();
    const observer=new ResizeObserver(update);observer.observe(node);
    return ()=>observer.disconnect();
  },[width]);
  const labels: Record<string,[string,string]> = {
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
  const accessibleLabel=labels[label]?.[locale==='en'?1:0] ?? label;
  return <div ref={ref} className="design-figure" data-locale={locale} role="group" aria-label={accessibleLabel} style={{ aspectRatio: `${width}/${height}` }}>
    <div className="design-figure-canvas" style={{ width:canvasWidth,height:canvasHeight,transform:`scale(var(--design-scale, 0)) translate(${-x}px, ${-y}px)` }}>{children}</div>
  </div>;
}
