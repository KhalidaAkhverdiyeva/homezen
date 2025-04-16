//FOR SMOOTH LOADING SCROLL

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const revealSection = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      const sectionHeight = section.clientHeight;
      if (scrollY > sectionTop - window.innerHeight + sectionHeight / 6) {
        section.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealSection);
  revealSection();
});



const baseUrl = '';
const cardContainer = document.querySelector('.flat-section-cards');
const cityBox = document.querySelector('.cardBox');

///GET DATA FROM APIIII
async function fetchData(endpoint, cb) {
  const response = await fetch(`/api/${endpoint}`);
  const data = await response.json();
  cb(data);
  return data;
}




fetchData('cards', fillCardInfo);

function fillCardInfo(data) {

  dataItem = data.map(dataItem => {

    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'col-4');

    cardElement.innerHTML = `
        <div class="card-home">
            <div class="card-archive-top">
              <div class="image-card">
                <div class="image-style">
                  <img
                    src="${dataItem.image}"
                    alt=""
                  />
                </div>
                <div class="image-top">
                  <ul class="image-tag1">
                    <li>FEATURED</li>
                    <li>FOR SALE</li>
                  </ul>
                  <ul class="image-tag2">
                    <li><i class="fa-solid fa-arrow-right-arrow-left"></i></li>
                    <li><i class="fa-regular fa-heart"></i></li>
                    <li><i class="fa-regular fa-eye"></i></li>
                  </ul>
                </div>
                <div class="image-bottom"><span>${dataItem.btnText}</span></div>
              </div>
              <div class="card-archive-top-content">
                <div>${dataItem.title}</div>
                <div>
                  <i class="fa-solid fa-location-dot"></i>
                  <p>${dataItem.address}</p>
                </div>
                <ul>
                  <li>
                    <i class="fa-solid fa-bed"></i>
                    <span>${dataItem.bedrooms}</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-bath"></i>
                    <span>${dataItem.bathrooms}</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-ruler"></i>
                    <span>600 SqTF</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-archive-bottom">
              <div class="card-archive-bottom-left">
                <div>
                  <img
                    src="${dataItem.agentImage}"
                    alt=""
                  />
                </div>
                <span>${dataItem.agentName}</span>
              </div>
              <div class="card-archive-bottom-right">
                <h6>${dataItem.price}</h6>
                <span>${dataItem.pricePer}</span>
              </div>
            </div>
          </div>`

    cardContainer.appendChild(cardElement);


  })

}



fetchData('cities', fillCityInfo);

function fillCityInfo(data) {
  data.map((dataItem) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('city-card');
    cardElement.setAttribute('data-id', dataItem.id);

    cardElement.innerHTML = `
    <div class="deleteIcon"><i class="fa-regular fa-trash-can"></i></div>
    <div class="updateIcon"><i class="fa-regular fa-pen-to-square"></i></div>

    <div class="cardImage">
              <img
                src="${dataItem.img}"
                alt=""
              />
            </div>
            <div class="cardContent">
              <h6>${dataItem.name}</h6>
              <p>${dataItem.propNum} properties</p>
              <a href="">
                <span>Explore Now</span>
                <span><i class="fa-solid fa-arrow-right"></i></span>
              </a>
            </div>`

    cityBox.appendChild(cardElement);
  })

}



//CITY SECTION OPEN CLOSE MODAL

const modal = document.querySelector(".modal");
const btn = document.querySelector(".openModal")
const span = document.getElementsByClassName("closeBtn")[0];



btn.addEventListener("click", () => {
  modal.style.display = "block";
});


span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

//ADD NEW CITYYYYY

const urlInput = document.querySelector('.url');
const cityNameInput = document.querySelector('.name');
const propNumInput = document.querySelector('.number');
const submitBtn = document.querySelector('.submitBtn')
const newCityForm = document.querySelector('.newCityForm');

submitBtn.addEventListener('click', addNewCity)

async function addNewCity(e) {
  console.log('addNewCity function called');
  e.preventDefault();
  const newCityData = {
    img: urlInput.value,
    name: cityNameInput.value,
    propNum: propNumInput.value
  }

  const response = await fetch(`/api/cities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCityData)
  });

  const newCity = await response.json();
  const { img, name, propNum } = newCity;

  const cardElement = document.createElement('div');
  cardElement.classList.add('city-card');

  cardElement.innerHTML += `
    <div class="city-card">
      <div class="cardImage">
        <img src="${img}" alt="" />
      </div>
      <div class="cardContent">
        <h6>${name}</h6>
        <p>${propNum} properties</p>
        <a href="">
          <span>Explore Now</span>
          <span><i class="fa-solid fa-arrow-right"></i></span>
        </a>
      </div>
    </div>`

  cityBox.appendChild(cardElement)
  modal.style.display = 'none';
}


//DELETE CITY CARD

cityBox.addEventListener('click', async (event) => {

  event.preventDefault();
  if (event.target.closest('.deleteIcon')) {
    const card = event.target.closest('.city-card');
    const cityId = card.getAttribute('data-id');
    await cardRemover(cityId, card);
  }
});


async function cardRemover(cityId, cardElement) {
  const response = await fetch(`/api/cities/${cityId}`, {
    method: 'DELETE',
  })
  cardElement.remove();
  console.log('card was removed')
}



///COMMENT SLIDER

const oneBtn = document.querySelector('.oneBtn');
const twoBtn = document.querySelector('.twoBtn');
const threeBtn = document.querySelector('.threeBtn');

const commentText = document.querySelector('.commentText');


function changeTextOne() {
  const text1 = '"111My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."'

  commentText.innerHTML = text1;

}
oneBtn.addEventListener('click', changeTextOne)



function changeTextTwo() {
  const text2 = '"222My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."'

  commentText.innerHTML = text2;

}

twoBtn.addEventListener('click', changeTextTwo)


threeBtn.addEventListener('click', changeTextThree)

function changeTextThree() {
  const text3 = '"333My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."'

  commentText.innerHTML = text3;


}


///CARDLARA UPDATE
document.addEventListener('DOMContentLoaded', () => {
  const updateIcons = document.querySelectorAll('.updateIcon');
  const modalUpdate = document.querySelector('.modalUpdate')


  updateIcons.forEach(updateIcon => {
    updateIcon.addEventListener('click', () => {
      console.log('ababa')
    })
  })
})



// function openModal() {

//   modalUpdate.style.display = "block";

// }









