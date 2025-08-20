import { useState, useRef, useEffect } from "react"
import { FaAward, FaDownload, FaGlasses, FaPen, FaTags, FaTshirt } from "react-icons/fa";

export default function OptionsList({
    options = [], 
    selected = [], 
    onChange, 
    multi = true,
}) {

    const handleSelect = (value) => {
        if (multi) {
            if (selected.includes(value)) {
                onChange(selected.filter((valueToRemove) => {
                    return valueToRemove !== value
                }))
            } else {
                onChange([...selected, value])
            } 
        } else {
            onChange([value])
        }
    }

    return (
        <div className="options-container">
            {options.map((option) => (
                <div 
                    className={`option-item ${selected.includes(option.value) ? "selected" : ""}`}
                    onClick={() => handleSelect(option.value)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            handleSelect(option.value)
                        }
                    }}
                  >
                    {/* This should be getting an icon from the db but it hasnt been set up, if have time will implement */}
                    <div className="icon-container">
                        {option.label === "Accessories" && <FaGlasses />}
                        {option.label === "Clothing" && <FaTshirt />}
                        {option.label === "Downloads" && <FaDownload />}
                        {option.label === "Limited Edition" && <FaAward />}
                        {option.label === "New Arrivals" && <FaTags />}
                        {option.label === "Stationery" && <FaPen />}
                    </div>
                    <p className="option-label">{option.label}</p>
                </div>
            ))}
        </div>
    )
}
