const Radiobutton = (props) => {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input className="p-2 " type="radio" name='Male' style={{backgroundColor: props.radio}}/> Male
        <input className="p-2" type="radio"  name='Female' style={{backgroundColor: props.radio}}/>Female
        <input className="p-2" type="radio"  name='Female' style={{backgroundColor: props.radio}}/>Others
      </div>
    </div>
  );
};

export default Radiobutton;
