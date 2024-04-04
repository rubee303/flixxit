import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header/>
        <div className="form-container flex column a-center j-center">
          <div className="form felx column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
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
            

              <button onClick={handleLogIn}>Log In</button>
            
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
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
  .form-container {
    gap: 2rem;
    height: 85vh;
    .form {
      font-size: 25px;
      border-radius: 18px;
      padding: 2rem;
      background-color: #000000b0;
      width: 33vw;
      gap: 2rem;
      color: red;
      .container {
        gap: 2rem;
        input {
          text-align: center;
          font-size: 18px;
          height: 40px;
          padding: 0.7rem 1.2rem;
          width: 26.2rem;
          border-radius: 5px;
        }
        button {
          padding: 0.5rem 1rem;
          height: 2.5rem;
          margin: 10px;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 4px;
          font-weight: bolder;
          font-size: 1.5rem;
        }
      }
    }
  }
 }
`;