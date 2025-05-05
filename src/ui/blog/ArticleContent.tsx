'use client';

import React, { forwardRef, ForwardedRef, JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';

// Import PrismJS language support
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';

// Plugins de Prism para mejorar la experiencia
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/match-braces/prism-match-braces';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

interface ArticleContentProps {
  content?: string | TrustedHTML;
  iconos?: Array<{
    nombre: string;
    icono: JSX.Element;
  }>;
  isReaderMode?: boolean;
  children?: React.ReactNode;
}

const ArticleContent = forwardRef(
  ({ content, iconos = [], isReaderMode = false, children }: ArticleContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [activeHeading, setActiveHeading] = useState<string | null>(null);
    
    // Función para crear IDs amigables para encabezados
    const slugify = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
        .replace(/\s+/g, '-') // Reemplazar espacios por guiones
        .replace(/--+/g, '-') // Eliminar guiones duplicados
        .trim(); // Eliminar espacios al inicio y final
    };

    // Añadir enlaces a los encabezados cuando se hace click
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const addHeadingAnchors = () => {
      if (!ref || typeof ref === 'function') return;
      
      setTimeout(() => {
        if (!ref.current) return;
        
        const headings = ref.current.querySelectorAll('h2, h3, h4');
        headings.forEach((heading, index) => {
          // Asignar un ID si no tiene uno
          if (!heading.id) {
            const id = `heading-${slugify(heading.textContent || '')}-${index}`;
            heading.id = id;
          }
          
          // Crear un enlace interno para el encabezado con icono animado
          if (!heading.querySelector('.anchor-link')) {
            heading.classList.add('group', 'flex', 'items-center', 'gap-2', 'heading-animated');
            
            const anchor = document.createElement('a');
            anchor.className = 'anchor-link opacity-0 group-hover:opacity-100 ml-2 text-emerald-400 hover:text-emerald-300 transition-opacity duration-300 transform hover:scale-110';
            anchor.href = `#${heading.id}`;
            anchor.innerHTML = '<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
            heading.appendChild(anchor);
          }
        });
      }, 500);
    };

    // Style code blocks with PrismJS
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const applyCodeStyling = () => {
      if (!ref || typeof ref === 'function') return;
      
      setTimeout(() => {
        if (!ref.current) return;
        
        // Add special styling to pre code blocks
        const codeBlocks = ref.current.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
          // Add language class if not present
          if (!Array.from(block.classList).some(cls => cls.startsWith('language-'))) {
            block.classList.add('language-javascript');
          }

          // Add line numbers
          block.classList.add('line-numbers');
          
          // Add copy button
          const pre = block.parentElement;
          if (pre && !pre.querySelector('.copy-button')) {
            // Create wrapper div for position relative
            const wrapper = document.createElement('div');
            wrapper.className = 'relative code-block-wrapper rounded-lg my-6 overflow-hidden shadow-lg shadow-emerald-900/20 group hover:shadow-xl hover:shadow-emerald-800/20 transition-all duration-300';
            
            // Create top bar with language badge and copy button
            const topBar = document.createElement('div');
            topBar.className = 'absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-neutral-800/90 border-b border-neutral-700/50 z-10';
            
            // Add language badge if there's a language class
            const langClasses = Array.from(block.classList).find(cls => cls.startsWith('language-'));
            if (langClasses) {
              const lang = langClasses.replace('language-', '');
              const langBadge = document.createElement('div');
              langBadge.className = 'bg-neutral-900/90 py-1 px-3 rounded-full text-xs font-mono text-emerald-400 border border-emerald-500/20 shadow-sm flex items-center gap-1.5';
              
              // Add appropriate icon based on language
              const langIcon = document.createElement('span');
              let iconSvg = '';
              
              switch(lang) {
                case 'javascript':
                case 'js':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>';
                  break;
                case 'typescript':
                case 'ts':
                case 'tsx':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>';
                  break;
                case 'html':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>';
                  break;
                case 'css':
                case 'scss':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z"/></svg>';
                  break;
                case 'python':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>';
                  break;
                case 'bash':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M5.483 21.3H24L14.025 2.7H0zm4.252-2.25 2.044-3.562-2.104-3.675-2.013 3.595z"/></svg>';
                  break;
                case 'php':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zm-2.595-1.382h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>';
                  break;
                case 'java':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-2.016-1.186-7.417 1.587-3.188 2.275 11.323 1.849 20.654-.818 15.522-1.371M9.292 13.21s-5.25 1.246-1.86 1.7c1.43.192 4.281.148 6.932-.074 2.168-.181 4.338-.566 4.338-.566s-.762.326-1.314.703c-5.303 1.394-15.536.745-12.591-.677 2.492-1.2 4.495-1.086 4.495-1.086M17.127 17.208c5.386-2.798 2.897-5.493 1.16-5.133-.426.092-.615.17-.615.17s.158-.248.46-.354c3.439-1.207 6.087 3.569-1.111 5.465 0-.001.083-.076.106-.148M14.401 0s2.982 2.981-2.83 7.567c-4.662 3.684-1.062 5.785-.002 8.186-2.721-2.453-4.718-4.617-3.377-6.629 1.969-2.958 7.417-4.396 6.209-9.124M9.734 23.924c5.164.332 13.098-.184 13.271-2.64 0 0-.36.932-4.261 1.67-4.4.83-9.82.733-13.038.2 0 0 .659.545 4.028.77"/></svg>';
                  break;
                case 'csharp':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M11.803 9.333h-1v2.333h-2.333v1h2.333v2.334h1v-2.334h2.334v-1h-2.334z"/><path fill="currentColor" d="M23.5 9.987 12.268.012c-.2-.12-.464-.12-.662 0L.107 9.986c-.2.12-.323.336-.323.573v11.86c0 .234.122.447.322.567l11.232 9.974c.2.123.462.123.663 0l11.232-9.974c.2-.12.323-.333.323-.567v-11.86c0-.237-.122-.453-.323-.572zm-.523 12.433L12 31.35 1.023 22.42v-9.852L12 3.639l10.977 8.93z"/></svg>';
                  break;
                case 'yaml':
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M1.783 1.089h20.387c.963 0 1.82.811 1.82 1.766v18.29c0 .954-.857 1.765-1.82 1.765H1.783c-.982 0-1.783-.811-1.783-1.765v-18.29c0-.955.82-1.766 1.783-1.766zm7.5 15.202h5.297L12 11.338l-2.717 4.953zm-1.143 2.534h7.646l1.525 2.775h3.997L12.19 6.04 3.06 21.6h3.997l1.083-2.775z"/></svg>';
                  break;
                default:
                  iconSvg = '<svg class="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9.8 15.5 13 12.3l-3.2-3.2zm-6 6 6-6-6-6zm16.4-12-6 6 6 6zm-6-6-6 6 6 6z"/></svg>';
              }
              
              langIcon.innerHTML = iconSvg;
              langIcon.className = 'text-emerald-500';
              langBadge.prepend(langIcon);
              langBadge.appendChild(document.createTextNode(lang));
              topBar.appendChild(langBadge);
            }
            
            // Create copy button with fancy animation
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-button bg-neutral-900/90 hover:bg-emerald-600/90 transition-all duration-300 p-2 rounded-md text-neutral-400 hover:text-white transform hover:scale-105 flex items-center gap-1.5 text-xs font-medium';
            copyBtn.innerHTML = '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>';
            
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(block.textContent || '');
              copyBtn.innerHTML = '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>';
              copyBtn.classList.add('bg-emerald-500/90');
              setTimeout(() => {
                copyBtn.innerHTML = '<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>';
                copyBtn.classList.remove('bg-emerald-500/90');
              }, 2000);
            });
            
            topBar.appendChild(copyBtn);
            
            // Replace pre with our wrapper
            pre.parentNode?.insertBefore(wrapper, pre);
            wrapper.appendChild(topBar);
            wrapper.appendChild(pre);
            
            // Add styling to the pre element with a subtle grid background
            pre.className = 'relative bg-gradient-to-br from-neutral-900 to-neutral-950 text-neutral-100 pt-12 px-6 pb-8 rounded-lg overflow-auto border border-neutral-800/50 backdrop-blur-sm';
            
            // Add a subtle dot pattern to the background
            const dotPattern = document.createElement('div');
            dotPattern.className = 'absolute inset-0 opacity-10 pointer-events-none';
            dotPattern.style.backgroundImage = 'radial-gradient(circle, rgb(16 185 129 / 10%) 1px, transparent 1px)';
            dotPattern.style.backgroundSize = '16px 16px';
            wrapper.appendChild(dotPattern);
            
            // Add code line highlights for important sections
            const codeLines = pre.querySelectorAll('.line-numbers .line-numbers-rows > span');
            if (codeLines.length > 0) {
              // Highlight every 5th line with a subtle background
              codeLines.forEach((line, index) => {
                if ((index + 1) % 5 === 0) {
                  line.classList.add('highlight-line');
                  (line as HTMLElement).style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                }
              });
            }
            
            // Add a code snippet label
            const snippetLabel = document.createElement('div');
            snippetLabel.className = 'absolute bottom-2 right-3 text-xs text-neutral-500 italic';
            snippetLabel.textContent = 'Code Snippet';
            wrapper.appendChild(snippetLabel);
          }
        });

        // Enhance headings with decorative elements
        const enhanceHeadings = () => {
          const headings = ref.current?.querySelectorAll('h1, h2, h3');
          headings?.forEach((heading) => {
            if (!heading.classList.contains('enhanced')) {
              heading.classList.add('enhanced');

              // Add gradient text effect to headings with a subtle animation
              if (heading.tagName === 'H1') {
                heading.classList.add('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-emerald-400', 'to-teal-500', 'font-extrabold', 'animate-gradient');
                
                // Add decorative underline to h1
                const underline = document.createElement('div');
                underline.className = 'h-1 w-24 mt-4 mb-8 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-300 rounded-full';
                heading.parentNode?.insertBefore(underline, heading.nextSibling);
                
                // Add decorative element before the heading
                const decorator = document.createElement('div');
                decorator.className = 'text-3xl text-emerald-400/40 mb-2 font-serif';
                decorator.innerHTML = '✦';
                heading.parentNode?.insertBefore(decorator, heading);
              } else if (heading.tagName === 'H2') {
                heading.classList.add('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-emerald-400', 'via-teal-400', 'to-emerald-500', 'py-2');
                
                // Add a subtle animated line after h2
                const line = document.createElement('div');
                line.className = 'relative h-px mt-2 mb-8 w-48 overflow-hidden';
                
                const solidLine = document.createElement('div');
                solidLine.className = 'absolute inset-0 bg-gradient-to-r from-emerald-400 to-transparent';
                
                const animatedDot = document.createElement('div');
                animatedDot.className = 'absolute h-1.5 w-1.5 rounded-full bg-emerald-400 animate-slide';
                animatedDot.style.animation = 'slideRight 4s linear infinite';
                
                line.appendChild(solidLine);
                line.appendChild(animatedDot);
                heading.parentNode?.insertBefore(line, heading.nextSibling);
                
                // Add custom CSS for the animation if not already added
                if (!document.querySelector('#slide-animation-style')) {
                  const style = document.createElement('style');
                  style.id = 'slide-animation-style';
                  style.textContent = `
                    @keyframes slideRight {
                      0% { transform: translateX(-5px); opacity: 0; }
                      10% { opacity: 1; }
                      90% { opacity: 1; }
                      100% { transform: translateX(200px); opacity: 0; }
                    }
                    .animate-slide {
                      animation: slideRight 4s linear infinite;
                    }
                    .animate-gradient {
                      background-size: 200% auto;
                      animation: gradientShift 8s linear infinite;
                    }
                    @keyframes gradientShift {
                      0% { background-position: 0% center; }
                      50% { background-position: 100% center; }
                      100% { background-position: 0% center; }
                    }
                    .heading-animated::before {
                      content: '';
                      position: absolute;
                      left: -10px;
                      width: 4px;
                      height: 0%;
                      background: linear-gradient(to bottom, #10b981, transparent);
                      border-radius: 4px;
                      transition: height 0.3s ease-out;
                      opacity: 0.7;
                    }
                    .heading-animated:hover::before {
                      height: 100%;
                    }
                    .article-content h2::after, .article-content h3::after {
                      content: '';
                      display: block;
                      margin-top: 0.5rem;
                      width: 0;
                      height: 1px;
                      background: linear-gradient(to right, rgba(16, 185, 129, 0.7), transparent);
                      transition: width 0.5s ease-out;
                    }
                    .article-content h2:hover::after, .article-content h3:hover::after {
                      width: 100%;
                    }
                    .glowing {
                      box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
                    }
                    .active-heading {
                      position: relative;
                      border-left: 3px solid #10b981;
                      padding-left: 10px;
                    }
                  `;
                  document.head.appendChild(style);
                }
              } else if (heading.tagName === 'H3') {
                heading.classList.add('text-transparent', 'bg-clip-text', 'bg-gradient-to-r', 'from-teal-400', 'to-emerald-400', 'font-medium');
                
                // Add a subtle dot pattern after h3
                const pattern = document.createElement('div');
                pattern.className = 'flex gap-1.5 mt-2 mb-6';
                for (let i = 0; i < 3; i++) {
                  const dot = document.createElement('div');
                  dot.className = 'h-1.5 w-1.5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500';
                  pattern.appendChild(dot);
                }
                heading.parentNode?.insertBefore(pattern, heading.nextSibling);
              }
            }
          });
        };

        // Enhance blockquotes with a more appealing design
        const enhanceBlockquotes = () => {
          const quotes = ref.current?.querySelectorAll('blockquote');
          quotes?.forEach((quote) => {
            if (!quote.classList.contains('enhanced')) {
              quote.classList.add('enhanced', 'relative', 'pl-8', 'py-4', 'my-8', 'bg-gradient-to-br', 'from-neutral-800/20', 'to-neutral-900/20', 'backdrop-blur-sm');
              
              // Replace the basic vertical line with a gradient line
              const quoteBorder = document.createElement('div');
              quoteBorder.className = 'absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-emerald-300 rounded-full';
              quote.insertBefore(quoteBorder, quote.firstChild);

              // Add a decorative quote mark
              const quoteMark = document.createElement('div');
              quoteMark.className = 'absolute left-5 top-0 text-4xl text-emerald-500/40 font-serif';
              quoteMark.innerHTML = '❝';
              quote.insertBefore(quoteMark, quote.firstChild);
              
              // Add bottom quote mark
              const quoteEndMark = document.createElement('div');
              quoteEndMark.className = 'absolute right-3 bottom-0 text-4xl text-emerald-500/30 font-serif';
              quoteEndMark.innerHTML = '❞';
              quote.appendChild(quoteEndMark);
              
              // Add a subtle background pattern
              const patternBg = document.createElement('div');
              patternBg.className = 'absolute inset-0 opacity-5 pointer-events-none';
              patternBg.style.backgroundImage = 'radial-gradient(circle, rgb(16 185 129 / 30%) 1px, transparent 1px)';
              patternBg.style.backgroundSize = '20px 20px';
              quote.insertBefore(patternBg, quote.firstChild);
            }
          });
        };

        // Enhance images with advanced effects
        const enhanceImages = () => {
          const images = ref.current?.querySelectorAll('img');
          images?.forEach((img) => {
            if (!img.classList.contains('enhanced')) {
              img.classList.add('enhanced', 'transition-all', 'duration-500', 'hover:shadow-2xl', 'hover:shadow-emerald-500/20', 'hover:scale-[1.03]');
              
              // Create a wrapper for the image with a fancy border
              const wrapper = document.createElement('div');
              wrapper.className = 'my-10 relative max-w-3xl mx-auto';
              
              // Add border and shadow effect
              const frame = document.createElement('div');
              frame.className = 'p-2 bg-neutral-900 rounded-lg border border-emerald-500/20 shadow-lg shadow-emerald-900/20 overflow-hidden transition-all duration-500 hover:border-emerald-500/40';
              
              // Create loading effect
              const loadingOverlay = document.createElement('div');
              loadingOverlay.className = 'absolute inset-0 flex items-center justify-center bg-neutral-900/80 z-10 transition-opacity duration-700';
              loadingOverlay.innerHTML = '<svg class="animate-spin h-10 w-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
              
              // Add glow effect on hover
              img.addEventListener('load', () => {
                loadingOverlay.classList.add('opacity-0');
                setTimeout(() => {
                  loadingOverlay.remove();
                }, 700);
              });
              
              // Add zoom on click functionality
              img.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-neutral-900/95 flex items-center justify-center z-50 p-8 cursor-zoom-out transition-all duration-300';
                
                const modalImg = document.createElement('img');
                modalImg.src = img.src;
                modalImg.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-500 ease-out transform scale-95';
                
                // Add caption if alt text exists
                if (img.alt) {
                  const caption = document.createElement('div');
                  caption.className = 'absolute bottom-8 left-0 right-0 text-center text-neutral-300 bg-neutral-900/80 py-2 px-4 backdrop-blur-sm';
                  caption.textContent = img.alt;
                  modal.appendChild(caption);
                }
                
                // Close modal on click
                modal.addEventListener('click', () => {
                  modal.classList.add('opacity-0');
                  setTimeout(() => {
                    modal.remove();
                  }, 300);
                });
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                // Animate image in
                setTimeout(() => {
                  modalImg.classList.remove('scale-95');
                }, 10);
              });
              
              img.style.cursor = 'zoom-in';
              
              // Add corner decorators
              const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
              corners.forEach(corner => {
                const decorator = document.createElement('div');
                decorator.className = `absolute ${corner.replace('-', '-0 ').replace('-', '-0 ')} h-6 w-6 border-emerald-500/30 pointer-events-none`;
                
                if (corner.includes('top')) {
                  decorator.classList.add('border-t-2');
                } else {
                  decorator.classList.add('border-b-2');
                }
                
                if (corner.includes('left')) {
                  decorator.classList.add('border-l-2');
                } else {
                  decorator.classList.add('border-r-2');
                }
                
                if (corner === 'top-left') {
                  decorator.style.borderTopLeftRadius = '0.5rem';
                } else if (corner === 'top-right') {
                  decorator.style.borderTopRightRadius = '0.5rem';
                } else if (corner === 'bottom-right') {
                  decorator.style.borderBottomRightRadius = '0.5rem';
                } else if (corner === 'bottom-left') {
                  decorator.style.borderBottomLeftRadius = '0.5rem';
                }
                
                frame.appendChild(decorator);
              });
              
              // Structure: wrapper > frame > image
              img.parentNode?.insertBefore(wrapper, img);
              wrapper.appendChild(frame);
              frame.appendChild(img);
              wrapper.appendChild(loadingOverlay);
            }
          });
        };

        // Enhance lists with custom bullets and animations
        const enhanceLists = () => {
          // Add custom bullets to unordered lists
          const listItems = ref.current?.querySelectorAll('ul > li');
          listItems?.forEach((item, index) => {
            if (!item.classList.contains('enhanced')) {
              item.classList.add('enhanced', 'relative', 'pl-2');
              
              // Create a custom animated bullet
              const bullet = document.createElement('span');
              bullet.className = 'inline-block w-5 h-5 absolute left-[-1.5rem] top-1 text-emerald-500';
              bullet.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
              </svg>`;
              
              // Add staggered animation
              bullet.style.animationDelay = `${index * 0.1}s`;
              bullet.style.opacity = '0';
              bullet.style.animation = 'fadeIn 0.5s ease-out forwards';
              
              // Insert the custom bullet
              item.insertBefore(bullet, item.firstChild);
              
              // Add hover effect
              item.addEventListener('mouseenter', () => {
                bullet.classList.add('text-emerald-300');
                bullet.style.transform = 'scale(1.2)';
                bullet.style.transition = 'transform 0.2s ease-out, color 0.2s ease-out';
              });
              
              item.addEventListener('mouseleave', () => {
                bullet.classList.remove('text-emerald-300');
                bullet.style.transform = 'scale(1)';
              });
            }
          });
          
          // Add numbering effect to ordered lists
          const orderedListItems = ref.current?.querySelectorAll('ol > li');
          orderedListItems?.forEach((item, index) => {
            if (!item.classList.contains('enhanced')) {
              item.classList.add('enhanced', 'relative');
              
              // Add a gradient numbered bullet
              const number = document.createElement('span');
              number.className = 'absolute left-[-2rem] top-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-neutral-900';
              number.style.background = 'linear-gradient(135deg, #10b981, #059669)';
              number.textContent = `${index + 1}`;
              
              // Add animation
              number.style.opacity = '0';
              number.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
              
              // Insert number
              item.insertBefore(number, item.firstChild);
              
              // Add padding to make room for the number
              (item as HTMLElement).style.paddingLeft = '0.5rem';
              (item as HTMLElement).style.marginBottom = '1rem';
            }
          });
          
          // Add custom animations to the list
          if (!document.querySelector('#list-animation-style')) {
            const style = document.createElement('style');
            style.id = 'list-animation-style';
            style.textContent = `
              @keyframes fadeIn {
                0% { opacity: 0; transform: translateX(-5px); }
                100% { opacity: 1; transform: translateX(0); }
              }
            `;
            document.head.appendChild(style);
          }
        };

        // Add table enhancements
        const enhanceTables = () => {
          const tables = ref.current?.querySelectorAll('table');
          tables?.forEach(table => {
            if (!table.classList.contains('enhanced')) {
              table.classList.add('enhanced', 'border-collapse', 'w-full', 'overflow-hidden', 'rounded-lg', 'shadow-lg', 'my-8');
              
              // Create a responsive table wrapper
              const wrapper = document.createElement('div');
              wrapper.className = 'relative overflow-x-auto max-w-full rounded-lg border border-neutral-800 shadow-lg shadow-emerald-900/10';
              
              // Add a gradient border effect to the wrapper
              wrapper.style.background = 'linear-gradient(to right, #10b981, #059669, #10b981)';
              wrapper.style.padding = '1px';
              
              // Create inner container for the actual table
              const innerWrapper = document.createElement('div');
              innerWrapper.className = 'bg-neutral-900 w-full h-full rounded-lg overflow-hidden';
              
              // Enhance table headers
              const tableHeaders = table.querySelectorAll('thead th');
              tableHeaders.forEach(header => {
                header.classList.add('bg-neutral-800', 'text-emerald-400', 'font-bold', 'border-b', 'border-neutral-700', 'text-left', 'p-4');
              });
              
              // Enhance table cells
              const tableCells = table.querySelectorAll('tbody td');
              tableCells.forEach(cell => {
                cell.classList.add('border-b', 'border-neutral-800', 'p-4');
              });
              
              // Add zebra striping to rows
              const tableRows = table.querySelectorAll('tbody tr');
              tableRows.forEach((row, index) => {
                if (index % 2 === 0) {
                  row.classList.add('bg-neutral-900');
                } else {
                  row.classList.add('bg-neutral-800/30');
                }
                
                // Add hover effect
                row.classList.add('transition-colors', 'duration-200');
                row.addEventListener('mouseenter', () => {
                  row.classList.add('bg-neutral-800/70');
                });
                
                row.addEventListener('mouseleave', () => {
                  row.classList.remove('bg-neutral-800/70');
                  if (index % 2 === 0) {
                    row.classList.add('bg-neutral-900');
                  } else {
                    row.classList.add('bg-neutral-800/30');
                  }
                });
              });
              
              // Restructure the table with the wrappers
              table.parentNode?.insertBefore(wrapper, table);
              wrapper.appendChild(innerWrapper);
              innerWrapper.appendChild(table);
            }
          });
        };

        // Add enhanced links with hover effects
        const enhanceLinks = () => {
          const links = ref.current?.querySelectorAll('a:not(.anchor-link)');
          links?.forEach(link => {
            if (!link.classList.contains('enhanced')) {
              link.classList.add('enhanced', 'relative', 'inline-block');
              
              // Create an underline effect that animates on hover
              const underline = document.createElement('span');
              underline.className = 'absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 ease-out rounded-full';
              link.appendChild(underline);
              
              // Add hover glow effect
              link.addEventListener('mouseenter', () => {
                underline.classList.add('w-full');
                link.classList.add('text-emerald-300');
              });
              
              link.addEventListener('mouseleave', () => {
                underline.classList.remove('w-full');
                link.classList.remove('text-emerald-300');
              });
              
              // Add icon for external links
              if (link.getAttribute('href')?.startsWith('http')) {
                const externalIcon = document.createElement('span');
                externalIcon.className = 'inline-block ml-1 text-emerald-500/70';
                externalIcon.innerHTML = '<svg class="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                link.appendChild(externalIcon);
              }
            }
          });
        };

        // Add section dividers with special styling
        const enhanceDividers = () => {
          const hrs = ref.current?.querySelectorAll('hr');
          hrs?.forEach(hr => {
            if (!hr.classList.contains('enhanced')) {
              hr.classList.add('enhanced');
              
              // Create a fancy divider to replace the HR
              const divider = document.createElement('div');
              divider.className = 'flex items-center justify-center my-12 space-x-4';
              
              // Add left line
              const leftLine = document.createElement('div');
              leftLine.className = 'h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/40';
              divider.appendChild(leftLine);
              
              // Add center element
              const center = document.createElement('div');
              center.className = 'text-emerald-500/70 text-xl';
              center.innerHTML = '✦';
              divider.appendChild(center);
              
              // Add right line
              const rightLine = document.createElement('div');
              rightLine.className = 'h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/40';
              divider.appendChild(rightLine);
              
              // Replace hr with our custom divider
              hr.parentNode?.insertBefore(divider, hr);
              hr.remove();
            }
          });
        };

        // Track scroll position to highlight current heading in TOC
        const addScrollTracking = () => {
          // Agregamos throttling para evitar demasiadas actualizaciones durante el desplazamiento
          let isScrolling = false;
          
          const trackScrolling = () => {
            // Evitamos múltiples ejecuciones durante el scroll
            if (isScrolling) return;
            
            isScrolling = true;
            
            // Usamos requestAnimationFrame para sincronizar con el ciclo de renderizado del navegador
            window.requestAnimationFrame(() => {
              if (!ref.current) return;
              
              const headings = Array.from(ref.current.querySelectorAll('h1, h2, h3, h4'));
              const scrollPosition = window.scrollY + 150; // Offset to trigger earlier
              
              let current = '';
              
              headings.forEach(heading => {
                const headingTop = heading.getBoundingClientRect().top + window.scrollY;
                
                if (headingTop < scrollPosition) {
                  current = heading.id;
                }
              });
              
              if (current && current !== activeHeading) {
                setActiveHeading(current);
                
                // Reemplazamos la manipulación directa del DOM con clases CSS y transiciones suaves
                document.querySelectorAll('.active-heading').forEach(el => {
                  el.classList.remove('active-heading');
                });
                
                const activeElement = document.getElementById(current);
                if (activeElement) {
                  activeElement.classList.add('active-heading');
                }
              }
              
              isScrolling = false;
            });
          };
          
          window.addEventListener('scroll', trackScrolling, { passive: true });
          return () => window.removeEventListener('scroll', trackScrolling);
        };

        // Run all enhancements
        enhanceHeadings();
        enhanceBlockquotes();
        enhanceImages();
        enhanceLists();
        enhanceTables();
        enhanceLinks();
        enhanceDividers();
        addScrollTracking();
        
        // Apply Prism highlighting
        Prism.highlightAllUnder(ref.current);
      }, 800);
    };

    // Apply the heading anchors and code styling
    useEffect(() => {
      addHeadingAnchors();
      applyCodeStyling();
    }, [addHeadingAnchors, applyCodeStyling, content]);

    // Animar la entrada del contenido
    const contentAnimation = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Additional styling classes based on reader mode
    const contentClasses = `prose prose-invert prose-emerald max-w-none text-neutral-300 article-content relative mb-12 
      ${isReaderMode ? 'reader-mode prose-lg' : ''}
      prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
      prose-h1:text-4xl prose-h1:md:text-5xl prose-h1:mb-10 prose-h1:mt-12 
      prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-transparent prose-h1:bg-clip-text 
      prose-h1:bg-gradient-to-r prose-h1:from-emerald-400 prose-h1:to-teal-500 prose-h1:py-2
      prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mb-8 prose-h2:mt-16 
      prose-h2:font-bold prose-h2:text-transparent prose-h2:bg-clip-text 
      prose-h2:bg-gradient-to-br prose-h2:from-emerald-400 prose-h2:to-teal-500 prose-h2:pb-2
      prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mb-6 prose-h3:mt-12 
      prose-h3:font-semibold prose-h3:text-emerald-400 prose-h3:border-b 
      prose-h3:border-emerald-500/20 prose-h3:pb-2
      prose-h4:text-xl prose-h4:md:text-2xl prose-h4:mb-4 prose-h4:mt-8 
      prose-h4:font-medium prose-h4:text-teal-400
      prose-h5:text-lg prose-h5:md:text-xl prose-h5:font-medium prose-h5:mb-4 prose-h5:mt-6 
      prose-h5:text-emerald-300 prose-h5:italic
      prose-h6:text-base prose-h6:md:text-lg prose-h6:font-normal prose-h6:mb-4 prose-h6:mt-6 
      prose-h6:text-emerald-200/90 prose-h6:italic
      prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
      prose-a:text-emerald-400 prose-a:no-underline prose-a:transition-colors hover:prose-a:text-emerald-300
      prose-strong:text-white prose-strong:font-semibold
      prose-em:italic prose-em:text-neutral-200
      prose-code:text-emerald-300 prose-code:font-mono prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
      prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-neutral-800/30 
      prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:rounded-r-md
      prose-blockquote:not-italic prose-blockquote:text-neutral-300
      prose-ul:list-disc prose-ul:pl-10 prose-li:mb-2 prose-li:marker:text-emerald-500
      prose-ol:list-decimal prose-ol:pl-10
      prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
      prose-hr:border-neutral-800 prose-hr:my-10
      prose-table:border prose-table:border-neutral-800
      prose-th:bg-neutral-800 prose-th:text-white prose-th:p-3
      prose-td:border prose-td:border-neutral-800 prose-td:p-3
    `;

    return (
      <motion.div
        ref={ref}
        variants={contentAnimation}
        initial="hidden"
        animate="visible"
        className={contentClasses}
      >
        {/* Añadir estilos personalizados para títulos de markdown */}
        <style jsx global>{`
          .article-content h1 {
            position: relative;
            padding-left: 1rem;
            margin-bottom: 2rem;
            overflow: visible;
          }
          
          .article-content h1::before {
            content: '#';
            position: absolute;
            left: -0.5rem;
            top: 0;
            font-size: 0.8em;
            color: rgba(16, 185, 129, 0.6);
            font-weight: normal;
            transform: translateX(-100%);
            padding-right: 0.5rem;
            transition: all 0.3s ease-out;
          }
          
          .article-content h1:hover::before {
            color: rgba(16, 185, 129, 1);
            transform: translateX(-100%) scale(1.2);
          }
          
          .article-content h2 {
            position: relative;
            padding-left: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .article-content h2::before {
            content: '##';
            position: absolute;
            left: -0.5rem;
            top: 0;
            font-size: 0.7em;
            color: rgba(16, 185, 129, 0.5);
            font-weight: normal;
            transform: translateX(-100%);
            padding-right: 0.5rem;
            transition: all 0.3s ease-out;
          }
          
          .article-content h2:hover::before {
            color: rgba(16, 185, 129, 0.9);
            transform: translateX(-100%) scale(1.2);
          }
          
          .article-content h3 {
            position: relative;
            padding-left: 1rem;
            margin-bottom: 1.2rem;
          }
          
          .article-content h3::before {
            content: '###';
            position: absolute;
            left: -0.5rem;
            top: 0;
            font-size: 0.6em;
            color: rgba(16, 185, 129, 0.4);
            font-weight: normal;
            transform: translateX(-100%);
            padding-right: 0.5rem;
            transition: all 0.3s ease-out;
          }
          
          .article-content h3:hover::before {
            color: rgba(16, 185, 129, 0.8);
            transform: translateX(-100%) scale(1.2);
          }
          
          .article-content h4::before {
            content: '####';
            position: absolute;
            left: -0.5rem;
            top: 0;
            font-size: 0.6em;
            color: rgba(16, 185, 129, 0.3);
            font-weight: normal;
            transform: translateX(-100%);
            padding-right: 0.5rem;
            opacity: 0;
            transition: all 0.3s ease-out;
          }
          
          .article-content h4 {
            position: relative;
            padding-left: 1rem;
          }
          
          .article-content h4:hover::before {
            opacity: 1;
            transform: translateX(-100%) scale(1.1);
          }
          
          .article-content h1::after,
          .article-content h2::after,
          .article-content h3::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.5rem;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, rgba(16, 185, 129, 0.8), transparent);
            transition: width 0.6s ease-out;
          }
          
          .article-content h1:hover::after,
          .article-content h2:hover::after,
          .article-content h3:hover::after {
            width: 100%;
          }
          
          /* Añadir iconos personalizados según el nivel de título */
          .article-content h1.enhanced::after {
            content: '';
            position: absolute;
            right: -1.5rem;
            top: 50%;
            transform: translateY(-50%);
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background-image: linear-gradient(to bottom right, #10b981, #059669);
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .article-content h1.enhanced:hover::after {
            opacity: 1;
          }
          
          /* Estilo especial para la animación de gradiente */
          .article-content h1,
          .article-content h2 {
            background-size: 200% auto;
            animation: gradientFlow 6s linear infinite;
          }
          
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Decoradores de título especiales para títulos de nivel 2 */
          .article-content h2.enhanced::before {
            content: '##';
          }
          
          /* Añadir efectos de resplandor en el hover */
          .article-content h1:hover,
          .article-content h2:hover,
          .article-content h3:hover {
            text-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
          }
        `}</style>
        
        {/* Mostrar iconos de tecnologías si existen */}
        {iconos && iconos.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8 mt-2">
            {iconos.map((icono, index) => (
              <div 
                key={index} 
                className="bg-neutral-800/60 rounded-full p-2.5 text-emerald-400 border border-neutral-700/30 hover:bg-neutral-800 hover:scale-105 transition-all duration-300 hover:border-emerald-500/40 shadow-md hover:shadow-emerald-500/20"
                title={icono.nombre}
              >
                {icono.icono}
              </div>
            ))}
          </div>
        )}

        {/* Insertar el contenido del artículo (HTML sanitizado) */}
        {content && (
          <div 
            dangerouslySetInnerHTML={{ __html: content as string }} 
            className="article-md-content"
          />
        )}

        {/* Permitir contenido React personalizado si se proporciona */}
        {children}

        {/* Indicador de fin de artículo */}
        <div className="flex items-center justify-center mt-16 pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent flex-grow"></div>
          <div className="px-6 text-emerald-500/70 text-xl">✦</div>
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent flex-grow"></div>
        </div>
      </motion.div>
    );
  }
);

// Agregar displayName para evitar advertencias de React
ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
