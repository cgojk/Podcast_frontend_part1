import { useState, useRef, useEffect } from "react"
import { FaCheck, FaChevronDown } from "react-icons/fa";

export default function StylisedDropdown({
    options = [], 
    selected = [], 
    onChange, 
    placeholder = "Select options",
    multi = true,
}) {

    const [open, setOpen] = useState(false);
    
    const dropdownRef = useRef(null)

    const toggleOpen = () => setOpen(!open);

    useEffect(() => {
        const handleCloseExternal = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("click", handleCloseExternal)
        return () => document.removeEventListener("click", handleCloseExternal)
    }, [])

    const handleSelect = (value) => {
        onChange(value)
        setOpen(false)
    }

    const displayText = 
    multi ? 
        selected.length > 0 ? 
            options.filter(optionToRemove => {
                return selected.includes(optionToRemove.value)
            })
            .map(option => option.label).join(", ") 
        : placeholder
    : options.find(option => option.value === selected)?.label || placeholder
    
    return (
        <div className="stylised-dropdown-container" ref={dropdownRef}>
            {/* DROPDOWN INPUT */}
            <button className={`dropdown-input ${open ? 'open' : ''}`} type="button" onClick={toggleOpen}>
                <p>{displayText}</p>
                 <FaChevronDown fontSize={12}/>
            </button>

            {/* DROPDOWN OPTIONS LIST */}
            {open && (
            <ul className="dropdown-menu">
            {options.map((option) => (
                <li 
                    key={option.index}
                    className={`dropdown-menu-item single-menu-item ${selected === option.value ? "selected" : ""}`}
                    onClick={() => handleSelect(option.value)} 
                    tabIndex={0} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleSelect(option.value)
                        } 
                    }}
                >
                   
                    {option.label}
                    {selected === option.value && <FaCheck fontSize={12} />}
            
        
                </li>
            ))}
            </ul>
        )}
        </div>
    )
}
