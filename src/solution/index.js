function whenLayoutloaded() {
  $spcontext.assignAttributes();

  function peoplePicker(){
    $spcontext.loadSPDependencies(
      () => {
        console.log("PeoplePicker Loaded");
        $spcontext.createMultiplePeoplePicker({});
      },
      { clientPeoplePicker: true }
    );
  
  }
  peoplePicker();

  $spcontext.loadSPDependencies(() => {
    console.log("Speedpoint successfully loaded :)");

    // let inputFields = document.querySelectorAll("#form input");
    let createBtn = document.getElementById("create-btn");

    let listItem = [];
    let editingId = null;


    function getListItems() {
      $spcontext.getListToItems(
        "Speed Form",
        $spcontext.camlBuilder(),
        {
          data: [
            "ID",
            "Title",
            "CashAmount",
            "ItemOfExpense",
            "ManagerName",
            "ItemCount",
            "PurchaseDate",
            "EmployeeID",
            "Description",
          ],
        },
        false,
        null,
        (response) => {
          console.log(response);
          listItem = response;

          let output = document.getElementById("output");
          output.innerHTML = "";

          if (response === null || response.length == 0) {
            output.innerHTML = "<p>Your entries will show here</p>";
          } else {
            let table = `
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Cash Amount</th>
                    <th>Item Of Expense</th>
                    <th>Manager Name</th>
                    <th>Item Count</th>
                    <th>Purchase Date</th>
                    <th>Employee ID</th>
                    <th>Description</th>
                    <th>Supervisor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="output-table-body"></tbody>
              </table>
            `
            output.innerHTML = table;
            let outputTableBody = document.getElementById("output-table-body");

            response.forEach((dataItem, index) => {
              let content = `
                <tr>
                  <td>${dataItem.Title}</td>
                  <td>${dataItem.CashAmount}</td>
                  <td>${dataItem.ItemOfExpense}</td>
                  <td>${dataItem.ManagerName}</td>
                  <td>${dataItem.ItemCount}</td>
                  <td>${dataItem.PurchaseDate}</td>
                  <td>${dataItem.EmployeeID}</td>
                  <td>${dataItem.Description}</td>
                  <td>${dataItem.Supervisor.value}</td>
                  <td id="action-btn">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-id="${dataItem.ID}">Delete</button>
                  </td>
                </tr>`;
              outputTableBody.innerHTML += content;
            });

            document.querySelectorAll('.edit-btn').forEach(button => {
              button.addEventListener('click', (e) => {
                e.preventDefault();
                handleEdit(e.target.dataset.index);
              });
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
              button.addEventListener('click', (e) => {
                e.preventDefault();
                deleteListItem(e.target.dataset.id);
              });
            });
          }
        }
      );
    }


    function populateFormField(data) {
      $spcontext.htmlBind({
        Title: data.Title || "",
        CashAmount: data.CashAmount || "",
        ItemOfExpense: data.ItemOfExpense || "",
        ManagerName: data.ManagerName || "",
        ItemCount: data.ItemCount || "",
        PurchaseDate: data.PurchaseDate || "",
        EmployeeID: data.EmployeeID || "",
        Description: data.Description || "",
        Supervisor: data.Supervisor || "",
      });
    }

    function clearFormField() {
      $spcontext.htmlBind({
        Title: "",
        CashAmount: "",
        ItemOfExpense: "",
        ManagerName: "",
        ItemCount: "",
        PurchaseDate: "",
        EmployeeID: "",
        Description: "",
        Supervisor: {},
      });
    }

    function createListItem(item) {
      console.log(item);
      $spcontext.createItems(
        [item],
        "Speed Form",
        () => {
          console.log("Item Created");
          getListItems();
        },
        () => {
          console.log("Error creating item");
        }
      );
    }

    function updateListItem(id, update) {
      console.log(`Updating item with ID ${id}`, update);
      $spcontext.updateItems(
        [{ ID: id, ...update }],
        "Speed Form",
        () => {
          console.log("Item updated");
          getListItems();
        },
        () => {
          console.log("Error updating item");
        }
      );
    }

    function deleteListItem(id) {
      if (confirm("Are you sure you want to delete this item?")) {
        console.log(`Deleting item with ID ${id}`);
        $spcontext.deleteItem(
          "Speed Form",
          id,
          () => {
            console.log("Item deleted");
            getListItems();
          },
          (error) => {
            console.log("Error deleting item", error);
          }
        );
      }
    }

    function handleEdit(index) {
      let item = listItem[index];
      console.log(`Editing item at index ${index}`, item);
      editingId = item.ID;
      populateFormField(item);
      peoplePicker();
    }

    createBtn.addEventListener("click", (e) => {
      e.preventDefault();
      var formData = $spcontext.bind();
      console.log("Form data", formData);
  
      let allFieldsFilled = true;
      for (let key in formData) {
        if (formData[key] === "" || formData[key] === null || formData[key] === undefined) {
          allFieldsFilled = false;
          break;
        }
      }
    
      if (!allFieldsFilled) {
        alert("All fields must be filled");
        return;
      }
    
      if (editingId && formData) {
        updateListItem(editingId, formData);
        alert('Data updated successfully');
        clearFormField();
        peoplePicker();
        editingId = null;
      } else {
        createListItem(formData);
        alert('Data Input Successful');
        clearFormField();
        peoplePicker();
      }
    });
    

    getListItems();
  });
}

whenLayoutloaded();