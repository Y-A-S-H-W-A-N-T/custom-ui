const Radiobutton = (props) => {

  const radioColor = props.radio

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input className="p-4 " type="radio" name='gender' style={{accentColor: radioColor}}/><p>MALE</p>
        <input className="p-4" type="radio"  name='gender' style={{accentColor: radioColor}}/><p>FEMALE</p>
        <input className="p-4" type="radio"  name='gender' style={{accentColor: radioColor}}/><p>OTHERS</p>
      </div>
    </div>
  );
};

export default Radiobutton;
