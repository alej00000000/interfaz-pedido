import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';
import { Order } from './types/order';
import { SearchBar } from './components/SearchBar';
import { StatusFilter } from './components/StatusFilter';
import { OrderCard } from './components/OrderCard';

function App() {
  // Estados para manejar los pedidos y filtros
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Efecto para cargar los pedidos desde Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "Pedidos");
      const orderSnapshot = await getDocs(ordersCollection);
      const ordersData = orderSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt || new Date().toISOString(),
        status: doc.data().status || 'pending'
      })) as Order[];
      // Ordenar pedidos por fecha de creación
      setOrders(ordersData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    };
    fetchOrders();
  }, []);

  // Función para actualizar el estado de un pedido
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const orderRef = doc(db, 'Pedidos', orderId);
    await updateDoc(orderRef, { status: newStatus });
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as Order['status'] } : order
    ));
  };

  // Filtrar pedidos según búsqueda y estado
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado del dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Manage and track all customer orders in one place</p>
        </div>

        {/* Controles de búsqueda y filtrado */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <SearchBar 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
          <StatusFilter
            filterStatus={filterStatus}
            isFilterOpen={isFilterOpen}
            onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
            onStatusSelect={(status) => {
              setFilterStatus(status);
              setIsFilterOpen(false);
            }}
          />
        </div>

        {/* Lista de pedidos */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <li key={order.id}>
                <OrderCard
                  order={order}
                  onStatusUpdate={updateOrderStatus}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;