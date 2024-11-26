function Button({type, onClick, text, className}) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}>{text}
        </button>
    )
}

export default Button;