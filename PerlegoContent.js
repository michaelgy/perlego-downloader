function loadImages() {
    document.querySelectorAll("img").forEach((e)=>{
        const imageName = e.className.split("-");

        if (imageName.length === 2 && imageName[1] === "loader") {
            document.querySelector(`.${imageName[0]}`)?.remove();
            e.style["width"] = "100%";
            e.style["height"] = "100%";
            e.style["opacity"] = "100%";
            e.style["max-width"] = "100%";
            e.style["max-height"] = "100%";
        }

    }
    );
}

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
                    if (!isPDF)
                        loadImages();
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
