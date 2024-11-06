// Define la estructura de un ítem individual en un pedido
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// Define la estructura completa de un pedido
export interface Order {
  id: string;
  name: string;          // Nombre del cliente
  email: string;         // Email del cliente
  phone: string;         // Teléfono del cliente
  address: string;       // Dirección de envío
  productos: OrderItem[]; // Lista de productos en el pedido
  status: 'pending' | 'processing' | 'completed'; // Estado del pedido
  createdAt: string;     // Fecha de creación
  total: number;         // Total del pedido
}