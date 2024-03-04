
import React, { useState } from 'react';

function AddForm() {
    const [day, setDay] = useState('');
    const [title, setTitle] = useState('');
    const [actions, setActions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDay = { day, title, actions };

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDay),
            });

            if (response.ok) {
                console.log('New day added successfully');
                // Optionally, you can handle success, such as showing a success message or redirecting
            } else {
                console.error('Failed to add new day');
                // Optionally, you can handle errors, such as showing an error message
            }
        } catch (error) {
            console.error('Error adding new day:', error);
            // Optionally, you can handle errors, such as showing an error message
        }
    };

    return (
        <div className="add-form">
            <h2>Add New Day</h2>
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
                <button type="submit">Add Day</button>
            </form>
        </div>
    );
}

export default AddForm;
