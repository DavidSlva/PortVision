// src/components/PortSelector.tsx
import React from "react";
import { Puerto } from "../store/slices/puertosSlice.tsx";

interface PortSelectorProps {
  ports: Puerto[];
  selectedPortId: number | null;
  onPortSelect: (id: number | null) => void;
  loading: boolean;
}

export const PortSelector: React.FC<PortSelectorProps> = ({
  ports,
  selectedPortId,
  onPortSelect,
  loading,
}) => {
  return (
    <div>
      <label
        htmlFor="port-select"
        className="block text-sm font-medium text-gray-700"
      >
        Seleccionar Puerto
      </label>
      {loading ? (
        <div className="mt-1 text-sm text-gray-500">Cargando puertos...</div>
      ) : (
        <select
          id="port-select"
          name="port-select"
          value={selectedPortId || ""}
          onChange={(e) => {
            const value = e.target.value;
            onPortSelect(value ? parseInt(value) : null);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {ports.map((port) => (
            <option key={port.codigo} value={port.codigo}>
              {port.nombre}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
