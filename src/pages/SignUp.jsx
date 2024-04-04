import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import {Navigate,useNavigate}  from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


export default function SignUp(){
  const[showPassword,setShowPassword]=useState(false);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser)
       navigate("/")
  });

    return<Container>
        <BackgroundImage/>
        <div className="content">
        <Header login/>
        <div className=" body flex  column a-center j-center">
<div className="text flex column">
<h1>Enjoy unlimited movies ,TV shows and more</h1>
<h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
</div>
<div className="form">
<input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
               {showPassword && (
               <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                />
               )}
                {!showPassword && (
               <button onClick={() => setShowPassword(true)}>Get Started</button>
               )}
                
                </div>
                <button onClick={handleSignIn}>Sign Up</button>
        </div>
       </div>
   </Container>;
    
    }
const Container=styled.div`
position: relative;
.content{
 position: absolute;
 top: 0;
 left: 0;
 background-color: rgb(0, 0, 0, 0.5);
 height: 100vh;
 width: 100vw;
 display: grid;
 grid-template-row: 15vh 85vh;

 .body{
   gap: 1rem;
 .text{
   gap: 1rem;
   text-align: center;
   font-size: 1.5rem;
   h1{
     padding: 0 20rem;
   }
 }
 .form {
  display:grid;
  grid-template-coulmns:${({ showPassword }) =>
  showPassword ? "1fr 1fr" : "2fr 1fr"};
width:  40%;
input {
  color: black;
  border: none;
  padding: 1.1rem;
  margin: 2px;
  backgorund: transparent; 
  font-size: 1.1rem;
  border-radius: 10px;
  border: 2px solid red;
  &:focus{
    outline: none
  }
}
button{
  padding: 0.5rem 1rem;
  margin: 5px;
  background-color: #e50914;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bolder;
  font-size: 1.4rem;
}
}
button{
 padding: 0.5rem 1rem;
  margin: 5px;
  background-color: #e50914;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 6px;
  font-weight: bolder;
  font-size: 1.4rem;
}
}

`;