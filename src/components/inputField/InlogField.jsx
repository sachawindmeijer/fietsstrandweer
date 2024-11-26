function InlogField({type, id, register, placeholder}) {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register}

        />
    )
}


export default InlogField;