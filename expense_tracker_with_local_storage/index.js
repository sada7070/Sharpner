const form = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const submitBtn = document.getElementById("submit-btn");
const expenseList = document.getElementById("expense-list");

// to load saved expenses(if empty use an empty array)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;                                                      // to track wheather we are editing existing value or not

// to save expenses to local storage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// to add or update expense

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();

    if(amount < 1 || !category || !description) return;

    // if editing existing expense
    if(editId !== null) {
        expenses = expenses.map(function(expense) {
            if(expense.id === editId) {
                return {
                    ...expense,
                    amount,
                    description,
                    category
                };
            }
            return expense;
        });
    }
    // adding new expense
    else {
        const newExpense = {
            id: Date.now(),
            amount,
            description,
            category
        };
        expenses.push(newExpense);
    }

    saveExpenses();
    displayExpenses();
    resetForm();
});


// funvtion to clear the form after editing/adding
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
        details.className = "expense-detials";
        details.textContent = `${expense.amount} - ${expense.category} - ${expense.description}`;

        // edit expense
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-secondary mx-3 border solid black 2px";
        editBtn.textContent = "Edit Expense";

        editBtn.addEventListener("click", function() {
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            descriptionInput.value = expense.description;

            editId = expense.id;
            submitBtn.textContent = "Update Expense";

            amountInput.focus();
        });

        // delete expense
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Expense";
        deleteBtn.className = "btn btn-dark";

        deleteBtn.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            // if we delete the expense which is being edited
            if(editId === expense.id) resetForm();

            saveExpenses();
            displayExpenses();
        });

        li.appendChild(details);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });
}


// to display previously saved expenses
displayExpenses();