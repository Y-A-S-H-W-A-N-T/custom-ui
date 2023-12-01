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

  const setPreferences = (property, value) => {
    setUserPreferences((prevPreferences) => ({ ...prevPreferences, [property]: value }));
  };
  
  const getColorInput = async (title, labels, properties) => {
    const { value: color } = await Swal.fire({
      title: title,
      html: labels.map((label, index) => `<p>${label}</p><input id="swal-input${index + 1}" type="color" value=${userPreferences[properties[index]]}>`).join(''),
      focusConfirm: false,
      preConfirm: () => labels.map((_, index) => document.getElementById(`swal-input${index + 1}`).value),
    });
  
    color.forEach((c, index) => {
      if (c) setPreferences(properties[index], c);
    });
  };
  
  const Fire = async (e, val) => {
    e.stopPropagation();
  
    if (val === 'header') {
      await getColorInput("Header", ["Text", "Background"], ["headerLabel", "headbg"]);
    }
  
    if (val === 'para') {
      await getColorInput("Header", ["Label", "Text"], ["label", "paraText"]);
    }
  
    if (val === 'theme') {
      await getColorInput("Theme", ["Top Color", "Center Color", "Bottom Color"], ["theme1", "theme2", "theme3"]);
    }

    if (val === 'icons') {
      await getColorInput("Icons", ["Icon Color"], ["iconColor"]);
    }

    if (val === 'button') {
      await getColorInput("Button", ["Text", "Background"], ["text", "back"]);
    }

    if (val === 'footer') {
      await getColorInput("Footer", ["Footer Color"], ["footbg"]);
    }

    if (val === 'radio') {
      await getColorInput("Radio", ["Radio Color"], ["radio"]);
    }

    if (val === 'dropdown') {
      await getColorInput("Dropdown", ["Drop Down Color"], ["drop"]);
    }

  };

  return (
    <>
      {loading && <Loading/>}
      {!loading && <div className={`p-4 sm:ml-64 font-one`} style={{background: `linear-gradient(to top,${userPreferences.theme1},${userPreferences.theme2},${userPreferences.theme3})`}} onClick={(e)=>Fire(e,'theme')}>
          <div className="">
            <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700`} style={{backgroundColor: userPreferences.headbg}} onClick={(e)=>Fire(e,'header')}>
              <Custom_Header name={userPreferences.name} buttonbg={userPreferences.back} buttontext={userPreferences.text} Fire={Fire} headerLabel={userPreferences.headerLabel}/>
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
          <div  onClick={(e)=>Fire(e,'footer')}>
            <Custom_Footer footerColor={userPreferences.footbg} iconColor={userPreferences.iconColor} Fire={Fire}/>
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
