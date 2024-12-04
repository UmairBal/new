const auth = firebase.auth();
const apiBaseUrl = "http://127.0.0.1:8000";

document.getElementById("login-btn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut();
});

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("protected-form").style.display = "block";
    console.log("User signed in:", user.email);
  } else {
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("protected-form").style.display = "none";
  }
});

document.getElementById("protected-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("item-name").value;
  const description = document.getElementById("item-desc").value;
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`${apiBaseUrl}/protected/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });
  const data = await response.json();
  console.log(data);
});
