import type { CSSProperties } from 'react';

export function PhoneShell({src,frame,alt,style}:{src:string;frame:string;alt:string;style?:CSSProperties}) {
  return <div className="phone-shell" style={style}>
    <img className="phone-shell-frame" src={frame} alt="" aria-hidden="true"/>
    <img className="phone-shell-screen" src={src} alt={alt}/>
  </div>;
}
