import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as o}from"./assets/vendor-77e16229.js";const n="/goit-js-hw-10/assets/ok-2e1ddc32.svg",m="/goit-js-hw-10/assets/error-d5cf2823.svg",s=document.querySelector(".form");s.addEventListener("submit",a);function a(t){t.preventDefault();const e=Number.parseInt(s.delay.value);new Promise((r,i)=>{setTimeout(()=>{s.elements.state.value==="fulfilled"?r(e):i(e)},e)}).then(()=>{o.success({title:"OK",message:`Fulfilled promise in ${e} ms`,messageColor:"white",messageSize:"16",backgroundColor:"green",theme:"dark",iconUrl:n,position:"topRight"})}).catch(()=>{o.error({title:"Error",message:`Rejected promise in ${e} ms`,messageColor:"white",messageSize:"16",backgroundColor:"red",theme:"dark",iconUrl:m,position:"topRight"})}).finally(()=>{s.reset()})}
//# sourceMappingURL=commonHelpers2.js.map
