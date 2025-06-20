// Composant pour afficher la modal d'ajout ou de modification d'une tâche
export default function TaskModal({
    handleSubmit,       // Fonction appelée à la soumission du formulaire
    title,              // Valeur du champ de titre
    onChangeTitle,      // Fonction pour mettre à jour le titre
    headline,           // Titre affiché dans la modal (ajout ou modification)
    isChecked,          // État de la case à cocher (statut de la tâche)
    onChangeStatus,     // Fonction pour mettre à jour le statut
    isEdit              // Booléen indiquant si c'est une modification
}) {
    return (
        // Élément <dialog> HTML5 pour la modal
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                {/* Titre de la modal */}
                <h2 className="text-2xl">{headline}</h2>

                {/* Formulaire de la tâche */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    
                    {/* Bouton pour fermer la modal */}
                    <button
                        type="button"
                        onClick={() => document.getElementById('my_modal_3').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>

                    {/* Champ de saisie pour le titre de la tâche */}
                    <div className="flex gap-5 items-center justify-center">

                        <input
                            required
                            value={title}
                            placeholder="Saisir le nom de la tâche..."
                            type="text"
                            onChange={onChangeTitle}
                            className="input input-primary w-full"
                        />

                        {/* Case à cocher visible uniquement en mode édition */}
                        {isEdit && (
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={onChangeStatus}
                                className="checkbox checkbox-primary"
                            />
                        )}
                    </div>

                    {/* Bouton pour valider le formulaire */}
                    <button className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </dialog>
    );
}
