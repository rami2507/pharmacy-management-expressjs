const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      alert("You are logged out successfuly");
      window.setTimeout(() => {
        location.assign("/login");
      }, 800);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

// EXECUTING
const logoutButton = document.querySelector(".nav__el--logout");

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}
