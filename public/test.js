// try {
//     const data = await fetch(
//       `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Default/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
//         }
//       }
//     );
//     if(data.status === 200){
//       const newTodoList = todoList.filter((list) => list.id !== id);
//       setTodoList(newTodoList);
//     }
//     console.log(data)
//   } catch (error) {
//     console.error(error); 
//   }
// };
// const handleRemoveItem = (productId: string) => {
//     const newList = { ...cart };
//     newList.items = newCart.items.filter(
//       (item) => item.product_id !== productId
//     );
//     calculateBoxes(newCart);
//     setCart(newCart);
//     localStorage.setItem('storedCart', JSON.stringify(newCart));
//   };