const apiurl = "https://68bf40749c70953d96ef289e.mockapi.io/students";
const userForm = document.getElementById("userForm");
const userid = document.getElementById("userid");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const userList = document.getElementById("userList");

// Fetch and display users
async function fetchUsers() {
  const res = await fetch(apiurl);
  const users = await res.json();

  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>
        <strong>${user.name}</strong><br>
        ${user.phone || "N/A"}
      </span>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editUser('${user.id}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
      </div>
    `;
    userList.appendChild(li);
  });
}
fetchUsers();

// Add or update user
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: name.value,
    phone: phone.value,
  };

  if (userid.value) {
    await fetch(`${apiurl}/${userid.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  } else {
    await fetch(apiurl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }

  userForm.reset();
  userid.value = "";
  fetchUsers();
});

// Edit user
async function editUser(id) {
  if (confirm("Do you want to edit this contact?")) {
    const res = await fetch(`${apiurl}/${id}`);
    const user = await res.json();

    userid.value = user.id;
    name.value = user.name;
    phone.value = user.phone || "";
  }
}


// Delete user
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this contact?")) {
    await fetch(`${apiurl}/${id}`, { method: "DELETE" });
    fetchUsers();
  }
}
