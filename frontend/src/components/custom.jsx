import React, { useEffect, useState } from "react";
import Radiobutton from "./Radiobutton"
import DropDown from "./dropdown"
import Custom_Footer from '../components/custom_footer.jsx'
import Custom_Hero from './custom_hero.jsx'
import Custom_Header from "./custom_header.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./loading";
import Swal from 'sweetalert2'
import '../css/custom.css'

const Preference = (props) => {
  const { id } = useParams();

  const [userPreferences, setUserPreferences] = useState({
    name: "",
    text: "",
    back: "",
    headbg: "",
    footbg: "",
    radio: "",
    drop: "",
    theme1: "",
    theme2: "",
    theme3: "",
    iconColor: "",
    paraText: "",
    label: "",
    headerLabel: "",
  });

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const startAlert = () => {
    Swal.fire({
      position: "center",
      title: `Click on the element to edit.`,
      text: `NOTE : The changes will only reflect after hitting the 'Apply Changes' button.`,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          name: res.data.username,
        }));
        setIsAdmin(res.data.isAdmin)
        setColors(res.data.pref);
      })
      .catch((err) => {
        console.log(err);
      });
    startAlert();
  }, []);

  const setColors = (val) => {
    const endpoint = val ? `http://localhost:5000/user/${id}` : `http://localhost:5000/onlyColors`;
    axios
      .get(endpoint)
      .then((res) => {
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          text: res.data.textColor,
          back: res.data.buttonBackgroundColor,
          headbg: res.data.headerBackgroundColor,
          footbg: res.data.footerBackgroundColor,
          drop: res.data.dropDownButtonColor,
          radio: res.data.radioButtonColor,
          theme1: res.data.themeColor1,
          theme2: res.data.themeColor2,
          theme3: res.data.themeColor3,
          iconColor: res.data.iconColor,
          label: res.data.label,
          headerLabel: res.data.headerLabel,
          paraText: res.data.paraText,
        }))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const pref =true

  const ApplyChanges = (e) => {
    e.stopPropagation()
    let scope = 'colors'
    if(isAdmin)
    { 
      axios.post(`http://localhost:5000/changePref`)
      console.log("Changed by ADMIN")
      scope = 'onlyColors'
    }
    axios
      .post(`http://localhost:5000/${scope}`, {
        textColor: userPreferences.text,
        buttonbackgroundColor: userPreferences.back,
        headerBackgroundColor: userPreferences.headbg,
        footerBackgroundColor: userPreferences.footbg,  
        radioButtonColor: userPreferences.radio,
        dropDownButtonColor: userPreferences.drop,
        themeColor1: userPreferences.theme1,
        themeColor2: userPreferences.theme2,
        themeColor3: userPreferences.theme3,
        iconColor: userPreferences.iconColor,
        headerLabel: userPreferences.headerLabel,
        paraText: userPreferences.paraText,
        label: userPreferences.label,
        userId: id,
        pref: pref
      })
      .then(() => {
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
          <input id="swal-input1" type="color" value=${userPreferences.headerLabel}>
          <p>Background</p>
          <input id="swal-input2" type="color" value=${userPreferences.headbg}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        }
      })
      if(color[0])setUserPreferences((prevPreferences) => ({...prevPreferences,headerLabel: color[0]}))
      if(color[1])setUserPreferences((prevPreferences) => ({...prevPreferences,headbg: color[1]}))
    }
    if(val==='para')
    {
      const { value: color } = await Swal.fire({
        title: "Header",
        html: `
          <p>Label</p>
          <input id="swal-input1" type="color" value=${userPreferences.label}>
          <p>Text</p>
          <input id="swal-input2" type="color" value=${userPreferences.paraText}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        }
      })
      if(color[0])setUserPreferences((prevPreferences) => ({...prevPreferences,label: color[0]}))
      if(color[1])setUserPreferences((prevPreferences) => ({...prevPreferences,paraText: color[1]}))
    }
    if(val==='dropdown')
    {
      const { value: color } = await Swal.fire({
        title: "DropDown",
        html: `
          <input id="swal-input1" type="color" value=${userPreferences.drop}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color)
      setUserPreferences((prevPreferences) => ({...prevPreferences,drop: color}))
    }
    if(val==='radio')
    {
      const { value: color } = await Swal.fire({
        title: "Radio",
        html: `
          <input id="swal-input1" type="color" value=${userPreferences.radio}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color){
        setUserPreferences((prevPreferences) => ({...prevPreferences,radio: color}))
      }
    }
    if(val===2)
    {
      const { value: color } = await Swal.fire({
        title: "Footer",
        html: `
          <input id="swal-input1" type="color" value=${userPreferences.footbg}>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return (
            document.getElementById("swal-input1").value
          )
        }
      })
      if(color){
        setUserPreferences((prevPreferences) => ({...prevPreferences,footbg: color}))
      }
    }
    if(val===5)
    {
      const { value: color } = await Swal.fire({
        title: "Theme",
        html: `
          <p>Top Color</p>
          <input id="swal-input1" type="color" value=${userPreferences.theme1}>
          <p>Center Color</p>
          <input id="swal-input2" type="color" value=${userPreferences.theme2}>
          <p>Bottom Color</p>
          <input id="swal-input3" type="color" value=${userPreferences.theme3}>
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
      if(color[0])setUserPreferences((prevPreferences) => ({...prevPreferences,theme3: color[0]}))
      if(color[1])setUserPreferences((prevPreferences) => ({...prevPreferences,theme2: color[1]}))
      if(color[2])setUserPreferences((prevPreferences) => ({...prevPreferences,theme1: color[2]}))
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
          <input id="swal-input1" type="color" value=${userPreferences.text}>
          <p>Background</p>
          <input id="swal-input2" type="color" value=${userPreferences.back}>
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
        setUserPreferences((prevPreferences) => ({...prevPreferences,text: color[0]}))
      }
      if(color[1]){
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          back: color[1]
        }))
      }
    }
    if(val===4)
    {
      const { value: color } = await Swal.fire({
        title: "Icons",
        html: `
          <input id="swal-input1" type="color" value=${userPreferences.iconColor}>
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
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          iconColor: color
        }))
      }
    }
  }

  return (
    <>
      {loading && <Loading/>}
      {!loading && <div className={`p-4 sm:ml-64 font-one`} style={{background: `linear-gradient(to top,${userPreferences.theme1},${userPreferences.theme2},${userPreferences.theme3})`}} onClick={(e)=>Fire(e,5)}>
          <div className="">
            <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700`} style={{backgroundColor: userPreferences.headbg}} onClick={(e)=>Fire(e,1)}>
              <Custom_Header name={userPreferences.name} buttonbg={userPreferences.back} buttontext={userPreferences.text} InnerFire={InnerFire} headerLabel={userPreferences.headerLabel}/>
            </div>
          </div>
          <Custom_Hero Fire={Fire} label={userPreferences.label} paraText={userPreferences.paraText}/>
          <div className="grid grid-cols-2 gap-4 mb-4 ">
              <div className="flex items-center flex-col justify-center rounded  h-28 ">
                <div  onClick={(e)=>Fire(e,'radio')}>
                  <p className="lg:text-2xl flex items-center flex-col justify-center">Gender</p>
                  <p className=" flex font-two lg:flex-row lg:text-sm sm:text-xs flex-col sm:text-clip sm:overflow-auto  text-black ">
                    <Radiobutton name="Red" radio={userPreferences.radio}/>
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
                    drop={userPreferences.drop}
                  />
                </p>
              </div>
            </div>
          <div  onClick={(e)=>Fire(e,2)}>
            <Custom_Footer footerColor={userPreferences.footbg} iconColor={userPreferences.iconColor} Fire={Fire} InnerFire={InnerFire}/>
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
