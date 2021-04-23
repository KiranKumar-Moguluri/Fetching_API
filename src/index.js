const api = `https://randomuser.me/api`;
const mainAPP = document.getElementById("app");
const adduser = document.getElementById("user-btn");
const userlist = document.getElementById("user-list");
const searchinput = document.getElementById("search");
const AsortBtn = document.getElementById("Ascend_sort");
const DsortBtn = document.getElementById("Descend_sort");

const appstate = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;

    this.gender = gender;
    this.email = email;
  }
}

adduser.addEventListener("click", async () => {
  const userdata = await fetch(api, {
    method: "GET"
  });

  const userJson = await userdata.json();
  const user = userJson.results[0];

  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );

  appstate.push(classUser);

  domRender(appstate);
});

const domRender = (stateArr) => {
  userlist.innerHTML = null;
  stateArr.forEach((userobj) => {
    const userElement = document.createElement("div");
    userElement.innerHTML = `<div> Full Name: 
       ${userobj.name}
   <ol>
   <li>Gender : ${userobj.gender}</li>
   <li>Email : ${userobj.email}</li>
   
   <ol/>
  </div>`;

    userlist.appendChild(userElement);
  });
};

searchinput.addEventListener("keyup", (e) => {
  console.log(e, searchinput.value.toLowerCase());

  const filteredAppstate = appstate.filter(
    (user) =>
      user.name.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      // user.name.last.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchinput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchinput.value.toLowerCase())
  );
  domRender(filteredAppstate);
});

DsortBtn.addEventListener("click", () => {
  const appstate_dup = [...appstate];
  appstate_dup.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRender(appstate_dup);
});

AsortBtn.addEventListener("click", () => {
  const appstate_dup = [...appstate];
  appstate_dup.sort((a, b) => (a.name > b.name ? 1 : -1));
  domRender(appstate_dup);
});
