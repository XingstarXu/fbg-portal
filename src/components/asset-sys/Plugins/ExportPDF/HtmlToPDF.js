// 匯出頁面為PDF格式
 import html2canvas from 'html2canvas' 
 import JSPDF from 'jspdf' 
 export default { 
     install(Vue) { 
         Vue.prototype.ExportSavePdf = function (htmlTitle, currentTime) { 
             var element = document.getElementById('pdfContent') 
             html2canvas(element, { logging: false })
             .then(function (canvas) { 
                 var pdf = new JSPDF('p', 'mm', 'a4') // A4紙，縱向 
                 var ctx = canvas.getContext('2d') 
                 var a4w = 170
                 var a4h = 257 
                 // A4大小，210mm x 297mm，四邊各保留20mm的邊距，顯示區域170x257 
                 var imgHeight = Math.floor(a4h * canvas.width / a4w) 
                 // 按A4顯示比例換算一頁影象的畫素高度 
                 var renderedHeight = 0 
                 while (renderedHeight < canvas.height) { 
                     var page = document.createElement('canvas') 
                     page.width = canvas.width 
                     page.height = Math.min(imgHeight, canvas.height - renderedHeight) 
                     // 可能內容不足一頁 
                     // 用getImageData剪裁指定區域，並畫到前面建立的canvas物件中 
                     page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0) 
                     pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 新增影象到頁面，保留10mm邊距 
                     renderedHeight += imgHeight 
                     if (renderedHeight < canvas.height) { 
                         pdf.addPage() 
                        } 
                     // 如果後面還有內容，新增一個空頁 
                     // delete page; 
                    } 
                    pdf.save(htmlTitle + currentTime) 
                }) 
            } 
        } 
} 