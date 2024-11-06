import React from 'react';
import { Order } from '../types/order';
import { OrderStatus } from './OrderStatus';
import { OrderTable } from './OrderTable';

// Props para la tarjeta de pedido
interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

// Componente que muestra toda la información de un pedido
export const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusUpdate }) => (
  <div className="px-4 py-4 sm:px-6">
    {/* Encabezado de la tarjeta con información básica */}
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <p className="text-sm font-medium text-blue-600 truncate">Order #{order.id.slice(0, 8)}</p>
          <div className="ml-4">
            <OrderStatus status={order.status} />
          </div>
        </div>
        {/* Información del cliente */}
        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <p className="truncate">{order.name} • {order.email}</p>
          </div>
        </div>
      </div>
      {/* Total del pedido y selector de estado */}
      <div className="ml-6 flex-shrink-0 flex items-center gap-4">
        <p className="text-sm font-medium text-gray-900">
          ${order.productos.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
        </p>
        <select
          value={order.status}
          onChange={(e) => onStatusUpdate(order.id, e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
    
    {/* Tabla de productos del pedido */}
    <div className="mt-4">
      <OrderTable items={order.productos} />
    </div>

    {/* Información de envío */}
    <div className="mt-4 text-sm text-gray-500">
      <p>Shipping Address: {order.address}</p>
      <p>Phone: {order.phone}</p>
    </div>
  </div>
);