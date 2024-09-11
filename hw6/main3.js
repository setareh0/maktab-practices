let arr = [];
let sortByName = true;
let sortByRate = true;

function addMovies() {
  const namee = document.querySelector(".inputName").value;
  const rate = document.querySelector(".inputRate").value;
  if (!namee || !rate) {
    alert("Wrong inputs...");
    return;
  }
  arr.push({ name: namee, rate: rate });

  document.querySelector(".inputName").value = "";
  document.querySelector(".inputRate").value = "";
  renderMovies();
}

document.querySelector(".add").addEventListener("click", addMovies);

function renderMovies() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${arr[i].name}</td>
    <td>${arr[i].rate}</td>
    <td class="btn-delete delete">Delete</td>
    `;
    tbody.append(tr);
  }

  // arr.forEach((movie) => {
  //   const tr = document.createElement("tr");
  //   tr.innerHTML = `
  //   <td>${movie.name}</td>
  //   <td>${movie.rate}</td>
  //   <td class="btn-delete delete">Delete</td>
  //   `;
  //   tbody.append(tr);
  // });
}

document.querySelector("tbody").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const row = event.target.parentElement;
    const deleteName = row.children[0].innerText;
    const deleteRate = row.children[1].innerText;
    row.remove();

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === deleteName && arr[i].rate === deleteRate) {
        arr.splice(i, 1);
        break;
      }
    }

    // for(let key in arr){
    //   if(arr[key].name !== deleteName || arr[key].rate !== deleteRate){
    //     arr.splice(key, 1);
    //     break;
    //   }
    // }
    // arr = arr.filter(
    //   (movie) => movie.name !== deleteName || movie.rate !== deleteRate
    // );

    // console.log(arr);
  }
});

document.querySelector(".sortName").addEventListener("click", function () {
  arr.sort((a, b) => a.name.localeCompare(b.name));
  renderMovies();
});
document.querySelector(".sortRate").addEventListener("click", function () {
  arr.sort((a, b) => a.rate - b.rate);
  renderMovies();
});
