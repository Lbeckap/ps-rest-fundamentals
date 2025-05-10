import express from "express";
import { getOrderDetail, getOrders } from "./orders.service";
import { idItemIdUUIDRequestSchema, pagingRequestSchema } from "../types";
import { validate } from "../../middleware/validation.middleware";

export const ordersRouter = express.Router();

ordersRouter.get("/", validate(pagingRequestSchema), async (req, res) => {
  const data = pagingRequestSchema.parse(req);
  const orders = await getOrders(data.query.skip, data.query.take);
  res.json(orders);
});

ordersRouter.get("/:id", validate(idItemIdUUIDRequestSchema), async (req, res) => {
    const data = idItemIdUUIDRequestSchema.parse(req);
    const order = await getOrderDetail(data.params.id);
    if (order != null){
        res.json(order);
    } else {
        res.status(404).json({message: "Order Not Found"});
    }
});