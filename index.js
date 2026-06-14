import{a as m,S as p,i as l}from"./assets/vendor-DJU8Xmbs.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const h="https://pixabay.com/api/",g="48876382-0e4f5cbb23d48eb9ff8904d68";function y(e){const o=new URLSearchParams({key:g,q:e.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40});return m.get(`${h}?${o}`).then(t=>t.data).catch(t=>{throw t.response?new Error(`API Error: ${t.response.status}`):t.request?new Error("No response from server"):new Error(`Request error: ${t.message}`)})}const i=document.querySelector(".gallery");let n=null;function b(){n&&n.destroy(),n=new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom",animationSpeed:300,fadeSpeed:300})}function v(e){if(!i)return;const o=e.map(t=>`
        <li class="gallery-item">
            <a href="${t.largeImageURL}" class="gallery-link">
                <img 
                    src="${t.webformatURL}" 
                    alt="${t.tags}" 
                    title="${t.tags}"
                    loading="lazy"
                />
                <div class="image-info">
                    <div class="info-item">
                        <span class="info-label">👍 Likes</span>
                        <span class="info-value">${t.likes}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">👁️ Views</span>
                        <span class="info-value">${t.views}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">💬 Comments</span>
                        <span class="info-value">${t.comments}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📥 Downloads</span>
                        <span class="info-value">${t.downloads}</span>
                    </div>
                </div>
            </a>
        </li>
    `).join("");i.innerHTML=o,n?n.refresh():b()}function L(){i&&(i.innerHTML="")}function w(){const e=document.querySelector(".loader");e&&e.classList.add("is-active")}function S(){const e=document.querySelector(".loader");e&&e.classList.remove("is-active")}const u=document.querySelector(".form"),$=document.querySelector('input[name="search-text"]');function f(e){l.error({title:"❌ Error",message:e,position:"topRight",backgroundColor:"#ef4444",timeout:5e3})}function E(e){l.info({title:"🔍 No Results",message:`No images found for "${e}". Try another search term.`,position:"topRight",backgroundColor:"#3b82f6",timeout:5e3})}function P(e){l.success({title:"✅ Success",message:`Found ${e} beautiful images!`,position:"topRight",backgroundColor:"#10b981",timeout:3e3})}function R(e){if(!e||e.trim()===""){f("Please enter a search query");return}L(),w(),y(e).then(o=>{if(!o.hits||o.hits.length===0){E(e);return}v(o.hits),P(o.totalHits);const t=document.querySelector(".gallery");t&&t.children.length>0&&t.scrollIntoView({behavior:"smooth",block:"start"})}).catch(o=>{console.error("Search error:",o),f(o.message)}).finally(()=>{S()})}function q(e){e.preventDefault();const o=$.value;R(o)}function d(){if(!u){console.error("Form not found");return}u.addEventListener("submit",q)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
//# sourceMappingURL=index.js.map
