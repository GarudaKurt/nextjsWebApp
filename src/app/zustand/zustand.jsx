import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      borrowed: {}, // Track borrowed items

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
              set((state) => {
                const productId = newOrder.product.id;
                return {
                  orders: state.orders.filter((order) => order.status !== "Settled"),
                  borrowed: {
                    ...state.borrowed,
                    [productId]: Math.max((state.borrowed[productId] || 0) - 1, 0),
                  },
                };
              });
            }, 5000);

            return { orders: updatedOrders };
          }

          return {
            orders: [...state.orders, newOrder],
            borrowed: {
              ...state.borrowed,
              [newOrder.product.id]: (state.borrowed[newOrder.product.id] || 0) + 1,
            },
          };
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
