function Form({type,name,labelText,value,onChange}){
    return(
        <div className="form-container">
            <label htmlFor="name">{labelText || name}</label>
            <input type={type} name={name} id={name} value={value} onChange={onChange} required></input>
        </div>
    )
};

export default Form;