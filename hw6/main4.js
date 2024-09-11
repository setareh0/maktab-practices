let personData = [
  {
    uid: 1,
    firstName: "Ali",
    lastName: "Mahdavi",
  },
  {
    uid: 2,
    firstName: "Reza",
    lastName: "Shahmardan",
  },
  {
    uid: 3,
    firstName: "Hassan",
    lastName: "Qolami",
  },
  {
    uid: 4,
    firstName: "Morteza",
    lastName: "Hamedani",
  },
  {
    uid: 5,
    firstName: "Sina",
    lastName: "Hejazi",
  },
  {
    uid: 6,
    firstName: "Hadi",
    lastName: "Sadri",
  },
];

let additionalPersonData = [
  {
    uid: 3,
    position: "UI Designer",
    city: "Biarjmand",
  },
  {
    uid: 1,
    position: "Back-End Develope",
    city: "Taleqan",
  },
  {
    uid: 2,
    position: "Front-End Developer",
    city: "Behbahan",
  },
  {
    uid: 4,
    position: "Devops",
    city: "Shiraz",
  },
  {
    uid: 6,
    position: "Server Admin",
    city: "Tehran",
  },
  {
    uid: 5,
    position: "Product Manager",
    city: "Hamedan",
  },
];

// result ===> [{
//     uid: 1,
//     firstName: "Ali",
//     lastName: "Mahdavi",
//     position: "Back-End Develope",
//     city: "Taleqan"
// },
// {

// }, ...]

let arr = [];
for (let i of personData) {
  for (let j of additionalPersonData) {
    if (i.uid === j.uid) {
      arr.push({ ...i, ...j });
    }
  }
}
console.log(arr);

function addPersonToTable(person) {
  const tbody = document.querySelector("tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <td>${person.uid}</td>
  <td>${person.firstName}</td>
  <td>${person.lastName}</td>
  <td>${person.position}</td>
  <td>${person.city}</td>
  <td class="btn-delete delete">Delete</td>
  `;
  tbody.append(tr);
}

for (let person of arr) {
  addPersonToTable(person);
}

function addNewPerson() {
  const uid = Number(document.querySelector(".inputUid").value);
  const fname = document.querySelector(".inputfname").value;
  const lname = document.querySelector(".inputLname").value;
  const position = document.querySelector(".inputPosition").value;
  const city = document.querySelector(".inputCity").value;

  if (!uid || !fname || !lname || !position || !city) {
    alert("Wrong input...");
    return;
  }

  for (let key of arr) {
    if (key.uid === uid) {
      alert("Wrong uid");
      return;
    }
  }

  const newPerson = {
    uid: uid,
    firstName: fname,
    lastName: lname,
    position: position,
    city: city,
  };
  arr.push(newPerson);
  addPersonToTable(newPerson);
  console.log(arr);

  document.querySelector(".inputUid").value = "";
  document.querySelector(".inputfname").value = "";
  document.querySelector(".inputLname").value = "";
  document.querySelector(".inputPosition").value = "";
  document.querySelector(".inputCity").value = "";
}

document.querySelector(".add").addEventListener("click", addNewPerson);

document.querySelector("tbody").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const row = event.target.parentElement;
    const uid = Number(row.children[0].innerText);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].uid === uid) {
        arr.splice(i, 1);
        break;
      }
    }
    // arr = arr.filter(person => person.uid !== uid);
    row.remove();
    console.log(arr);
  }
});
