const root = document.getElementById("root");

function card({ id, title, url, thumbnailUrl }) {
  return `
   <div class="card col-9 col-md-5 col-lg-3 col-xl-2">
      <img alt="box"
       src="${thumbnailUrl}">
      <div class="title">
        <p>${id}</P>
        <h2>${title} </h2>
        <p>${url}</p>
      </div>
    </div>
  `;
}

function render(list) {
  let html = "";
  for (const key of list) {
    html += card(key);
  }
  root.innerHTML = html;
}

// const link = "https://jsonplaceholder.typicode.com/photos";
// const xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     const response = JSON.parse(this.responseText);
//     render(response);
//   } else if (this.readyState === 4) {
//     console.log("Wrong....");
//   }
// };
// xhttp.open("GET", link, true);
// xhttp.send();

//-------------------PROMISE-----------------------------

function promiss() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        resolve(response);
      } else if (this.readyState === 4) {
        reject("eroor");
      }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
    xhttp.send();
  });
}

promiss(render)
  .then((result) => {
    render(result.slice(0, 10));
  })
  .catch((erorr) => {
    console.log("erorr", erorr);
  });
