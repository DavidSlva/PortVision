// src/components/VolumeTable.tsx

import React from 'react';

interface VolumeTableProps {
    data: {
        portId: number;
        portName: string;
        weekStart: string; // 'YYYY-MM-DD'
        cargoVolume: number;
    }[];
}

export const VolumeTable: React.FC<VolumeTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">ID del Puerto</th>
                    <th className="py-2 px-4 border-b">Nombre del Puerto</th>
                    <th className="py-2 px-4 border-b">Semana</th>
                    <th className="py-2 px-4 border-b">Volumen</th>
                </tr>
                </thead>
                <tbody>
                {data.map((volumen) => (
                    <tr key={`${volumen.portId}-${volumen.weekStart}`}>
                        <td className="py-2 px-4 border-b">{volumen.portId}</td>
                        <td className="py-2 px-4 border-b">{volumen.portName}</td>
                        <td className="py-2 px-4 border-b">{volumen.weekStart}</td>
                        <td className="py-2 px-4 border-b">{volumen.cargoVolume.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
