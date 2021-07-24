function printPages(start, end, pageTime=100) {
    document.querySelector("style").remove();
    const isPDF = document.querySelector(".pdf-content") != undefined;
    let printContents = "";
    let i = start;
    function downloadPage() {
        setTimeout(()=>{
            let content;
            
            for (let j = i; j < i + 10; j++) {
                content = document.querySelector(`div[data-chapterid='${j}']`)
                if (content) {
                    i = j;
                    break;
                }
            }

            if (!content || content.querySelector(".pdfplaceholder") != null) {
                downloadPage();
                return;
            }
            if (isPDF)
                content.scrollIntoView();
            printContents += content.innerHTML + "<div style='page-break-before: always;'></div>";
            i++;
            if (i <= end) {
                if (!isPDF)
                    document.querySelector(`button[data-test-locator='ChevronButton-next-chapter']`).click();
                downloadPage();
            }
            if (i == end + 1) {
                if (isPDF) {
                    document.body.innerHTML = printContents;
                } else {
                    document.body.innerHTML = "<div style='padding:40px;'>" + printContents + "</div>";
                }

                console.log("Loading...");
                setTimeout(()=>{
                    window.print();
                    location.reload();
                }
                , (end - start) * pageTime);
            }
        }
        , 100);
    }
    downloadPage();
    return "Reading...";
}

"Enter printPages(startPage, endPage) to get started! ";
