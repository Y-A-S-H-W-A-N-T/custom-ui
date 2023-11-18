

const Label = (props) => {
    var a =props.name
  return (
    <div>
      <label className="flex flex-row ml-1">
                  {a}
                  <div className=
                  " m-0 ml-2 p-0  h-5 w-4 bg-${a}-300">
                  </div>
                  </label>
    </div>
  )
}

export default Label
