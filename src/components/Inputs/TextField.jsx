import { forwardRef} from "react"


function TextField({value, onChange, placeholder = "Search ...", leadingIcon, trailingIcon, onTrailingClick, width}, ref ) {

    return (
        <div className="search-container" style={{width: `${width}`}}>
            {leadingIcon && <span className="leading-icon">{leadingIcon}</span>}

            <input 
                ref={ref}
                className="search-field"
                type="text" 
                value = {value}
                placeholder={placeholder}
                onChange={ e => onChange(e.target.value)}
            />

            {value !== "" && (
                onTrailingClick ? (
                    <button className="trailing-icon" onClick={onTrailingClick}>{trailingIcon}</button>
                ) : (
                    <span className="trailing-icon">{trailingIcon}</span>
                )
            )}

        </div>
    )
}

export default forwardRef(TextField)
