import { useState } from "react";
import "./App.css";
import BmiList from "./Components/BmiList";
import BmiScore from "./Components/BmiScore";
import Form from "./Components/Form";

function App() {
  const [changeWeight,setChangeWeight] =useState({weight:"",type:""})
  const [bmi, setBmi] = useState("00");
  const [bmiType, setBmiType] = useState("Chill Man We Got This");
  const [bmiRange,setBmiRange] =useState({
    underWeight: {low:""},
    normal:{low:"",heigh:""},
    overWeight: {low:"",heigh:""},
    obesityOne:{low:"",heigh:""},
    obesityTwo:{low:"",heigh:""},
    obesityThree:{heigh:""},

  })
  const onFormSub = (w,h) => {
    let b= calBmi(w,h)
    setBmi(b)
    
    setBmiType(overWeight(b))
    
    const range ={
      underWeight:{low:calWeight(18.5,h)},
      normal:{low:calWeight(18.9,h),heigh:calWeight(24.9,h)},
      overWeight:{low:calWeight(25,h),heigh:calWeight(29.9,h)},
      obesityOne:{low:calWeight(30,h),heigh:calWeight(34.9,h)},
      obesityTwo:{low:calWeight(35,h),heigh:calWeight(39.9,h)},
      obesityThree:{heigh:calWeight(40,h)},
    }
    setBmiRange(range)
    setChangeWeight(weigthChange(b,w,range))
  }
  const calBmi= (w,h)=> (w/(h*h)).toFixed(2)

  const calWeight =(b,h)=>(b*h*h).toFixed(2)

  const weigthChange =(b,w,range)=>{
    let weightChangeObj
    if(b > 24.9){
    weightChangeObj = {
      weight: (w-range.normal.heigh).toFixed(2),
      type: "positive"
    }
    return weightChangeObj
    }else if(bmi < 18.5){
      weightChangeObj = {
        weight: (w-range.normal.low).toFixed(2),
        type: "negative"
      
      }
      return weightChangeObj
    }else{
      weightChangeObj ={
        weight:0,
        type:"normal"
      }
      return weightChangeObj
    }

  }

  const overWeight =(bmi)=>{
    if (bmi < 18.5){
      return "underweight"
    }else if(18.5<bmi && bmi<24.9){
      return "Normal"
    }else if(24.9<bmi && bmi<29.9){
      return "Overweight"
    }else if(29.9<bmi && bmi<34.9){
      return "Obisity Class I"
    }else if(34.9<bmi && bmi<39.9){
      return "Obisity Class II"
    }else if (bmi>39.9){
      return "Obisity Class III"

    }
  }

  

  

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5 mx-2">
          <Form getData={onFormSub} />
        </div>
        <div className="row justify-conntent-center mt-5 ">
          <div className="col-12 col-sm-6 mb-5">
            <BmiScore bmiNo={bmi} bmiName={bmiType} changeWeight={changeWeight}/>
          </div>
          <div className="col-12 col-sm-6">
            <BmiList range={bmiRange} bmi={bmi}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
