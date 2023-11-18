import Radiobutton from "./Radiobutton"
import DropDown from "./dropdown"
import Footer from '../components/footer.jsx'
import Hero from '../components/hero'
import Header from '../components/header.jsx'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import Loading from "./loading"

const HeroPage = () => {

  const { id } = useParams()
  const [name,setName] = useState('')
  const [loading,setLoading] = useState(true)

  const [buttonbg,setButtonbg] = useState('')
  const [buttontext,setButtontext] = useState('')

  const [header,setHeader] = useState('')
  const [footer,setFooter] = useState('')
  const [dropdown,setDropdown] = useState('')
  const [radio,setRadio] = useState('')
  const [theme1,setTheme1] = useState('')
  const [theme2,setTheme2] = useState('')
  const [theme3,setTheme3] = useState('')
  const [iconColor,setIconColor] = useState('')
  const [headerLabel,setHeaderLabel] = useState('')
  const [label,setLabel] = useState('')
  const [paraText,setParaText] = useState('')

  useEffect(()=>{
    axios.get(`http://localhost:5000/user/${id}`)
    .then((res)=>{
      setName(res.data.username)
      setColors(res.data.pref);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const setColors = (val)=>{
    if(val)
    {
      axios.get(`http://localhost:5000/user/${id}`)
      .then((res)=>{
        changeUI(
          res.data.textColor,res.data.buttonBackgroundColor,
          res.data.headerBackgroundColor,res.data.footerBackgroundColor,
          res.data.dropDownButtonColor,res.data.radioButtonColor,res.data.themeColor1,
          res.data.themeColor2,res.data.themeColor3,res.data.iconColor,
          res.data.headerLabel,res.data.label,res.data.paraText
          )
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
        changeUI(
          res.data.textColor,res.data.buttonBackgroundColor,
          res.data.headerBackgroundColor,res.data.footerBackgroundColor,
          res.data.dropDownButtonColor,res.data.radioButtonColor,res.data.themeColor1,
          res.data.themeColor2,res.data.themeColor3,res.data.iconColor,
          res.data.headerLabel,res.data.label,res.data.paraText
          )
          setLoading(false)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  const changeUI = (textcolor,backcolor,header,footer,drop,radio,theme1,theme2,theme3,iconColor,headerLabel,label,paraText)=>{
    setButtonbg(backcolor),setButtontext(textcolor),setHeader(header),setFooter(footer)
    setDropdown(drop),setRadio(radio),setTheme1(`${theme1}`),setTheme2(`${theme2}`),setTheme3(`${theme3}`)
    setIconColor(iconColor),setHeaderLabel(headerLabel),setLabel(label),setParaText(paraText)
  }


  return (
    <>
      {loading && <Loading/>}
      {!loading && <div>
        <div className={`p-4 sm:ml-64 font-one`} style={{background: `linear-gradient(to top,${theme1},${theme2},${theme3})`}}>
          <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700`} style={{backgroundColor: header}}>
            <Header name={name} buttonbg={buttonbg} buttontext={buttontext} headerLabel={headerLabel}/>
          </div>
          <Hero label={label} paraText={paraText}/>
          <div className="grid grid-cols-2 gap-4 mb-4 ">
              <div className="flex items-center flex-col justify-center rounded  h-28  ">
                <p className="lg:text-2xl">Gender</p>
                <p className=" flex   font-two lg:flex-row lg:text-sm sm:text-xs flex-col sm:text-clip sm:overflow-auto  text-black ">
                  <Radiobutton name="Red" radio={radio}/>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center rounded  h-28 ">
                <p className="lg:text-2xl">Country</p>
                <p className="lg:text-sm font-two text-black  flex flex-col ">
                  <DropDown
                    name="Choose your country"
                    option1="India"
                    option2="Pakistan"
                    option3="Others"
                    drop={dropdown}
                  />
                </p>
              </div>
            </div>
          <Footer foot={footer} iconColor={iconColor}/>
        </div>
      </div>}
    </>
    
  );
};

export default HeroPage;