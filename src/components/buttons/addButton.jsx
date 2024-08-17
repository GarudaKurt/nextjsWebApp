const AddButton = ({ children, bcolor, top, paddingX, paddingY, size }) => {
    const roundedClass = size ? `rounded-${size}` : "md"
    const marginTopClass = top ? `mt-${top}` : ""
    const paddingClassX = paddingX ? `${paddingX}` : "px-2"
    const paddingClassY = paddingY ? `${paddingY}` : "py-2"
  
    const styles = `${marginTopClass} ${paddingClassX} ${paddingClassY} ${roundedClass} font-bold text-white  transform transition-transform duration-300`;
  
    return (
      <button className={styles} style={{ backgroundColor: bcolor }}>
        {children}
      </button>
    );
  };
  
  export default AddButton;
