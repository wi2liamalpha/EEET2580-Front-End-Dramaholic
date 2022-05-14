const movieListArray = [];
let pagi_range = 8
const pagi_region = document.querySelector(".pnormal");
const pagi_region_search = document.querySelector(".psearch");

const list_element = document.querySelector(".pnormal .list");
const pagination_element = document.querySelector(".pnormal .pagenumbers");
const prev_btn = document.querySelector(".pnormal .prev");
const next_btn = document.querySelector(".pnormal .next");
let current_page = 0;
let current_start_index = 0

const list_element_search = document.querySelector(".psearch #list");
const pagination_element_search = document.querySelector(".psearch .pagenumbers");
const prev_btn_search = document.querySelector(".psearch .prev");
const next_btn_search = document.querySelector(".psearch .next");
const search = document.querySelector(".search");
let current_page_search = 0;
let current_start_index_search = 0
let current_search = ""


function checkPrev(mode) {
  if (mode == "search") {
    if(current_start_index_search == 0) {
      prev_btn_search.setAttribute("hidden",true)
    }
    else prev_btn_search.removeAttribute("hidden")
  }
  else {
    if(current_start_index == 0) {
      prev_btn.setAttribute("hidden",true)
    }
    else prev_btn.removeAttribute("hidden")
  }
}


function checkNext(mode) {
  if (mode == 'search') {
    fetch(`https://dramaholic.herokuapp.com/api/movies/search?title=` + current_search)
    .then((respone) => respone.json())
    .then((data) => {
      if((current_start_index_search+pagi_range) > data.totalPages) next_btn_search.setAttribute("hidden",true)
      else next_btn_search.removeAttribute("hidden")
    });
  }
  else {
    fetch("https://dramaholic.herokuapp.com/api/movies")
    .then((respone) => respone.json())
    .then((data) => {
      if((current_start_index+pagi_range) > data.totalPages) next_btn.setAttribute("hidden",true)
      else next_btn.removeAttribute("hidden")
    });
  }
}

// function prev_onclick(mode) {
//   let pagination_e = pagination_element
//   let next_b = next_btn
//   let index = 0
//   if (mode == 'search') {
//     current_start_index_search -= pagi_range
//     pagination_e = pagination_element
//     next_b = next_btn_search
//     index = current_start_index_search
//   }
//   else {
//     current_start_index -= pagi_range
//     index = current_start_index
//   }

//   checkPrev(mode)
//   next_b.removeAttribute("hidden")
//   pagination_e.innerHTML = "";
//   for (let i = index; i < index+pagi_range; i++) {
//     let btn = (mode == "search")? PaginationButtonSearch(i) : PaginationButtonNormal(i);
//     pagination_e.appendChild(btn);
//   }
// }


prev_btn.onclick = () => {
  current_start_index -= pagi_range
  checkPrev("normal")
  next_btn.removeAttribute("hidden")
  pagination_element.innerHTML = "";
  for (let i = current_start_index; i < current_start_index+pagi_range; i++) {
    let btn = PaginationButtonNormal(i);
    pagination_element.appendChild(btn);
  }
}

prev_btn_search.onclick = () => {
  current_start_index_search -= pagi_range
  checkPrev("search")
  next_btn_search.removeAttribute("hidden")
  pagination_element_search.innerHTML = "";
  for (let i = current_start_index_search; i < current_start_index_search+pagi_range; i++) {
    let btn = PaginationButtonSearch(i);
    pagination_element_search.appendChild(btn);
  }
}

next_btn.onclick = () => {
  current_start_index += pagi_range
  fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => {
    if((current_start_index+pagi_range) >= data.totalPages) next_btn.setAttribute("hidden",true)
    else next_btn.removeAttribute("hidden")

    prev_btn.removeAttribute("hidden")

    let totalPages = data.totalPages
    let end_index = (current_start_index + pagi_range) > totalPages ? totalPages : (current_start_index + pagi_range)
    SetupPagination('normal', end_index)
  });
}

///////////////////////////////
next_btn_search.onclick = () => {
  current_start_index_search += pagi_range
  fetch("https://dramaholic.herokuapp.com/api/movies")
  .then((respone) => respone.json())
  .then((data) => {
    if((current_start_index+pagi_range) >= data.totalPages) next_btn.setAttribute("hidden",true)
    else next_btn_search.removeAttribute("hidden")

    next_btn_search.removeAttribute("hidden")

    let totalPages = data.totalPages
    let end_index = (current_start_index_search + pagi_range) > totalPages ? totalPages : (current_start_index_search + pagi_range)
    SetupPagination('normal', end_index)
  });
}


function PaginationButtonNormal(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;
  if (current_page == page) button.classList.add("active");
  button.addEventListener("click", function () {
    let prev_active = document.querySelector(".pnormal button.active")
    if(prev_active != null) prev_active.classList.remove("active");
    current_page = button.innerText-1;
    getMovieList("normal", false)
    button.classList.add("active");
  });
  return button
}

function PaginationButtonSearch(page) {
  let button = document.createElement("button");
  button.classList.add("pagination-btn");
  button.innerText = page+1;
  if (current_page_search == page) button.classList.add("active");
  button.addEventListener("click", function () {
    console.log("huhu")
    let prev_active = document.querySelector(".psearch button.active")
    if(prev_active != null) prev_active.classList.remove("active");
    current_page_search = button.innerText-1;
    getMovieList("search", false)
    button.classList.add("active");
  });
  return button
}

function SetupPagination(mode, end_index) {
  checkPrev(mode)
  checkNext(mode)
  let wrapper = (mode == "search")? pagination_element_search : pagination_element
  let index = (mode == "search")? current_start_index_search : current_start_index
  wrapper.innerHTML = "";
  for (let i = index; i < end_index; i++) {
    let btn = (mode == "search") ? PaginationButtonSearch(i) : PaginationButtonNormal(i);
    wrapper.appendChild(btn);
  } 
}

async function getMovieList(mode, isNew) {
  let url = (mode == "search") ? `https://dramaholic.herokuapp.com/api/movies/search?title=${current_search}&page=${current_page_search}`
            : `https://dramaholic.herokuapp.com/api/movies?page=${current_page}`;
  const res = await fetch(url);
  const { content, totalPages } = await res.json();

  let list = [];
  for (let i = 0; i < content.length; i++) {
    await list.push(content[i]);
  }

  let wrapper = (mode == "search") ? list_element_search : list_element
  DisplayList(list, wrapper)

  let start_index = (mode == "search") ? current_start_index_search : current_start_index

  if (isNew) {
    let end_index = (start_index + pagi_range) > totalPages ? totalPages : (start_index + pagi_range)
    SetupPagination(mode, end_index)
  }
}

// function displayMovieList(isNew) {
//   list_element.innerHTML = "";
//   fetch("https://dramaholic.herokuapp.com/api/movies?page=" + current_page)
//     .then((respone) => respone.json())
//     .then(({ content }) => {
//       items = [];
//       for (let i = 0; i < content.length; i++) {
//         items.push(content[i]);
//       }
//       DisplayList(items, list_element);
//       if (isNew) SetupPagination('normal',)
//     });
// }

function DisplayList(items, wrapper) {
  wrapper.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
  let d = document.createElement("div");
     d = createDivMovie(items[i])
    wrapper.appendChild(d);
  }
}

function createDivMovie(x) {
  let wrapper = document.createElement("div");

  wrapper.classList.add("movie-wrapper");

  let title = document.createElement("div");
  title.className = "card-title";
  title.textContent = x.title;

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");

  let editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.classList.add("white_theme_button");
  editButton.innerText = "EDIT";
  editButton.onclick = function () {
    sessionStorage.setItem("edit_dbid", x.dbID);
    location.href = "./edit-movie.html";
  };

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("white_theme_button");
  deleteButton.innerText = "DELETE";

  deleteButton.onclick = async () => {
    let text = `Are you sure to delete movie "${x.title}"?`

    if (confirm(text) == true) {
      const response = await fetch(
        "https://dramaholic.herokuapp.com/api/movies/" + x.dbID,
        {
          method: "DELETE",
        }
      );
      alert(`Successfully deleted "${x.title}"`)
      if (current_search) {getMovieList("search",false)}
      else getMovieList("normal",false)
    }
};

  wrapper.appendChild(title);

  wrapper.appendChild(buttonWrapper);
  buttonWrapper.appendChild(editButton);
  buttonWrapper.appendChild(deleteButton);
  return wrapper;
}


// // Search Function
// async function getMovieListSearch(title) {
//   const url = await fetch(
//     "https://dramaholic.herokuapp.com/api/movies/search?title=" + title
//   );
//   const { content } = await url.json();
//   list_element_search.innerHTML = "";
//   list = [];
//   for (let i = 0; i < content.length; i++) {
//     list.push(content[i]);
//   }
//   DisplayList(list, list_element_search);
// }


// async function getMovieListSearch(isNew) {
//   const url = await fetch(
//     "https://dramaholic.herokuapp.com/api/movies/search?title=" +
//       current_search +
//       "&page=" +
//       current_page_search
//   );
//   const { content, totalPages } = await url.json();

//   let list = [];
//   for (let i = 0; i < content.length; i++) {
//     await list.push(createCardSearch(content[i]));
//   }

//   DisplayList(list, list_element_search)

//   if (isNew) {
//     let end_index = (current_start_index_search + pagi_range) > totalPages ? totalPages : (current_start_index_search + pagi_range)
//     SetupPagination("search", end_index)
//   }
// }


search.addEventListener("input", (e) => {
  current_search = e.target.value;
  if (current_search) {
    current_page_search = 0
    current_start_index_search = 0
    pagi_region.classList.add("hidden")
    getMovieList("search",true);
    pagi_region_search.classList.remove("hidden")
  } else {
    pagi_region_search.classList.add("hidden")
    pagi_region.classList.remove("hidden")
  }
});


getMovieList("normal", true);
