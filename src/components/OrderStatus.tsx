import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

// Props para el componente OrderStatus
interface OrderStatusProps {
  status: string;
}

// Determina el color del badge según el estado del pedido
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';    // Amarillo para pendiente
    case 'processing': return 'bg-blue-100 text-blue-800';     // Azul para procesando
    case 'completed': return 'bg-green-100 text-green-800';    // Verde para completado
    default: return 'bg-gray-100 text-gray-800';              // Gris para otros estados
  }
};

// Selecciona el icono apropiado según el estado del pedido
export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <Clock className="w-4 h-4" />;      // Reloj para pendiente
    case 'processing': return <Truck className="w-4 h-4" />;   // Camión para procesando
    case 'completed': return <CheckCircle className="w-4 h-4" />; // Check para completado
    default: return <Package className="w-4 h-4" />;           // Paquete para otros estados
  }
};

// Componente que muestra el estado del pedido con icono y color correspondiente
export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(status)}`}>
    {getStatusIcon(status)}
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);