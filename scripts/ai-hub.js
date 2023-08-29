const dataLoad = async (isShowMore) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const cardData = data.data.tools;
    displayData(cardData, isShowMore);
}
// display cards
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
                <button onclick="modal_show.showModal(); modalDetails('${card.id}')" class="btn bg-transparent border-none"><i class="fa-solid fa-circle-arrow-right text-3xl" style="color: #ff582e;"></i></button>
            </div>
        </div>
        `;
        
        cardContainer.appendChild(cardDiv);
        feature(card.id, card.features);
    })
}

dataLoad();

//features function
function feature(id,data) {
    console.log(data);
    const featureContainer = document.getElementById(id);
    console.log(featureContainer);
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


// modal details section
const modalDetails = async(Id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${Id}`)
    const data = await res.json();
    const details = data.data
    // console.log(details);
    const aiDetails = document.getElementById('ai-details');
    const aiShowCase = document.getElementById('ai-showcase');
    aiDetails.innerHTML ='';
    aiShowCase.innerHTML ='';
    const detailDiv = document.createElement('div');
    detailDiv.innerHTML = `
    <h1 class="text-2xl font-semibold">${details.description}</h1>
    <div class="flex gap-4 justify-center mt-4">
    <div class="bg-white rounded-sm text-center text-green-400 p-3"><p>${details.pricing[0].plan}</p><p>${details.pricing[0].price}</p></div>
    <div class="bg-white rounded-sm text-center text-yellow-400 p-3"><p>${details.pricing[1].plan}</p><p>${details.pricing[0].price}</p></div>
    <div class="bg-white rounded-sm text-center text-red-400 p-3"><p>${details.pricing[2].plan}</p><p>${details.pricing[0].price}</p></div>
    </div>

    <div class="flex flex-col md:flex-row gap-4 justify-center">
    <div>
    <h3 class="font-semibold mt-4">Features</h3>
    <ul class="list-disc text-xs p-4">
    <li>${details.features['1'].feature_name}</li>
    <li>${details.features['2'].feature_name}</li>
    <li>${details.features['3'].feature_name}</li>
    </ul>
    </div>

    <div>
    <h3 class="font-semibold mt-4">Integrations</h3>
    <ul class="list-disc text-xs p-4" id="${Id+Id}">

    </ul>
    </div>
    </div>
    `
    aiDetails.appendChild(detailDiv);

    feature(Id+Id, details.integrations);
    // console.log(details.integrations[1]);

    const showcaseDiv = document.createElement('div');
    showcaseDiv.classList =`card bg-base-100`;
    showcaseDiv.innerHTML = `
    <figure class="px-10 pt-10 relative">
        <img src="${details.image_link[0]}" alt="Shoes" class="rounded-xl" />
    </figure>
    <p class="btn btn-sm bg-[#EB5757] text-white text-xs w-32 absolute right-0">${details?.accuracy.score*100}% accuracy</p>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${details.input_output_examples[0].input}</h2>
        <p>${details.input_output_examples[0].output}</p>
    </div>
    `
    aiShowCase.appendChild(showcaseDiv);
}