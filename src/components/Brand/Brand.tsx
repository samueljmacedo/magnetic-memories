type BrandProps = {
    className?: string
}

const Brand = ({className = ''}: BrandProps) => {
    return (
        <a className={`brand ${className}`.trim()} href="#home" aria-label="Magnetic Memories home">
            <span className="brand-mark">mM.</span>
            <span>Magnetic <em>Memories</em></span>
        </a>
    );
}

export default Brand;
