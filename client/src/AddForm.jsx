
import React, { useState, useEffect } from 'react';
import Joi from 'joi';

function AddForm({ onSubmit, initialFormData }) {
    const [day, setDay] = useState(initialFormData ? initialFormData.day : '');
    const [title, setTitle] = useState(initialFormData ? initialFormData.title : '');
    const [actions, setActions] = useState(initialFormData ? initialFormData.actions : '');
    const [createdBy, setCreatedBy] = useState(initialFormData ? initialFormData.createdBy : ''); // State for createdBy
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialFormData) {
            setDay(initialFormData.day);
            setTitle(initialFormData.title);
            setActions(initialFormData.actions);
            setCreatedBy(initialFormData.createdBy); // Set createdBy if initialFormData exists
        }
    }, [initialFormData]);

    const schema = Joi.object({
        title: Joi.string().min(4).required().label('Title'),
        actions: Joi.string().required().label('Actions'),
        createdBy: Joi.string().required().label('Created By'), // Adding createdBy to the schema
    });

    const validate = () => {
        const result = schema.validate({ title, actions, createdBy }, { abortEarly: false, allowUnknown: true });
        if (!result.error) return null;

        const newErrors = {};
        for (let item of result.error.details) {
            newErrors[item.path[0]] = item.message;
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }

        const formData = { day, title, actions, createdBy }; // Include createdBy in formData
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
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="actions">Actions:</label>
                    <textarea
                        id="actions"
                        value={actions}
                        onChange={(e) => setActions(e.target.value)}
                        required
                    />
                    {errors.actions && <p className="error">{errors.actions}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="createdBy">Created By:</label>
                    <input
                        type="text"
                        id="createdBy"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)} // Update createdBy state
                        required
                    />
                    {errors.createdBy && <p className="error">{errors.createdBy}</p>}
                </div>

                <button type="submit">{initialFormData ? 'Update Day' : 'Add Day'}</button>
            </form>
        </div>
    );
}

export default AddForm;

