// "use client";

// import { useEffect } from 'react';

// declare global {
//   interface Window {
//     Packeta: any;
//   }
// }

// interface PacketaComponentProps {
//     apiKey: string;
//     onPointSelected?: (point: any) => void;
// }

// const PacketaComponent: React.FC<PacketaComponentProps> = ({ apiKey, onPointSelected }) => {
//   useEffect(() => {
//     // Dynamické načtení knihovny
//     const script = document.createElement('script');
//     script.src = '/lib/packeta.js'; // Cesta k souboru v public složce
//     script.async = true;

//     script.onload = () => {
//       if (window.Packeta && window.Packeta.Widget) {
//         const callback = (point: any) => {
//           console.log("Vybraný bod:", point);
//           if (onPointSelected) {
//             onPointSelected(point);
//           }
//           // Zavřít widget po výběru bodu
//             safelyCloseWidget();
//        };

//         // Spuštění widgetu Packeta s potřebnými parametry
//         window.Packeta.Widget.pick(apiKey, callback, { version: 3 });
//       }
//     };

//     document.body.appendChild(script);

//     // Funkce pro bezpečné zavření widgetu s kontrolou existence prvků
//     const safelyCloseWidget = () => {
//         if (window.Packeta && window.Packeta.Widget) {
//             try {
//             const wrapper = document.getElementById('packeta-wrapper');
//             const iframe = document.getElementById('packeta-widget') as HTMLIFrameElement;
            
//             if (iframe && iframe.parentNode) {
//                 iframe.parentNode.removeChild(iframe);
//             }
//             if (wrapper && wrapper.parentNode) {
//                 wrapper.parentNode.removeChild(wrapper);
//             }
            
//             window.Packeta.Widget.close();
//             } catch (error) {
//             console.error("Chyba při zavírání widgetu:", error);
//             }
//         }
//         };

//     return () => {
//       document.body.removeChild(script);
//       // Zavřít widget při unmountu komponenty
//       if (window.Packeta && window.Packeta.Widget) {
//         window.Packeta.Widget.close();
//       }
//     };
//   }, [apiKey, onPointSelected]);

//   return null;

// };

// export default PacketaComponent;


// // import { useEffect } from 'react';

// // declare global {
// //   interface Window {
// //     Packeta: any;
// //   }
// // }

// // interface PacketaComponentProps {
// //     apiKey: string;
// //     onPointSelected?: (point: any) => void;
// // }

// // const PacketaComponent: React.FC<PacketaComponentProps> = ({ apiKey, onPointSelected }) => {  useEffect(() => {
// //     // Dynamické načtení knihovny
// //     const script = document.createElement('script');
// //     script.src = '/lib/packeta.js'; // Cesta k tvé knihovně
// //     script.async = true;
    
// //     // Po načtení knihovny zavoláme widget
// //     script.onload = () => {
// //       if (window.Packeta && window.Packeta.Widget) {
// //         // Funkce, která se zavolá po výběru výdejního místa
// //         const callback = (point: any) => {
// //           console.log("Vybraný bod:", point);
// //           if (onPointSelected) {
// //             onPointSelected(point); // Zde předáme vybraný bod zpět
// //           }
// //           // Zavře widget po výběru bodu
// //           window.Packeta.Widget.close();
// //         };

// //         // Spuštění widgetu Packeta s požadovanými parametry
// //         window.Packeta.Widget.pick(apiKey, callback, { version: 3 });
// //       }
// //     };

// //     document.body.appendChild(script);

// //     // Uklidíme po odstranění komponenty
// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, [apiKey, onPointSelected]);

// //   return (
// //     <div>
// //       <h2>Vyberte místo doručení</h2>
// //       {/* Tato komponenta nevyžaduje iframe, protože widget se otevře jako modální okno */}
// //     </div>
// //   );
// // };

// // export default PacketaComponent;