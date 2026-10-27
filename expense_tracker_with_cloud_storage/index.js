const form = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submit-btn");
const expenseList = document.getElementById("expense-list");

// CRUD-CRUD url
const apiUrl = "https://crudcrud.com/api/efafd669503c471bb5537d9100dae5b7/expenses";

// to load saved expenses
let expenses = [];
let editId = null;                                      // to track wheather we are editing existing value or not

// fetch saved expenses when page loads
document.addEventListener("DOMContentLoaded", function() {
    fetchExpenses();
});

// fetch all expenses using GET
function fetchExpenses() {
    axios.get(apiUrl)
        .then(response => {
            expenses = response.data;
            displayExpenses();
        })
        .catch(err => {
            console.log(err);
        });
}

// to add or update expense
function handleFormSubmit(event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();

    if(amount < 1 || !category || !description) return;

    const expense = {
            amount,
            description,
            category
    };

    // if editing existing expense
    if(editId !== null) {
        axios.put(`${apiUrl}/${editId}`, expense)
            .then(() => {
                resetForm();
                fetchExpenses();
            })
            .catch(err => {
                console.log(err);
            });
    }
    // adding new expense
    else {
        axios.post(apiUrl, expense)
            .then(() => {
                resetForm();
                fetchExpenses();
            })
            .catch(err => {
                console.log(err);
            });
    }
};


// function to clear the form after editing/adding
function resetForm() {
    form.reset();
    editId = null;
    submitBtn.textContent = "Add Expense";
}


// to display expenses on the screen
function displayExpenses() {
    expenseList.innerHTML = "";
    
    expenses.forEach(function(expense) {
        const li = document.createElement("li");
        li.className = "expense-item";

        const details = document.createElement("span");
        details.className = "expense-details";
        details.textContent = `${expense.amount} - ${expense.category} - ${expense.description}`;

        // edit expense
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-secondary mx-3 border solid black 2px";
        editBtn.textContent = "Edit Expense";

        editBtn.addEventListener("click", function() {
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            descriptionInput.value = expense.description;

            editId = expense._id;
            submitBtn.textContent = "Update Expense";

            amountInput.focus();
        });

        // delete expense
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Expense";
        deleteBtn.className = "btn btn-dark";

        deleteBtn.addEventListener("click", function() {
            axios.delete(`${apiUrl}/${expense._id}`)
                .then(() => {
                    if(editId === expense._id) {
                        resetForm();
                    }
                    fetchExpenses();
                })
                .catch(err => {
                    console.log(err);
                });
        });

        li.appendChild(details);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });
}

// handle form submission
form.addEventListener("submit", handleFormSubmit);