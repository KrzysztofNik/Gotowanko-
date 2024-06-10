const InfoHeader = ({children, color, fontSize}) => {
    return (
        <header className={`w-full text-center text-[1.75rem] px-5 mt-10 font-semibold text-${color ? color : "main-text"}`}>
            {children}
        </header>
    );
}

export default InfoHeader;