const apiUrl = "https://crudcrud.com/api/efafd669503c471bb5537d9100dae5b7/restaurantOrders";

// fetch and display order when page loads
document.addEventListener("DOMContentLoaded", () => {
    axios.get(apiUrl)
        .then((res) => {
            res.data.forEach((order) => {
                displayOrder(order);
            });
        })
        .catch(err => {
            console.log("Error while fetching orders: ", err);
        });
});

// place new order
document.getElementById("order-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = document.getElementById("amount").value;
    const dish = document.getElementById("dish").value.trim();
    const table = document.getElementById("table").value;

    const order = {
        amount,
        dish,
        table,
    };

    axios.post(apiUrl, order)
        .then((res) => {
            // display order retured by crudcrud
            displayOrder(res.data);

            //clear the form after successful oreder placement
            document.getElementById("order-form").reset();
        })
        .catch((err) => {
            console.log("Error while placing order: ", err);
        });
});

// display orders under their respective table
function displayOrder(order) {
    let listId;

    if(order.table === "Table-1") {
        listId = "table1-orders";
    }
    else if(order.table === "Table-2") {
        listId = "table2-orders";
    }
    else if(order.table === "Table-3") {
        listId = "table3-orders";
    }
    else return;

    const ul = document.getElementById(listId);
    const li = document.createElement("li");

    const orderDetails = document.createElement("span");
    orderDetails.textContent = `Amount: ${order.amount} - Dish: ${order.dish} - Table: ${order.table}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        deleteOrder(order._id, li);
    });

    li.appendChild(orderDetails);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}

// delete order function
function deleteOrder(orderId, li) {
    axios.delete(apiUrl + "/" + orderId)
        .then(() => {
            li.remove();
        })
        .catch((err) => {
            console.log("Error while deleting order:", err);
        });
}