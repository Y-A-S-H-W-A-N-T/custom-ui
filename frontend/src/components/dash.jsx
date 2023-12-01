import Radiobutton from "./Radiobutton"
import DropDown from "./dropdown"
import Footer from '../components/footer.jsx'
import Hero from './hero.jsx'
import Header from './header.jsx'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import Loading from "./loading"

const HeroPage = () => {

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
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        setUserPreferences((prevPreferences) => ({
          ...prevPreferences,
          name: res.data.username,
        }))
        setColors(res.data.pref);
      })
      .catch((err) => {
        console.log(err);
      });
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


  return (
    <>
      {loading && <Loading/>}
      {!loading && <div>
        <div className={`p-4 sm:ml-64 font-one`} style={{background: `linear-gradient(to top,${userPreferences.theme1},${userPreferences.theme2},${userPreferences.theme3})`}}>
          <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700`} style={{backgroundColor: userPreferences.headbg}}>
            <Header name={userPreferences.name} buttonbg={userPreferences.back} buttontext={userPreferences.text} headerLabel={userPreferences.headerLabel}/>
          </div>
          <Hero label={userPreferences.label} paraText={userPreferences.paraText}/>
          <div className="grid grid-cols-2 gap-4 mb-4 ">
              <div className="flex items-center flex-col justify-center rounded  h-28  ">
                <p className="lg:text-2xl">Gender</p>
                <p className=" flex   font-two lg:flex-row lg:text-sm sm:text-xs flex-col sm:text-clip sm:overflow-auto  text-black ">
                  <Radiobutton name="Red" radio={userPreferences.radio}/>
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
                    drop={userPreferences.drop}
                  />
                </p>
              </div>
            </div>
          <Footer footerColor={userPreferences.footbg} iconColor={userPreferences.iconColor}/>
        </div>
      </div>}
    </>
    
  );
};

export default HeroPage;