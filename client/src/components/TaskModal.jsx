import React from 'react'

export default function TaskModal({handleSubmit,title,onChange}) {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h2 className="text-2xl">Ajouter une nouvelle tâche</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <button type="button"
                        onClick={() => document.getElementById('my_modal_3').close()}
                        className=" btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <input
                        required
                        value={title}
                        placeholder="Saisir le nom de la tâche..."
                        type="text"
                        onChange={onChange}
                        className="input input-primary w-full mt-5" />
                    <button className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </dialog>
    )
}
