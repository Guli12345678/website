const commentsWrapperEl = document.querySelector(".comments-wrapper");
const commentsSkeletonEl = document.querySelector(".comments-skeleton");

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

fetchData("/comments?limit=4", createComments, closeCommentsSkeleton); // /recipes

function closeCommentsSkeleton() {
  commentsSkeletonEl.style.display = "none";
}

function createComments(data) {
  console.log(data);

  data?.comments?.forEach((item) => {
    const cardEl = document.createElement("div");
    cardEl.className = "comments-card";

    cardEl.innerHTML = `
              <div class="comments-card__image">
                    <img loading="lazy" src="https://static.wixstatic.com/media/ffb211_aafe29b263b04adc9e54cf3779edd14a~mv2.png" alt="">
                </div>
                  <div class="comments-card__body">
                    <h3>${item.user.fullName}</h3>
                    <strong> Body: ${item.body}</strong> <br /><br />
                    <strong>Likes: ${item.likes}</strong>
            </div>
        `;
    commentsWrapperEl.appendChild(cardEl);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  commentsSkeletonEl.style.display = "grid";
  fetchData(
    `/comments?limit=4&skip=${offset * 4}`,
    createComments,
    closeCommentsSkeleton
  );
}

// DOM
// BOM
// React
