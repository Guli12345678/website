const postsWrapperEl = document.querySelector(".posts-wrapper");
const postsSkeletonEl = document.querySelector(".posts-skeleton");

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

fetchData("/posts?limit=4", createPosts, closePostsSkeleton); // /recipes

function closePostsSkeleton() {
  postsSkeletonEl.style.display = "none";
}

function createPosts(data) {
  console.log(data);

  data?.posts?.forEach((item) => {
    const cardEl = document.createElement("div");
    cardEl.className = "posts-card";

    cardEl.innerHTML = `
              <div class="posts-card__image">
                    <img loading="lazy" src="https://images.lifestyleasia.com/wp-content/uploads/sites/2/2023/08/18143840/Untitled-design-2023-08-18T120823.686-1600x900.jpg" alt="">
                </div>
                  <div class="posts-card__body">
                    <h3>${item.title}</h3>
                    <strong>${item.views} Views</strong> <br /><br />
                    <strong>${item.reactions.likes} Likes</strong>
            </div>
        `;
    postsWrapperEl.appendChild(cardEl);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  postsSkeletonEl.style.display = "grid";
  fetchData(
    `/posts?limit=4&skip=${offset * 4}`,
    createPosts,
    closePostsSkeleton
  );
}

// DOM
// BOM
// React
