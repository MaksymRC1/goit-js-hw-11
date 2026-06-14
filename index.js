import{a as m,S as p,i as l}from"./assets/vendor-DJU8Xmbs.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const h="https://pixabay.com/api/",g="48876382-0e4f5cbb23d48eb9ff8904d68";function y(e){let t="";if(e==null)return Promise.reject(new Error("Query parameter is required"));if(typeof e!="string")return Promise.reject(new Error("Query must be a string"));if(t=e.trim(),t==="")return Promise.reject(new Error("Search query cannot be empty"));const o=new URLSearchParams({key:g,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40});return m.get(`${h}?${o}`).then(n=>n.data).catch(n=>{throw n.response?new Error(`API Error: ${n.response.status} - ${n.response.statusText}`):n.request?new Error("No response received from Pixabay API. Please check your internet connection."):new Error(`Request error: ${n.message}`)})}const a=document.querySelector(".gallery");let i=null;function b(){i&&i.destroy(),i=new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom",animationSpeed:300,fadeSpeed:300})}function v(e){if(!a)return;const t=e.map(o=>`
        <li class="gallery-item">
            <a href="${o.largeImageURL}" class="gallery-link">
                <img 
                    src="${o.webformatURL}" 
                    alt="${o.tags}" 
                    title="${o.tags}"
                    loading="lazy"
                />
                <div class="image-info">
                    <div class="info-item">
                        <span class="info-label">👍 Likes</span>
                        <span class="info-value">${o.likes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">👁️ Views</span>
                        <span class="info-value">${o.views}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">💬 Comments</span>
                        <span class="info-value">${o.comments}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📥 Downloads</span>
                        <span class="info-value">${o.downloads}</span>
                    </div>
                </div>
            </a>
        </li>
    `).join("");a.innerHTML=t,i?i.refresh():b()}function w(){a&&(a.innerHTML="")}function L(){const e=document.querySelector(".loader");e&&e.classList.add("is-active")}function S(){const e=document.querySelector(".loader");e&&e.classList.remove("is-active")}const u=document.querySelector(".form"),P=document.querySelector('input[name="search-text"]');function f(e){l.error({title:"❌ Error",message:e,position:"topRight",backgroundColor:"#ef4444",timeout:5e3})}function $(e){l.info({title:"🔍 No Results",message:`No images found for "${e}". Try another search term.`,position:"topRight",backgroundColor:"#3b82f6",timeout:5e3})}function E(e){l.success({title:"✅ Success",message:`Found ${e} beautiful images!`,position:"topRight",backgroundColor:"#10b981",timeout:3e3})}function I(e){if(!e||e.trim()===""){f("Please enter a search query");return}w(),L(),y(e).then(t=>{if(!t.hits||t.hits.length===0){$(e);return}v(t.hits),E(t.totalHits);const o=document.querySelector(".gallery");o&&o.children.length>0&&o.scrollIntoView({behavior:"smooth",block:"start"})}).catch(t=>{console.error("Search error:",t),f(t.message)}).finally(()=>{S()})}function R(e){e.preventDefault();const t=P.value;I(t)}function d(){if(!u){console.error("Form not found");return}u.addEventListener("submit",R)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
//# sourceMappingURL=index.js.map
