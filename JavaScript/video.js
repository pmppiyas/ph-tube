//Create Load Categories
const loadCaregories = () => {
  //fatch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));
};

//Display Categories
const displayCategories = categories => {
  const categoriesContainer = document.getElementById('categories');
  categories.forEach(element => {
    //get Button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    <button id="btn-${element.category_id}" onclick="loadCategoryVideos(${element.category_id})" class="btn category-btn">${element.category}</button>
    `;
    categoriesContainer.append(buttonContainer);
  });
};

//Load Videos Function
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(err => console.log(err));
};

const removeActiveClass = () => {
  const button = document.getElementsByClassName('category-btn');
  for (let btn of button) {
    btn.classList.remove('active');
  }
};

const loadCategoryVideos = id => {
  //fetch catagory video
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
      //remove active class
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add('active');
      displayVideos(data.category);
    })
    .catch(err => console.log(err));
};

// Display Videos
const displayVideos = videos => {
  const videosContainer = document.getElementById('videos');
  videosContainer.innerHTML = '';
  if (videos.length == 0) {
    videosContainer.classList.remove('grid');
    videosContainer.innerHTML = `
    <div class="max-h-screen flex flex-col gap-5 justify-center items-center">
    <img class="" src="./Image/Icon.png"/>
    <h class="text-2xl font-medium">No Content Here</h>
    </div>
    `;
  } else {
    videosContainer.classList.add('grid');
  }

  videos.forEach(video => {
    const card = document.createElement('div');
    card.classList = 'card card-compact ';
    card.innerHTML = `
      <figure class= "h-[200px] relative">
    <img
      src="${video.thumbnail}"
      alt="Shoes" class="h-full w-full object-cover" />
      ${
        video.others.posted_date?.length == 0
          ? ''
          : `<span class="absolute right-2 bottom-2 bg-black text-white text-xs p-1 rounded-md">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
  </figure>
  
  <div class="py-4 flex gap-2">
  <div class="w-12 h-12">
  <img src="${
    video.authors[0].profile_picture
  }" alt="logo-image" class="w-full h-full object-cover rounded-full">
  </div>
  <div>
  <h2 class="text-xl font-bold">${video.title}</h2>
  <div class="flex gap-2 items-center">
  <h3 class="text-md font-medium">${video.authors[0].profile_name}</h3>
  ${
    video.authors[0].verified == true
      ? '<img src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt="varify batch" class="h-5"/>'
      : ''
  }
  </div>
  <p class="text-sm">${video.others.views} Views</p>
  </div>
  </div>
      `;
    videosContainer.append(card);
  });
};

// Time String
function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let reminigSecond = time % 3600;
  const minute = parseInt(reminigSecond / 60);
  const second = reminigSecond % 60;
  return `${hour} hour ${minute} minute ${second} second ago`;
}

loadCaregories();
loadVideos();
