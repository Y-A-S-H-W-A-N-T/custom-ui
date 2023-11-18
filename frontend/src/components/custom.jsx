import React, { useEffect, useState } from "react";
import Radiobutton from "./Radiobutton"
import DropDown from "./dropdown"
import Footer from '../components/footer.jsx'
import Hero from '../components/hero'
import Header from "./header.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";
import Swal from 'sweetalert2'
import '../css/custom.css'

const Preference = (props) => {
  const { id } = useParams();

  const [name,setName] = useState('')
  
  const [text, setText] = useState("");
  const [back, setBack] = useState("");
  const [headbg, setHeadbg] = useState("");
  const [footbg, setFootbg] = useState("");
  const [radio, setRadio] = useState("");
  const [drop, setDrop] = useState("");
  const [theme1, setTheme1] = useState("");
  const [theme2, setTheme2] = useState("");
  const [theme3, setTheme3] = useState("");
  const [iconColor,setIconColor] = useState("")
  const [paraText,setParaText] = useState("")
  const [label,setLabel] = useState("")
  const [headerLabel,setHeaderLabel] = useState("")
  const [loading,setLoading] = useState(true)
  const [isAdmin,setIsAdmin] = useState(false)

  const startAlert = ()=>{
    Swal.fire({
      position: 'center',
      title: `Click on the element to edit.`,
      text: `NOTE : The changes will only reflect after hitting the 'Apply Changes' button.`,
    })
  }

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${id}`)
    .then((res)=>{
      setName(res.data.username)
      setIsAdmin(res.data.isAdmin)
      setColors(res.data.pref);
    })
    .catch((err)=>{
      console.log(err)
    })
    startAlert()
  },[])

  const setColors = (val)=>{
    if(val)
    {
      axios.get(`http://localhost:5000/user/${id}`)
      .then((res)=>{
          setText(res.data.textColor)
          setBack(res.data.buttonBackgroundColor)
          setHeadbg(res.data.headerBackgroundColor)
          setFootbg(res.data.footerBackgroundColor)
          setDrop(res.data.dropDownButtonColor)
          setRadio(res.data.radioButtonColor)
          setTheme1(res.data.themeColor1)
          setTheme2(res.data.themeColor2)
          setTheme3(res.data.themeColor3)
          setIconColor(res.data.iconColor)
          setLabel(res.data.label)
          setHeaderLabel(res.data.headerLabel)
          setParaText(res.data.paraText)
          setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else
    {
      axios.get(`http://localhost:5000/onlyColors`)
      .then((res)=>{
          setText(res.data.textColor)
          setBack(res.data.buttonBackgroundColor)
          setHeadbg(res.data.headerBackgroundColor)
          setFootbg(res.data.footerBackgroundColor)
          setDrop(res.data.dropDownButtonColor)
          setRadio(res.data.radioButtonColor)
          setTheme1(res.data.themeColor1)
          setTheme2(res.data.themeColor2)
          setTheme3(res.data.themeColor3)
          setIconColor(res.data.iconColor)
          setLabel(res.data.label)
          setHeaderLabel(res.data.headerLabel)
          setParaText(res.data.paraText)
          setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }


  const pref = true

  const ApplyChanges = (e) => {
    e.stopPropagation()
    var scope = 'colors'
    if(isAdmin)
    { 
      axios.post(`http://localhost:5000/changePref`)
      console.log("Changed by ADMIN")
      scope = 'onlyColors'
    }
    axios
      .post(`http://localhost:5000/${scope}`, {
        textColor: text,
        buttonbackgroundColor: back,
        headerBackgroundColor: headbg,
        footerBackgroundColor: footbg,
        radioButtonColor: radio,
        dropDownButtonColor: drop,
        themeColor1: theme1,
        themeColor2: theme2,
        themeColor3: theme3,
        iconColor: iconColor,
        headerLabel: headerLabel,
        paraText: paraText,
        label: label,
        userId: id,
        pref: pref
      })
      .then((res) => {
        props.showDash();
      })
      .catch((err) => {
        console.log("error in saving colors -> ", err);
      });
  }

  const Fire = async(e,val)=>{
    e.stopPropagation()
    if(val===1)
    {
      const { value: color } = await Swal.fire({
        title: "Header",
        html: `
          <p>Text</p>
          <input id="swal-input1" type="color" value=${headerLabel}>
          <p>Background</p>
          <input id="swal-input2" type="color" value=${headbg}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        }
      })
      if(color[0])
        setHeaderLabel(color[0])
      if(color[1])
        setHeadbg(color[1])
    }
    if(val==='para')
    {
      const { value: color } = await Swal.fire({
        title: "Header",
        html: `
          <p>Label</p>
          <input id="swal-input1" type="color" value=${label}>
          <p>Text</p>
          <input id="swal-input2" type="color" value=${paraText}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        }
      })
      if(color[0])
        setLabel(color[0])
      if(color[1])
        setParaText(color[1])
    }
    if(val==='dropdown')
    {
      const { value: color } = await Swal.fire({
        title: "DropDown",
        html: `
          <input id="swal-input1" type="color" value=${drop}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color)
        setDrop(color)
    }
    if(val==='radio')
    {
      const { value: color } = await Swal.fire({
        title: "Radio",
        html: `
          <input id="swal-input1" type="color" value=${radio}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color){
        setRadio(color)
      }
    }
    if(val===2)
    {
      const { value: color } = await Swal.fire({
        title: "Footer",
        html: `
          <input id="swal-input1" type="color" value=${footbg}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color){
        setFootbg(color)
      }
    }
    if(val===5)
    {
      const { value: color } = await Swal.fire({
        title: "Theme",
        html: `
          <p>Top Color</p>
          <input id="swal-input1" type="color" value=${theme1}>
          <p>Center Color</p>
          <input id="swal-input2" type="color" value=${theme2}>
          <p>Bottom Color</p>
          <input id="swal-input3" type="color" value=${theme3}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
            document.getElementById("swal-input3").value
          ]
        }
      })
      if(color[0])setTheme3(color[0])
      if(color[1])setTheme2(color[1])
      if(color[2])setTheme1(color[2])
    }
  }

  const InnerFire = async(e,val)=>{
    e.stopPropagation()
    if(val===3)
    {
      const { value: color } = await Swal.fire({
        title: "Button",
        html: `
          <p>Text</p>
          <input id="swal-input1" type="color" value=${text}>
          <p>Background</p>
          <input id="swal-input2" type="color" value=${back}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        }
      })
      if(color[0]){
        setText(color[0])
      }
      if(color[1]){
        setBack(color[1])
      }
    }
    if(val===4)
    {
      const { value: color } = await Swal.fire({
        title: "Icons",
        html: `
          <input id="swal-input1" type="color" value=${iconColor}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color)
      {
        setIconColor(color)
      }
    }
  }

  return (
    <>
      {loading && <Loading/>}
      {!loading && <div className={`p-4 sm:ml-64 font-one`} style={{background: `linear-gradient(to top,${theme1},${theme2},${theme3})`}} onClick={(e)=>Fire(e,5)}>
          <div className="">
            <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700`} style={{backgroundColor: headbg}} onClick={(e)=>Fire(e,1)}>
              <Header name={name} buttonbg={back} buttontext={text} InnerFire={InnerFire} headerLabel={headerLabel}/>
            </div>
          </div>
          <Hero Fire={Fire} label={label} paraText={paraText}/>
          <div className="grid grid-cols-2 gap-4 mb-4 ">
              <div className="flex items-center flex-col justify-center rounded  h-28 ">
                <div  onClick={(e)=>Fire(e,'radio')}>
                  <p className="lg:text-2xl flex items-center flex-col justify-center">Gender</p>
                  <p className=" flex font-two lg:flex-row lg:text-sm sm:text-xs flex-col sm:text-clip sm:overflow-auto  text-black ">
                    <Radiobutton name="Red" radio={radio}/>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded  h-28 ">
                <p className="lg:text-2xl">Country</p>
                <p className="lg:text-sm font-two text-black  flex flex-col "  onClick={(e)=>Fire(e,'dropdown')}>
                  <DropDown
                    name="Choose your country"
                    option1="India"
                    option2="Pakistan"
                    option3="Others"
                    drop={drop}
                  />
                </p>
              </div>
            </div>
          <div  onClick={(e)=>Fire(e,2)}>
            <Footer foot={footbg} iconColor={iconColor} Fire={Fire} InnerFire={InnerFire}/>
          </div>
          <div className="flex justify-center text-teal-600">
            <button 
              onClick={(e)=>ApplyChanges(e)}
              className="mt-8 rounded bg-indigo-600 px-12 py-3 text-sm text-white transition hover:bg-indigo-700"
            >Apply Changes</button>
          </div>
        </div>}
    </>
  );
};

export default Preference;
