import {ChevronDown} from "lucide-react";
import "./FilterSelect.css";

export type FilterOption = {
    value: string
    label: string
}

type FilterSelectProps = {
    /** Small caption above the select; also its accessible name */
    label: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
    /** True when a real filter is chosen (not the "all" option): the pill is filled */
    active?: boolean
}

/** A themed native select, so it stays accessible and works well on phones. */
const FilterSelect = ({label, value, options, onChange, active = false}: FilterSelectProps) => {
    return (
        <label className={active ? 'filter-select filter-select-active' : 'filter-select'}>
            <span className="filter-select-label meta-label">{label}</span>
            <span className="filter-select-control">
                <select value={value} onChange={(event) => onChange(event.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <ChevronDown size={15} aria-hidden="true" />
            </span>
        </label>
    );
}

export default FilterSelect;
