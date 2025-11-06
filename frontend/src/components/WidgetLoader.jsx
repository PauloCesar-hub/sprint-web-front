import { useEffect } from 'react';
const WIDGET_SRC = 'https://widgets.api-sports.io/2.0.3/widgets.js';
export default function WidgetLoader(){
  useEffect(()=>{
    if(!document.querySelector(`script[src="${WIDGET_SRC}"]`)){
      const s=document.createElement('script');
      s.type='module'; s.src=WIDGET_SRC; document.body.appendChild(s);
    }
  },[]);
  return null;
}
