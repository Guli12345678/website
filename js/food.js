const foodWrapperEl = document.querySelector(".food-wrapper");
const foodSkeletonEl = document.querySelector(".food-skeleton");

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

fetchData("/recipes?limit=4", createFood, closeFoodSkeleton); // /recipes

function closeFoodSkeleton() {
  foodSkeletonEl.style.display = "none";
}

function createFood(data) {
  console.log(data);

  data?.recipes?.forEach((item) => {
    const cardEl = document.createElement("div");
    cardEl.className = "product-card";

    cardEl.innerHTML = `
              <div class="product-card__image">
                    <img src=${item.image} alt="">
                </div>
                <div class="product-card__body">
                    <h3>${item.name}</h3>
                    <strong>${item.caloriesPerServing} Kkaloriya</strong>
            </div>
        `;
    foodWrapperEl.appendChild(cardEl);
  });
}

let offset = 0;

function seeMore() {
  offset++;
  foodSkeletonEl.style.display = "grid";
  fetchData(
    `/recipes?limit=4&skip=${offset * 4}`,
    createFood,
    closeFoodSkeleton
  );
}

// DOM
// BOM
// React
