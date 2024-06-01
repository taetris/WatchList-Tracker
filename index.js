const itemsPending = document.getElementById("items_pending");
const itemsCompleted = document.getElementById("items_completed");

const input = document.getElementById("input");

// Event listener for adding items on "Enter" key press
input.addEventListener("keyup", (e) =>{
    if(e.key === "Enter" && input.value.trim() !== "") {
        addItemToPending(input.value.trim());
        input.value = "";
    }
})

// Event listener for moving items between lists when checkbox is checked
itemsPending.addEventListener("change", (e) => {
    if (e.target.type === "checkbox" && e.target.checked) {
        const checkboxId = e.target.id;
        const id = checkboxId.split("-")[1];
        const itemValue = document.getElementById(`item-${id}`).innerHTML;
        addItemToCompleted(itemValue);
        removeItemFromPending(id);
    }
});

// Function to add item to completed list
const addItemToCompleted = (itemValue) => {
    itemsCompleted.innerHTML += `<li>${itemValue}</li><br>`;
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

