import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showProducts } from "./products.js";

let addEditDiv = null;
let name = null;
let category = null;
let flavor = null;
let addingProduct = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-product");
  name = document.getElementById("productName");
  category = document.getElementById("category");
  flavor = document.getElementById("flavor");
  addingProduct = document.getElementById("adding-product");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingProduct) {
        enableInput(false);
        let method = "POST";
        let url = "/api/v1/products";

        if (addingProduct.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/products/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: name.value,
              category: category.value,
              flavor: flavor.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The product entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The product entry was created.";
            }

            name.value = "";
            category.value = "black";
            flavor.value = "";
            showProducts();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      }
    }
  });
}

export const showAddEdit = async (productId) => {
  if (!productId) {
    name.value = "";
    category.value = "black";
    flavor.value = "";
    addingProduct.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        name.value = data.product.name;
        category.value = data.product.category;
        flavor.value = data.product.flavor;
        addingProduct.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = productId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The products entry was not found";
        showProducts();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showProducts();
    }

    enableInput(true);
  }
};