import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      history: [],
      borrowed: {},

      inventoryStocks: [
        { id: 1001, name: "Hot Air Gun", qty: 10, filePath: "/images/equipments/airgun.png" },
        { id: 1002, name: "Analog Multi Meter", qty: 10, filePath: "/images/equipments/analog-multimeter.png" },
        { id: 1003, name: "Digital Multi Meter", qty: 10, filePath: "/images/equipments/digital-multimeter.png" },
        { id: 1004, name: "Combination Pliers", qty: 10, filePath: "/images/equipments/combination-pliers.png" },
        { id: 1005, name: "Cutter Pliers", qty: 10, filePath: "/images/equipments/cutter-pliers.png" },
        { id: 1006, name: "Flat Screw", qty: 10, filePath: "/images/equipments/flat-screw.png" },
        { id: 1007, name: "Phillips Screw", qty: 10, filePath: "/images/equipments/phillips-screw.png" },
        { id: 1008, name: "Toolbox Set", qty: 10, filePath: "/images/equipments/toolbox.png" },
      ],

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
      
            const settledOrder = {
              ...existingOrder,
              status: "Settled",
              date: new Date().toLocaleString(),
            };
      
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
      
            return {
              orders: updatedOrders,
              history: [...state.history, settledOrder],
            };
          }
      
          const newEntry = {
            ...newOrder,
            date: new Date().toLocaleString(),
          };
      
          return {
            orders: [...state.orders, newOrder],
            history: [...state.history, newEntry],
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

      addNewProduct: (newProduct) => {
        set((state) => {
          const existingIndex = state.inventoryStocks.findIndex((p) => p.id === newProduct.id);

          if (existingIndex !== -1) {
            const updatedStocks = [...state.inventoryStocks];
            updatedStocks[existingIndex] = newProduct;
            return { inventoryStocks: updatedStocks };
          }

          return { inventoryStocks: [...state.inventoryStocks, newProduct] };
        });
      },

      saveOrdersToHistory: () => {
        set((state) => {
          const newHistoryEntries = state.orders.filter((order) => {
            return !state.history.some(
              (hist) =>
                hist.studentId === order.studentId &&
                hist.product.id === order.product.id &&
                hist.status === order.status
            );
          });

          return {
            history: [...state.history, ...newHistoryEntries],
          };
        });
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
