var BookmarkNameInput = document.getElementById("BookmarkName");
var WebsiteUrlInput = document.getElementById("WebsiteUrl");
var model = document.getElementById("model");

var Array;
if (localStorage.getItem("key") == null) {
  Array = [];
} else {
  Array = JSON.parse(localStorage.getItem("key"));
  display();
}

function addWebSite() {
  if (
    BookmarkNameInput.classList.contains("is-valid") &&
    WebsiteUrlInput.classList.contains("is-valid")
  ) {
    var Website = {
      siteName: BookmarkNameInput.value,
      siteurl: WebsiteUrlInput.value,
    };
    Array.push(Website);
    display();
    localStorage.setItem("key", JSON.stringify(Array));
    clear();
    BookmarkNameInput.classList.remove("is-valid");
    WebsiteUrlInput.classList.remove("is-valid");
  } else {
    model.classList.replace("d-none", "d-block");
  }
}

function off() {
  model.classList.replace("d-block", "d-none");
}

function display() {
  var box = "";
  for (let i = 0; i < Array.length; i++) {
    box += ` <tr>
    <th class="align-middle" scope="row">${i + 1}</th>
    <td class="align-middle">${Array[i].siteName}</td>
    <td class="align-middle">
      <a href="${Array[i].siteurl}">
        <button type="button" class="btn btn-success">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </a>
    </td>
    <td class="align-middle">
      <button type="button" class="btn btn-danger" onclick="deleteUrl(${i})">
        <i class="fa-solid fa-trash-can me-1"></i>Delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("tablebody").innerHTML = box;
}

function clear() {
  BookmarkNameInput.value = null;
  WebsiteUrlInput.value = null;
}

function deleteUrl(parametre) {
  Array.splice(parametre, 1);
  localStorage.setItem("key", JSON.stringify(Array));
  display();
}

//ده الطريقة الاولانيه عشان نشوف الفاليدات بتاع ال يو ار ل
function valedate(parametre) {
  var valedateUrl = {
    BookmarkName: /^[A-Z]{2,15}$/i,
    WebsiteUrl: new RegExp(
      "^((ft|htt)ps?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?" + // port
        "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
        "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ), // fragment locator
  };
  if (valedateUrl[parametre.id].test(parametre.value)) {
    parametre.classList.add("is-valid");
    parametre.classList.remove("is-invalid");
  } else {
    parametre.classList.add("is-invalid");
    parametre.classList.remove("is-valid");
  }
}

//ده الطريقة التانية عشان نشوف الفاليدات بتاع ال يو ار ل
// براحتك يا هندسة استخدمي الي انت عايزاه الاتنين شغالين ان شاء الله (حاجه زي الفل ;))
// function valedate(parametre) {
//     var valedateUrl = {
//       BookmarkName: /^[A-Z]{2,15}$/i,
//     };
//     if (valedateUrl["BookmarkName"].test(parametre.value)) {
//       parametre.classList.add("is-valid");
//       parametre.classList.remove("is-invalid");
//     } else {
//       parametre.classList.add("is-invalid");
//       parametre.classList.remove("is-valid");
//     }
//   }
//   function urlValedate(parametre) {
//     var WebsiteUrl = URL.canParse(`${parametre.value}`);
//     console.log(WebsiteUrl);
//     if (WebsiteUrl == true) {
//       parametre.classList.add("is-valid");
//       parametre.classList.remove("is-invalid");
//     } else {
//       parametre.classList.add("is-invalid");
//       parametre.classList.remove("is-valid");
//     }
//   }
