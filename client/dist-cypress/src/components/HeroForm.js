import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
const HeroForm = ({ hero, powers, onSave }) => {
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState();
    const { register, handleSubmit: handleReactHookFormSubmit, formState, } = useForm();
    const handleSubmit = handleReactHookFormSubmit((heroFormData) => {
        const newHero = {
            id: hero?.id,
            name: heroFormData.name,
            price: heroFormData.price,
            fans: heroFormData.fans,
            saves: heroFormData.saves,
            powers: heroFormData.powers.map(x => Number(x)),
        };
        onSave(newHero, file);
    });
    const handleFileChange = (event) => {
        const newFile = event.target.files && event.target.files[0];
        if (newFile) {
            setFile(newFile);
            const reader = new FileReader();
            reader.readAsDataURL(newFile);
            reader.onload = () => {
                setImageUrl(reader.result);
            };
        }
    };
    return (_jsxs("form", { noValidate: true, className: "flex flex-col gap-4", onSubmit: handleSubmit, children: [_jsx(InputField, { label: "Name", defaultValue: hero?.name, type: "text", "data-cy": "nameInput", errorMessage: formState.errors.name?.message, ...register('name', {
                    required: 'Name is required',
                }) }), _jsx(InputField, { label: "Price", defaultValue: hero?.price, type: "number", "data-cy": "priceInput", errorMessage: formState.errors.price?.message, ...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                }) }), _jsx(InputField, { label: "Fans", defaultValue: hero?.fans, type: "number", "data-cy": "fansInput", errorMessage: formState.errors.fans?.message, ...register('fans', {
                    required: 'Fans is required',
                    valueAsNumber: true,
                }) }), _jsx(InputField, { label: "Saves", defaultValue: hero?.saves, type: "number", "data-cy": "savesInput", errorMessage: formState.errors.saves?.message, ...register('saves', {
                    required: 'Saves is required',
                    valueAsNumber: true,
                }) }), _jsx(SelectField, { defaultValue: hero?.powers.map((i) => i.id.toString()), label: "Powers", multiple: true, size: 6, "data-cy": "powersSelect", errorMessage: formState.errors.powers?.message, ...register('powers', {
                    required: 'Powers is required',
                    valueAsNumber: true,
                }), children: powers.map((power, i) => (_jsx("option", { value: power.id, children: power.name }, i))) }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 text-sm font-medium text-gray-500", children: "Avatar" }), _jsxs("div", { className: "border border-dashed border-gray-500 relative block max-w-sm", children: [_jsx("input", { accept: "image/*", type: "file", id: "avatar", "data-cy": "avatarFile", className: "cursor-pointer absolute block opacity-0 top-0 right-0 left-0 z-50 w-full h-full", onChange: handleFileChange }), imageUrl ? (_jsx("img", { src: imageUrl })) : (_jsxs("div", { className: "text-center p-10 w-full h-full", children: [_jsxs("h4", { children: ["Drop image here", _jsx("br", {}), "or"] }), _jsx("p", { className: "", children: "Select image" })] }))] })] }), _jsx(Button, { className: "max-w-[100px]", children: "Submit" })] }));
};
export default HeroForm;
