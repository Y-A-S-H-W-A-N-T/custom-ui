const Radiobutton = (props) => {

  const radioColor = props.radio

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input className="p-2 " type="radio" name='Male' style={{backgroundColor: radioColor}}/><p>MALE</p>
        <input className="p-2" type="radio"  name='Female' style={{backgroundColor: radioColor}}/><p>FEMALE</p>
        <input className="p-2" type="radio"  name='Female' style={{backgroundColor: radioColor}}/><p>OTHERS</p>
      </div>
    </div>
  );
};

export default Radiobutton;
