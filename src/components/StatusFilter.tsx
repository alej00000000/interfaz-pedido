import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

// Props para el componente de filtro por estado
interface StatusFilterProps {
  filterStatus: string;
  isFilterOpen: boolean;
  onFilterToggle: () => void;
  onStatusSelect: (status: string) => void;
}

// Componente de filtro desplegable para estados de pedidos
export const StatusFilter: React.FC<StatusFilterProps> = ({
  filterStatus,
  isFilterOpen,
  onFilterToggle,
  onStatusSelect,
}) => (
  <div className="relative">
    {/* Botón para abrir/cerrar el menú de filtros */}
    <button
      onClick={onFilterToggle}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Filter className="h-4 w-4 mr-2" />
      Filter by Status
      <ChevronDown className="ml-2 h-4 w-4" />
    </button>

    {/* Menú desplegable de opciones de filtro */}
    {isFilterOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
        <div className="py-1" role="menu">
          {['all', 'pending', 'processing', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => onStatusSelect(status)}
              className={`block px-4 py-2 text-sm w-full text-left ${
                filterStatus === status ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } hover:bg-gray-100`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);