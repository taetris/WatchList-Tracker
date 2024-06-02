const itemsPending = document.getElementById("items_pending");
const itemsCompleted = document.getElementById("items_completed");

const input = document.getElementById("input");
const debounceTime = 2000;
// Event listener for adding items on "Enter" key press
input.addEventListener("keyup", (e) =>{
    
    //implement debouncer here
    
    if(e.key === "Enter" && input.value.trim() !== "") {
        //search using api here
        let query = input.value.trim();
        makeAPICall(query, showAPIResults, addItemToPending);


        // addItemToPending(query);
        input.value = "";
    }
})


async function makeAPICall(query, showAPIResults, addItemToPending){
    const req =  await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const results = await req.json();
    // console.log(res);
    showAPIResults(results, addItemToPending);
}


const showAPIResults = (results) => {
    const dropdownContainer = document.getElementById('searchDropdown');

    results.forEach((result) => {
        let movieName = result.show.name;
        const option = document.createElement('option');
        option.value = movieName;
        option.textContent = movieName;
        dropdownContainer.appendChild(option);
    })
        // Clear previous results
        dropdownContainer.innerHTML = '';
    }

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

}
const addItemToPending = (item) => {
    let id = createID();
    let checkBox = createCheckBox(id);

    const listItem = `<li id="item-${id}">${item} ${checkBox}</li>`;
    itemsPending.insertAdjacentHTML("beforeend", listItem);
}



// ---------------------------------------------------------------------

const body = `Hey! It's me, Tripti.

Guess what? The unthinkable happened! 
I finally watched one of your movie recommendations! 🎉

I know, I know, it’s been a century since you first told me about it. 
You’ve probably recommended another 73 movies since then, but hey, baby steps, right? 

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

Thanks for being my persistent movie recommender. You have the patience of a saint, and I appreciate you not disowning me for my terrible procrastination skills. 

Let’s catch up soon and dissect every glorious detail my eyes devoured during this movie. I’m armed with snacks and opinions.

Cheers,
Tripti`;