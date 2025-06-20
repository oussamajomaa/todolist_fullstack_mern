import { BsTrash2 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

// Composant pour afficher une tâche individuelle dans la liste
export default function Item({ task, handleDelete, handleUpdate }) {
    return (
        // Conteneur de l'élément de tâche avec un style de ligne
        <div className="flex justify-between items-center gap-3 py-1 border-b">

            {/* Titre de la tâche */}
            <p>{task.title}</p>


            {/* Boutons d'action : supprimer et modifier */}
            <div className="flex items-center gap-3">
                {/* Case à cocher pour indiquer le statut (terminée ou non), en lecture seule */}
                <input type="checkbox" className="checkbox" checked={task.status} readOnly />

                {/* Bouton pour supprimer la tâche */}
                <button className="btn btn-square" onClick={handleDelete}>
                    <BsTrash2 size={24} color="red" />
                </button>

                {/* Bouton pour modifier la tâche */}
                <button className="btn btn-square" onClick={handleUpdate}>
                    <FiEdit size={24} color="green" />
                </button>
            </div>
        </div>
    );
}
