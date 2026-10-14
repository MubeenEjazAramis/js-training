const searchForm = document.getElementById("search-form");
const usernameInput = document.getElementById("username-input");
const searchBtn = document.getElementById("search-btn");
const statusMessage = document.getElementById("status-message");
const profileContainer = document.getElementById("profile-container");

searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  if (!username) return;

  searchBtn.disabled = true;
  statusMessage.className = "status-message";
  statusMessage.textContent = "Loading…";
  profileContainer.style.display = "none";
  profileContainer.innerHTML = "";

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);

    if (userResponse.status === 404) {
      statusMessage.className = "status-message error";
      statusMessage.textContent = "User not found";
      return;
    }

    if (!userResponse.ok) {
      statusMessage.className = "status-message error";
      statusMessage.textContent = "Something went wrong";
      return;
    }

    const userData = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
    );
    const reposData = await reposResponse.json();

    displayProfile(userData, reposData);
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.className = "status-message error";
    statusMessage.textContent = "Something went wrong";
  } finally {
    searchBtn.disabled = false;
  }
});

function displayProfile(user, repos) {
  let reposListHtml = "";

  for (let i = 0; i < repos.length; i++) {
    reposListHtml += `<li><a href="${repos[i].html_url}" target="_blank" rel="noopener noreferrer">${repos[i].name}</a></li>`;
  }

  if (repos.length === 0) {
    reposListHtml = "<li>No public repositories found.</li>";
  }

  profileContainer.innerHTML = `
    <div class="header-info">
      <img src="${user.avatar_url}" alt="${user.login}" class="avatar" />
      <div class="user-names">
        <h2>${user.name || user.login}</h2>
        <p>@${user.login}</p>
      </div>
    </div>

    <p class="bio">${user.bio || "No bio available."}</p>

    <div class="stats">
      <div class="stat-item"><strong>Followers:</strong> ${user.followers}</div>
      <div class="stat-item"><strong>Public Repos:</strong> ${user.public_repos}</div>
    </div>

    <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="profile-link">View Full GitHub Profile &rarr;</a>

    <div class="repos-section">
      <h3>5 Most Recently Updated Repos:</h3>
      <ul class="repos-list">
        ${reposListHtml}
      </ul>
    </div>
  `;

  profileContainer.style.display = "block";
}