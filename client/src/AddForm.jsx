
import React, { useState, useEffect } from 'react';

function AddForm({ onSubmit, initialFormData }) {
    const [day, setDay] = useState(initialFormData ? initialFormData.day : '');
    const [title, setTitle] = useState(initialFormData ? initialFormData.title : '');
    const [actions, setActions] = useState(initialFormData ? initialFormData.actions : '');

    useEffect(() => {
        if (initialFormData) {
            setDay(initialFormData.day);
            setTitle(initialFormData.title);
            setActions(initialFormData.actions);
        }
    }, [initialFormData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { day, title, actions };
        onSubmit(formData);
    };

    return (
        <div className="add-form">
            <h2>{initialFormData ? 'Update Day' : 'Add New Day'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="actions">Actions:</label>
                    <textarea
                        id="actions"
                        value={actions}
                        onChange={(e) => setActions(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{initialFormData ? 'Update Day' : 'Add Day'}</button>
            </form>
        </div>
    );
}

export default AddForm;

