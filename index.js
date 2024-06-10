const itemsPending = document.getElementById("items_pending");
const itemsCompleted = document.getElementById("items_completed");

const input = document.getElementById("input");
const suggestionsContainer = document.querySelector('.suggestions ul');


const debounceTime = 1000;

let timer;
input.addEventListener("keyup", (e) =>{
    
    //implement debouncer here
    if(timer){
        suggestionsContainer.innerHTML = '';
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        makeAPICall(input.value, showAPIResults, addItemToPending);
    }, debounceTime);
    
    
    if(e.key === "Enter" && input.value.trim() !== "") {
        //search using api here
        let query = input.value.trim().toLowerCase();
        makeAPICall(query, showAPIResults, addItemToPending);
        // console.log(query)
        // addItemToPending(query);
        input.value = "";
    }
})


async function makeAPICall(query, showAPIResults, addItemToPending){
    try {
        const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const results = await req.json();
        if (results.length === 0) {
            throw new Error('No results found');
        }
        showAPIResults(results, addItemToPending);
    } catch (error) {
        const errorItem = document.createElement('li');
        errorItem.textContent = error.message;
        suggestionsContainer.appendChild(errorItem);
    }
}



const showAPIResults = (results) => {
    results.forEach((result) => {
        // console.log(result.show.name);
        const suggestionItem = document.createElement('li');
        suggestionItem.textContent = result.show.name;
        suggestionsContainer.appendChild(suggestionItem);
    });
    
}

suggestionsContainer.addEventListener('click', (e) => {
    input.value = e.target.textContent;
    addItemToPending(e.target.textContent);
    suggestionsContainer.innerHTML = ''; 
})

// Event listener for moving items between lists when checkbox is checked
itemsPending.addEventListener("change", (e) => {
    if (e.target.type === "checkbox" && e.target.checked) {
        const checkboxId = e.target.id;

        const id = checkboxId.split("-")[1];
        const itemValue = document.getElementById(`item-${id}`).innerHTML;
        
        addItemToCompleted(itemValue, id);
        removeItemFromPending(id);
    }
});

itemsCompleted.addEventListener("keypress", (e) => {
    if(e.target.type === "email" && e.key === "Enter") {
        const id = e.target.id.split("-")[1];
        const itemValue = document.getElementById(`item-${id}`).innerHTML.split('<input')[0].trim();;
        const recommenderEmail = e.target.value;
        sendEmailtoRecommender(recommenderEmail, itemValue)
        e.target.value = "";
    }
})

const sendEmailtoRecommender = (email, itemValue) =>{
    console.log(email);
    const subject = `🚨 Alert! I Finally Watched ${itemValue}`;
    
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailLink, '_blank');

}
const addRecommendersEmailBox = (id) => {
    return `<input id="email-${id}" type="email" placeholder="Recommender's email">`;
    
};

// Function to add item to completed list
const addItemToCompleted = (itemValue, id) => {
    let emailBox = addRecommendersEmailBox(id);
    itemsCompleted.innerHTML += `<li id="item-${id}">${itemValue} ${emailBox} </li><br>`;
};

// Function to remove item from pending list
const removeItemFromPending = (id) => {
    document.getElementById(`item-${id}`).remove();
    document.getElementById(`checkbox-${id}`).remove();
};


const createID = () => `${Date.now()}`;
const createCheckBox = (itemID) =>{
    return `<input type="checkbox" id="checkbox-${itemID}"></input>`;


    // const checkBox = document.createElement('input');
    // checkBox.type = 'checkbox';
    // checkBox.id = `checkbox-${itemID}`;
    // return checkBox;
    
}

const addItemToPending = (item) => {
    let id = createID();
    let checkBox = createCheckBox(id);
    // const listItem = document.createElement('li');
    // listItem.id = `item-${id}`;
    // listItem.textContent = item; 

    // listItem.appendChild(checkBox);
    const listItem = `<li id="item-${id}">${item} ${checkBox}</li>`;

    itemsPending.insertAdjacentHTML("beforeend", listItem);
}



// ---------------------------------------------------------------------

const body = `Hey! 

Guess what? I finally watched one of your movie recommendations.

I know, I know, it’s been a century since you first told me about it. 
You’ve probably recommended another 73 movies since then.

So, last night I settled in with your recommendation. 

And let me tell you, 

IT. WAS. EPIC. 

Seriously, why didn’t you force me to watch it sooner? 
Oh wait, you did. My bad. 

Can we talk about the main character? 
Because OMGGG, I am totally fangirling over here. 

Also, that plot twist at the end?

 I’m still recovering. I might need therapy. Or a sequel. Definitely a sequel.
Please tell me there's a sequel!

Hit me with another recommendation, and I promise I won’t take another millennium to watch it. 
Maybe. 
Probably. 
Okay, let's not set unrealistic expectations, but I’ll definitely try!

Thanks for being my persistent movie recommender. You have the patience of a saint, and I appreciate you not disowning me yet. 

Let’s catch up soon and dissect every glorious detail. I’m armed with snacks and opinions.
`;