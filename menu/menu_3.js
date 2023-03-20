const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");
const searchData = document.querySelector(".search-data");
const mealList = document.querySelector("#meal");


searchBtn.onclick = () => {

    searchBox.classList.add("active");
    searchBtn.classList.add("active");
    searchInput.classList.add("active");
    cancelBtn.classList.add("active");
    searchInput.focus();
    if (searchInput.value != "") {
        var values = searchInput.value;
        let searchTxt = searchInput.value.trim();
        searchData.classList.remove("active");
        fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTxt}`
        )
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food" />
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                        <div class="meal-price">
                            <h3>Rs.${((Math.floor(Math.random()*(14 - 7 + 1)) + 7)*10)-1}/-</h3>
                        </div>
                        <button>Order</button>
                    </div>
                    `
                });
            }
            mealList.innerHTML = html;
        });
        searchData.innerHTML =
        "You just typed " +
        "<span style='font-weight: 500;'>" +
        values +
        "</span>"
    }else {
        searchData.textContent = "";
    }
};

cancelBtn.onclick = () => {
searchBox.classList.remove("active");
searchBtn.classList.remove("active");
searchInput.classList.remove("active");
cancelBtn.classList.remove("active");
searchData.classList.toggle("active");
searchInput.value = "";
};