import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (newOrder) => {
        set((state) => {
          const existingOrder = state.orders.find(
            (order) => order.studentId === newOrder.studentId && order.product.id === newOrder.product.id
          );
      
          if (existingOrder) {
            const updatedOrders = state.orders.map((order) =>
              order.studentId === newOrder.studentId && order.product.id === newOrder.product.id
                ? { ...order, status: "Settled" }
                : order
            );
      
            setTimeout(() => {
              set((state) => ({
                orders: state.orders.filter((order) => order.status !== "Settled"),
              }));
            }, 5000);
      
            return { orders: updatedOrders };
          }
      
          return { orders: [...state.orders, newOrder] };
        });
      },
      

      updateOrderStatus: (studentId, productId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.studentId === studentId && order.product.id === productId
              ? { ...order, status }
              : order
          ),
        }));
      },

      removeSettledOrders: () => {
        set((state) => ({
          orders: state.orders.filter((order) => order.status !== "Settled"),
        }));
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
