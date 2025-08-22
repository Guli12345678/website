const usersWrapperEl = document.querySelector(".users-wrapper");
const usersSkeletonEl = document.querySelector(".users-skeleton");

function fetchData(endpoint, callback, closeSkeleton) {
  const promise = fetch(`https://dummyjson.com${endpoint}`); // return Promise
  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((res) => callback(res))
    .catch((err) => console.log(err))
    .finally(() => {
      closeSkeleton();
    });
}

fetchData("/users?limit=4", createUsers, closeUsersSkeleton); // /recipes

function closeUsersSkeleton() {
  usersSkeletonEl.style.display = "none";
}

function createUsers(data) {
  console.log(data);

  data?.users?.forEach((item) => {
    const cardEl = document.createElement("div");
    cardEl.className = "users-card";

    cardEl.innerHTML = `
              <div class="users-card__image">
                    <img loading="lazy" src=${item.image} alt="">
                </div>
                  <div class="users-card__body">
                    <h3>${item.firstName}</h3>
                    <h3>${item.lastName}</h3>
                    <strong>Age${item.age}</strong> <br /><br />
                    <strong> Role: ${item.role}</strong>
            </div>
        `;
    usersWrapperEl.appendChild(cardEl);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  usersSkeletonEl.style.display = "grid";
  fetchData(
    `/users?limit=4&skip=${offset * 4}`,
    createUsers,
    closeUsersSkeleton
  );
}

// DOM
// BOM
// React
