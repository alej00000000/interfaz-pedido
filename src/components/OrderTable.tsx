import React from 'react';
import { OrderItem } from '../types/order';

// Props para la tabla de productos del pedido
interface OrderTableProps {
  items: OrderItem[];
}

// Componente que muestra los productos de un pedido en formato tabla
export const OrderTable: React.FC<OrderTableProps> = ({ items }) => (
  <div className="flex flex-col">
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          {/* Tabla de productos */}
          <table className="min-w-full divide-y divide-gray-300">
            {/* Encabezados de la tabla */}
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            {/* Cuerpo de la tabla con los productos */}
            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{item.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${item.price.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);