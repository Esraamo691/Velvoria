"use client";

import { useEffect, useState } from "react";
import { OrdersResponse, Order } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import Link from "next/link";

export default function AllUserOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId
      );
      const data: OrdersResponse = await response.json();
      console.log("Orders API response:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) return <Loading />;

  if (orders.length === 0) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center flex-col">
        <h2 className="text-2xl mb-5">No orders Found</h2>
        <Link href={"/cart"}>
          <Button className="cursor-pointer">Make An Order</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 mx-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-[#E8CFA8]">
          All Orders{" "}
          <span className=" p-2 py-0 rounded-full bg-[#2c2921] ">
            {orders.length}
          </span>
        </h1>
      </div>

      <table className="min-w-full text-sm text-gray-700 border-collapse overflow-hidden rounded-2xl">
        <thead className="bg-[#2c2921] text-[#E8CFA8] text-center">
          <tr>
            <th className="px-4 py-3  rounded-tl-2xl">Order ID</th>
            <th className="px-4 py-3 ">User</th>
            <th className="px-4 py-3 ">Total</th>
            <th className="px-4 py-3 ">Paid</th>
            <th className="px-4 py-3 ">Delivered</th>
            <th className="px-4 py-3 ">Date</th>
            <th className="px-4 py-3  rounded-tr-2xl">C I t y</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className={`border-b border-[#d0d0a6] text-center transition-all duration-300 ${
                order.isPaid ? "bg-green-50" : "bg-[#f9f9e8]"
              } hover:bg-[#f1f1d6]`}
            >
              <td className="px-4 py-3 font-mono text-xs text-gray-600 ">
                #{order._id.slice(-6)}
              </td>

              <td className="px-4 py-3 ">
                <span className="font-semibold">{order.user?.name}</span>
                <br />
                <small className="text-gray-500">{order.user?.email}</small>
              </td>

              <td className="px-4 py-3 font-bold ">
                {order.totalOrderPrice} EGP
              </td>

              <td className="px-4 py-3 ">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
              </td>

              <td className="px-4 py-3 ">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </td>

              <td className="px-4 py-3  text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </td>

              <td className="px-4 py-3 ">{order.shippingAddress.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
