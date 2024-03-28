fetch("https://raw.githubusercontent.com/malek-mw/cranchi/master/cranchi.json").then(resolve => {
    if (!resolve.ok) throw new Error("'Network response was not ok'");
    return resolve.json();
}).then(res => {
    for (let i = 0; i < Object.keys(res).length; i++) {
        let nav = document.querySelector("ul.nav");
        let lis = document.createElement("li");
        let a = document.createElement("a");
        a.href = `#${Object.keys(res)[i]}`;
        a.textContent = Object.keys(res)[i];
        lis.appendChild(a);
        nav.appendChild(lis);
    }
    return res;
}).then(re => {
    for (let i = 0; i < Object.keys(re).filter(e => e !== "contact Us").length; i++) {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let container = document.createElement("div");
        let boxContent = document.createElement("div");
        for (let j = 0; j < Object.values(re[Object.keys(re)[i]]).length; j++) {
            let box = document.createElement("div")
            let img = document.createElement("img");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");
            let span = document.createElement("span");

            box.className = "box";
            img.alt = Object.keys(re[Object.keys(re)[i]])[j];
            img.src = Object.values(re[Object.keys(re)[i]])[j]["img-url"];
            h3.className = "cat-title text-uppercase";
            h3.textContent = img.alt;
            p.textContent = Object.values(re[Object.keys(re)[i]])[j]["info"];
            span.className = "price";
            span.innerHTML = `price: <span>
            ${Object.values(re[Object.keys(re)[i]])[j]["price"]}
            </span>`;

            box.appendChild(img);
            box.appendChild(h3);
            box.appendChild(p);
            box.appendChild(span);
            boxContent.appendChild(box);
        }
        div.id = Object.keys(re)[i];
        div.setAttribute("class", div.id);
        h2.className = "title text-uppercase";
        h2.appendChild(document.createTextNode(div.id));
        container.className = "container";
        boxContent.className = "box-content";

        div.appendChild(h2);
        div.appendChild(container);
        container.appendChild(boxContent);
        document.querySelector("div.contact.Us").before(div);
    }
}).then(_ => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(function (box, index) {
        box.addEventListener("click", function () {
            document.body.classList.add("hidden-scroll");
            let overlay = document.createElement("div");
            let divArro = document.createElement("div");
            let arroBack = document.createElement("i");

            overlay.className = "popup-overlay w-100 h-100 position-fixed";
            divArro.className = "arro-cont w-100 text-white bg-black";
            arroBack.className = "arro-back fa-solid fa-arrow-left";

            overlay.addEventListener("click", function (e) {
                if (e.target.tagName === "svg" || e.target.tagName === "path") {
                    overlay.remove();
                    document.body.classList.remove("hidden-scroll");
                }
            });
            let img = document.createElement("img");
            let h3 = document.createElement("h3");
            let p = document.createElement("p");

            img.className = "popup-img w-100";
            img.src = document.querySelectorAll(`.${box.className}`)[index].firstElementChild.src;
            h3.className = "popup-title fw-bold text-white text-uppercase";
            h3.textContent = document.querySelectorAll(`.${box.className}`)[index].firstElementChild.alt;
            p.className = "popup-para fw-bold text-white";
            p.textContent = document.querySelectorAll(`.${box.className} p`)[index].textContent;

            divArro.append(arroBack);
            overlay.appendChild(divArro);
            overlay.appendChild(img);
            overlay.appendChild(h3);
            overlay.appendChild(p);
            document.body.appendChild(overlay);
        })
    });
}).catch(error => {
    console.error(`There was a problem with the fetch operation: ${error}`);
});


// Other Way To Get API File
// let req = new XMLHttpRequest();
// req.open("GET", "https://raw.githubusercontent.com/malek-mw/cranchi/master/cranchi.json");
// req.send();
// req.onload = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         let objFromServer = JSON.parse(this.responseText);

//         for (let i = 0; i < Object.keys(objFromServer).length; i++) {

//             let nav = document.querySelector("ul.nav");
//             let lis = document.createElement("li");
//             let a = document.createElement("a");

//             a.href = `#${Object.keys(objFromServer)[i]}`;
//             a.textContent = Object.keys(objFromServer)[i];

//             lis.appendChild(a);
//             nav.appendChild(lis)
//         }

//         for (let i = 0; i < Object.keys(objFromServer).filter(e => e !== "contact Us").length; i++) {

//             let div = document.createElement("div");
//             let h2 = document.createElement("h2");
//             let container = document.createElement("div");
//             let boxContent = document.createElement("div");

//             for (let j = 0; j < Object.values(objFromServer[Object.keys(objFromServer)[i]]).length; j++) {

//                 let box = document.createElement("div")
//                 let img = document.createElement("img");
//                 let h3 = document.createElement("h3");
//                 let p = document.createElement("p");
//                 let span = document.createElement("span");

//                 box.className = "box";

//                 img.alt = Object.keys(objFromServer[Object.keys(objFromServer)[i]])[j];
//                 img.src = Object.values(objFromServer[Object.keys(objFromServer)[i]])[j]["img-url"];

//                 h3.className = "cat-title";
//                 h3.textContent = img.alt;

//                 p.textContent = Object.values(objFromServer[Object.keys(objFromServer)[i]])[j]["info"];

//                 span.className = "price";
//                 span.innerHTML = `price: <span>
//                 ${Object.values(objFromServer[Object.keys(objFromServer)[i]])[j]["price"]}
//                 </span>`;

//                 box.appendChild(img);
//                 box.appendChild(h3);
//                 box.appendChild(p);
//                 box.appendChild(span);
//                 boxContent.appendChild(box);
//             }

//             div.id = Object.keys(objFromServer)[i];
//             div.setAttribute("class", div.id);

//             h2.className = "title";
//             h2.appendChild(document.createTextNode(div.id));

//             container.className = "container";
//             boxContent.className = "box-content";

//             div.appendChild(h2);
//             div.appendChild(container);
//             container.appendChild(boxContent);
//             document.querySelector("div.contact.Us").before(div);
//         }
//     }

//     let boxes = document.querySelectorAll(".box");

//     boxes.forEach(function (box, index) {
//         box.addEventListener("click", function () {

//             document.body.classList.add("hidden-scroll");

//             let overlay = document.createElement("div");
//             overlay.className = "popup-overlay";

//             let divArro = document.createElement("div");
//             divArro.className = "arro-cont";

//             let arroBack = document.createElement("i");
//             arroBack.className = "arro-back fa-solid fa-arrow-left";

//             overlay.addEventListener("click", function (e) {
//                 if (e.target.tagName === "svg" || e.target.tagName === "path") {
//                     overlay.remove();
//                     document.body.classList.remove("hidden-scroll");
//                 }
//             });

//             let img = document.createElement("img");
//             let h3 = document.createElement("h3");
//             let p = document.createElement("p");

//             img.className = "popup-img";
//             img.src = document.querySelectorAll(`.${box.className}`)[index].firstElementChild.src;

//             h3.className = "popup-title";
//             h3.textContent = document.querySelectorAll(`.${box.className}`)[index].firstElementChild.alt;

//             p.className = "popup-para";
//             p.textContent = document.querySelectorAll(`.${box.className} p`)[index].textContent;

//             divArro.append(arroBack);
//             overlay.appendChild(divArro);
//             overlay.appendChild(img);
//             overlay.appendChild(h3);
//             overlay.appendChild(p);
//             document.body.appendChild(overlay);
//         })
//     });

// }


let scrollTopSpan = document.querySelector("span.scroll-top");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
        scrollTopSpan.style.display = 'block';
        scrollTopSpan.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    } else scrollTopSpan.style.display = 'none';
});

document.querySelector(".copyright .year").textContent = new Date().getFullYear();