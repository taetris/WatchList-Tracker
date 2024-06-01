const items_pending = document.getElementById("items_pending");
const items_completed = document.getElementById("items_completed");

const input = document.getElementById("input");
const checkbox = document.getElementById("Checkbox");

input.addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        addItemToPending(input.value);
        input.value = "";
    }
})

items_pending.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        if (e.target.checked) {
            const checkboxId = e.target.id;
            addItemToCompleted(checkboxId);
            removeItemFromPending(checkboxId);
            
        }
    }
});

const addItemToCompleted = (checkboxId) => {
    let id = checkboxId.split("-")[1];
    itemValue = document.getElementById(`item-${id}`).innerHTML;
    items_completed.innerHTML += "<li>"+itemValue + "</li>"+ "<br>";
}
const removeItemFromPending = (checkboxId) => {
    let id = checkboxId.split("-")[1];
    document.getElementById(`item-${id}`).remove();
    document.getElementById(`checkbox-${id}`).remove();
}


const createID = () => `${Date.now()}`;
const createCheckBox = (itemID) =>{
    let checkbox = `<input type="checkbox" id="checkbox-${itemID}"></input>`;
    return checkbox;
}
const addItemToPending = (item) => {
    let id = createID();
    let checkBox = createCheckBox(id);
    console.log(id);
    console.log(checkBox);
    itemValue = `<li id="item-${id}">`+ item + "</li>" ;
    items_pending.innerHTML += itemValue + checkBox + "<br>";
}

