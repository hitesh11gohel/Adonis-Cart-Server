/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.get("/customer", "CustomersController.index");
  Route.post("/customer", "CustomersController.store");
  Route.get("/customer/:id", "CustomersController.show");
  Route.delete("/customer/:id", "CustomersController.destroy");
  Route.patch("/customer/:id/edit", "CustomersController.edit");

  Route.group(() => {
    Route.get("/", "ProductsController.index");
    Route.get("/:id", "ProductsController.show");
    Route.post("/", "ProductsController.store");
    Route.delete("/:id", "ProductsController.destroy");
    Route.patch("/:id/edit", "ProductsController.edit");
  }).prefix("product");

  Route.group(() => {
    Route.get("/", "OrdersController.index");
    Route.get("/:no", "OrdersController.show");
    Route.post("/", "OrdersController.store");
    Route.delete("/:no", "OrdersController.destroy");
    Route.patch("/:no/edit/:total_amount", "OrdersController.edit");
    Route.get("/:no/orderitems", "OrderItemsController.index");
    Route.post("/:no/:product_no/orderitems", "OrderItemsController.store");
    Route.post(
      "/:product_id/:customer_id/addorderitems",
      "OrderItemsController.store2"
    );
  }).prefix("order");
}).prefix("api");

Route.resource("/mayur", "mayurContorller");
