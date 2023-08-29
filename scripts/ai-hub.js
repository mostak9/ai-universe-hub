const dataLoad = async (isShowMore) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const cardData = data.data.tools;
    displayData(cardData, isShowMore);
}

function displayData(cardData, isShowMore) {
    const cardContainer = document.getElementById('card-container');
    const seeMoreContainer = document.getElementById('see_more_container');
    cardContainer.innerHTML ='';
    let newCardData;
    if(isShowMore) {
        newCardData = cardData;
        seeMoreContainer.classList.add('hidden')
    }
    else {
        newCardData = cardData.slice(0, 6);
        seeMoreContainer.classList.remove('hidden')
    }
    newCardData.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card bg-base-100 border-2`;
        cardDiv.innerHTML = `
        <figure class="p-5 rounded-md"><img class="rounded-md" src="${card?.image}" alt="${card?.name}" /></figure>
        <div class="card-body p-5">
            <h2 class="card-title">Features</h2>
            <ol id="${card.id}" class="mb-4 list-decimal p-5">
            </ol>
            <hr class="border-1 border-gray-300">
            <div class="flex justify-between items-center mt-6">
            <div>
                <p class="text-2xl font-semibold">${card.name}</p>
                <p class="text-[#585858] mt-3"><i class="fa-solid fa-calendar-days"></i> <span class=""> ${card.published_in}</span></p>
            </div>
            <div>
                <button class="btn bg-transparent border-none"><i class="fa-solid fa-circle-arrow-right text-3xl" style="color: #ff582e;"></i></button>
            </div>
        </div>
        `;
        
        cardContainer.appendChild(cardDiv);
        feature(card.id, card.features)
    })
}

dataLoad();

//features function
function feature(id,data) {

    const featureContainer = document.getElementById(id);
    data.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element;
        featureContainer.appendChild(li);
    });
}

// show more handler 
function showMore() {
    dataLoad(true);
}