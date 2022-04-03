import React, { Component } from 'react'

/**
 * Return the form object.
 * Tutorial: https://www.youtube.com/watch?v=8KuVE5JN8JQ
 * React docs: https://reactjs.org/docs/forms.html
 * @param  {function} onSubmit - Callback function to be called when form is submitted.
 * @param  {string} className - Class name to be added to the form.
 * @param  {any} children - Children of the form.
 */
export const Form = ({ onSubmit, className, children }) => {
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    );
};

/**
 * Return the field text object.
 * @param  {string} label - Label of the field.
 * @param  {any} value - Value of the field.
 * @param  {string} placeholder - Placeholder of the field.
 * @param  {string} name - Name of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 */
export const FieldTextBox = ({ label, value, placeholder = "", type = "text", name, onChange, required = false }) => {
    return (
        <div className="w-full">
            <label className="pl-2 font-medium">{label}
                <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" required={required}></input>
            </label>
        </div>
    );
};

/**
 * Return the field date object.
 * @param  {string} label - Label of the field.
 * @param  {Date} value - Value of the field.
 * @param  {string} placeholder - Placeholder of the field.
 * @param  {string} name - Name of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 */
export const FieldDateBox = ({ label, value, placeholder = "", name, onChange }) => {
    return (
        <div className="w-full">
            <label className="mx-2 font-medium">{label}
                <input type="date" value={value} onChange={onChange} name={name} placeholder={placeholder} className="mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi" ></input>
            </label>
        </div>
    );
};

// TODO LUCAS: Resolver bug checkbox en formulario.
/**
 * Return the field checkbox object.
 * @param  {string} label - Label of the field.
 * @param  {string} name - Name of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 */
export const FieldCheckBox = ({ label, name, onChange, checked = false }) => {
    return (
        <div className="w-full mx-2 my-2 ">
            <label className="font-medium">{label}
                <input type="checkbox" name={name} onChange={onChange} checked={checked} className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-bondi checked:border-blue-bondi focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" ></input>
            </label>
        </div>

    );
};

/**
 * @param  {Object} options - Options to be added to the select.
 * @param  {any} value - Value of the field.
 * @param  {function} onChange - Callback function to be called when field is changed.
 * @param  {string} name - Name of the field.
 * @param  {string} label - Label of the field.
 */
export const FieldSelectorBox = ({ options, value, onChange, name, label = "", multiple = false, required = false }) => {
    return (
        <div className="w-full mx-2 my-2">
            <label className="font-medium">{label}
                <select multiple={multiple} value={value} onChange={onChange} name={name} className="form-select appearance-none
                    w-full
                    text-base
                    font-normal
                    text-black
                    bg-gray-200 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    focus:text-black focus:bg-white focus:border-blue-bondi focus:outline-none" aria-label="Default select example"
                    required={required}>

                    {options.map(option => (<option className='bg-gray-200' key={option.value} value={option.value}>{option.label}</option>))}
                </select>
            </label>
        </div>
    );
};