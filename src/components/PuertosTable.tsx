import {Table} from "antd";
import {Puerto} from "../store/slices/puertosSlice.tsx";
interface PuertosTableProps {
    puertos: Puerto[];
    loading: boolean;
    error: string | null;
}
const PuertosTable = ({ puertos, loading, error }: PuertosTableProps) => {
    if (loading) {
        return <div>Cargando puertos...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-4">
            <Table bordered dataSource={puertos} rowKey="codigo" columns={[
                {
                    title: 'Código',
                    dataIndex: 'codigo',
                    key: 'codigo',
                },
                {
                    title: 'Nombre',
                    dataIndex: 'nombre',
                    key: 'nombre',
                },
                {
                    title: 'Tipo',
                    dataIndex: 'tipo',
                    key: 'tipo',
                },
                {
                    title: 'Pais',
                    dataIndex: 'pais',
                    key: 'pais',
                },
                {
                    title: 'Latitud',
                    dataIndex: 'latitud',
                    key: 'latitud',
                },
                {
                    title: 'Longitud',
                    dataIndex: 'longitud',
                    key: 'longitud',
                },
                {
                    title: 'Zona Geográfica',
                    dataIndex: 'zona_geografica',
                    key: 'zona_geografica',
                },
            ]} />
            {/*{puertos.map((puerto) => (*/}
            {/*    <div key={puerto.codigo} className="border rounded p-4 bg-gray-50">*/}
            {/*        <div className="flex justify-between items-center mb-2">*/}
            {/*            <div>*/}
            {/*                <h2 className="text-xl font-semibold">{puerto.nombre}</h2>*/}
            {/*                /!*<p className="text-sm text-gray-600">{puerto.tipo || 'Sin descripción'}</p>*!/*/}
            {/*            </div>*/}
            {/*            <div className="space-x-2">*/}
            {/*                /!*<button*!/*/}
            {/*                /!*    onClick={() => onEdit(puerto)}*!/*/}
            {/*                /!*    className="bg-yellow-500 text-white px-3 py-1 rounded"*!/*/}
            {/*                /!*>*!/*/}
            {/*                /!*    Editar*!/*/}
            {/*                /!*</button>*!/*/}
            {/*                /!*<button*!/*/}
            {/*                /!*    onClick={() => handleDelete(puerto.id)}*!/*/}
            {/*                /!*    className="bg-red-500 text-white px-3 py-1 rounded"*!/*/}
            {/*                /!*>*!/*/}
            {/*                /!*    Eliminar*!/*/}
            {/*                /!*</button>*!/*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        /!*<MuellesList puertoId={puerto.id} />*!/*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
}

export default PuertosTable;