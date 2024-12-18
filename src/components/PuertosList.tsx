import {Puerto} from "../store/slices/puertosSlice.tsx";

interface PuertosListProps {
    puertos: Puerto[];
    loading: boolean;
    error: string | null;
    // onEdit: (puerto: Puerto) => void;
}

export const PuertosList: React.FC<PuertosListProps> = ({ puertos, loading, error }) => {
    // const dispatch = useDispatch();
    //
    // const handleDelete = (id: number) => {
    //     if (window.confirm('¿Estás seguro de eliminar este puerto? Esto también eliminará todos sus muelles.')) {
    //         dispatch(deletePuerto(id));
    //     }
    // };

    if (loading) {
        return <div>Cargando puertos...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-4">
            {puertos.map((puerto) => (
                <div key={puerto.codigo} className="border rounded p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h2 className="text-xl font-semibold">{puerto.nombre}</h2>
                            {/*<p className="text-sm text-gray-600">{puerto.tipo || 'Sin descripción'}</p>*/}
                        </div>
                        <div className="space-x-2">
                            {/*<button*/}
                            {/*    onClick={() => onEdit(puerto)}*/}
                            {/*    className="bg-yellow-500 text-white px-3 py-1 rounded"*/}
                            {/*>*/}
                            {/*    Editar*/}
                            {/*</button>*/}
                            {/*<button*/}
                            {/*    onClick={() => handleDelete(puerto.id)}*/}
                            {/*    className="bg-red-500 text-white px-3 py-1 rounded"*/}
                            {/*>*/}
                            {/*    Eliminar*/}
                            {/*</button>*/}
                        </div>
                    </div>
                    {/*<MuellesList puertoId={puerto.id} />*/}
                </div>
            ))}
        </div>
    );
};