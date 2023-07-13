function createForum(data) {
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");

const imgContainer = document.createElement("div");
imgContainer.classList.add("image-container");

const h1 = document.createElement("h1");
h1.classList.add("author-title");
h1.textContent = data.title;

const img = document.createElement("img");
img.classList.add("author-image");
img.src = data.url;
img.alt = "";
imgContainer.appendChild(img);

const outerDiv = document.createElement("div");
outerDiv.classList.add("content-container");

const innerDiv2 = document.createElement("div");
innerDiv2.classList.add("container");

const p1 = document.createElement("p");
p1.classList.add("author-description");
p1.textContent = data.explanation;

const p2 = document.createElement("p");
p2.classList.add("author-date");
p2.textContent = data.date;

mainContainer.appendChild(imgContainer);
outerDiv.appendChild(h1);
innerDiv2.appendChild(p1);
innerDiv2.appendChild(p2);
outerDiv.appendChild(innerDiv2);
mainContainer.appendChild(outerDiv);

const main = document.querySelector("main");
main.appendChild(mainContainer);
}

document.addEventListener("DOMContentLoaded", async function () {
try {
const response = await fetch("/getPhotoData");
const data = await response.json();
createForum(data);
} catch (error) {
console.log("Could not retrieve data:", error);
}
});