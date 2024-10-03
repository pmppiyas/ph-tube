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
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = element.category;
    categoriesContainer.append(button);
  });
};

loadCaregories();
