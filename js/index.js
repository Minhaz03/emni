const loadAnimalCategories = () => {
    // document.getElementById('spinner').style.display = "none";

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayAnimalCategory(data.categories))
};


const loadPetDetails = () => {
    // const url = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    // const data = await url.json();
    // console.log(data.pets);
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
};

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (let btn of buttons){
        btn.classList.remove('active');
    }
};

const loadPetCategory = (id) => {
    // alert(id);
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        // console.log(activeBtn);
        activeBtn.classList.add('active');
        displayPets(data.data)
    })
    
};

const petDetailsLoad = async (petId) => {
    // console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);
};

// after press in line
const petsLiked = async (petId) => {
    // console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    likedPets(data.petData);
};

// after press in line
const likedPets = (petData) => {
    // console.log(petData);
    const likeDiv = document.getElementById('liked-pets');
    // likeDiv.innerHTML = `${petData.image}`;

        const likeContainer = document.createElement('div');
        // likeContainer.classList = "rounded-2xl w-[312px] h-[460px]";

        likeContainer.innerHTML = `<img class="w-[124px] h-[124px]" src= ${petData.image}  />`;

        likeDiv.append(likeContainer);
    

};

const displayDetails = (petData) => {
    console.log(petData);
    const detailsContainer = document.getElementById('modal-content');

    document.getElementById('customModal').showModal();
    // detailsContainer.classList = "w-[700px] h-[752px]";
    detailsContainer.innerHTML =
    `
        <img class="w-full h-full" src= ${petData.image}  />
        <div class="card-body px-5">
    <h2 class="card-title text-2xl font-bold"> ${petData.pet_name} </h2>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-table-cells-large pr-2"></i> Vacinated Status: ${petData.vaccinated_status}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-regular fa-calendar pr-2"></i> Birth: ${petData.date_of_birth}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-mercury pr-2"></i> Gender: ${petData.gender}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-dollar-sign pr-2"></i> Price: ${petData.price}</p>
        <div class="divider"></div>
        
        <h3 class="text-2xl font-bold">Details Information </h3> <br>
        <p class="text-xl text-[#131313B3] font-normal"> ${petData.pet_details} </p>

    `;
};


const displayPets = (pets) => {
    const petDetailsContainer = document.getElementById('pet-details');
    petDetailsContainer.innerHTML = "";

    if(pets.length === 0){
        petDetailsContainer.innerHTML = `
        <div class="lg:w-[985px] lg:h-[492px] bg-[#13131308] flex flex-col gap-5 justify-center items-center p-2 rounded-3xl">
            <img src="images/error.webp" />
            <h2 class="text-2xl font-bold"> No Information Available </h2>
            <p class="text-xl font-semibold"> Please Check Other Pets. This Sector is Under Construction. </p>
        </div>
        
        `;
        return
    }

    pets.forEach( (pet) => {
        
        const card = document.createElement("div");
        
        card.innerHTML =
        `
        <div class="card bg-[#1313131A] ">
  <figure class="px-5 pt-5">
    <img
      src= ${pet.image}
      alt="Shoes"
      class="rounded-xl w-max h-max" />
  </figure>
  <div class="card-body px-5">
    <h2 class="card-title text-2xl font-bold"> ${pet.pet_name} </h2>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-table-cells-large pr-2"></i> Breed: ${pet.breed}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-regular fa-calendar pr-2"></i> Birth: ${pet.date_of_birth}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-mercury pr-2"></i> Gender: ${pet.gender}</p>
    <p class="text-xl text-[#131313B3] font-normal"> <i class="fa-solid fa-dollar-sign pr-2"></i> Price: ${pet.price}</p>
        <div class="divider"></div>
    <div class="card-actions flex justify-evenly lg:justify-between rounded-lg">
      <button onclick="petsLiked(${pet.petId})" class="btn w-[56px] h-[38px]">
      <i class="fa-solid fa-thumbs-up"></i>
      </button>
      <button class="btn text-[#0E7A81] text-xl font-bold">Adopt</button>
      <button onclick="petDetailsLoad(${pet.petId})" class="btn text-[#0E7A81] text-xl font-bold">Details</button>
    </div>
  </div>
        </div>
        `;

        petDetailsContainer.append(card);
    
    
    });

};

// loader shown
const loadAllPets = () => {
    console.log('2 Second loaded');
    document.getElementById('spinner').style.display = 'none';
};

// loader shown
const handleSearch = () => {
    document.getElementById('spinner').style.display = 'block';


    setTimeout(function () {
        loadAllPets()
    }, 2000);
}


const displayAnimalCategory = (category) => {
    const categoryContainer = document.getElementById('category');
    
    category.forEach((item) => {
        // console.log(item);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList = "btn rounded-3xl w-[312px] h-[104px] my-2";
        

        buttonContainer.innerHTML = `
            <button id="btn-${item.category}" onclick="loadPetCategory('${item.category}')" class="text-black font-bold rounded-full flex items-center category-btn">
                <img class="h-full w-full mr-2 object-cover" src="${item.category_icon}" />
                <p class="text-2xl font-bold"> ${item.category} </p> 
            </button>
        
        `;
        
        categoryContainer.append(buttonContainer);
    })


}


loadAnimalCategories();
loadPetDetails();