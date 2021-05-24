import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";
import { useHistory } from "react-router-dom";
import "dotenv/config";
axios.defaults.withCredentials = true;
const ModalMain = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px blue;
`;

const Modal = styled.div`
  height: 80%;
  width: 80%;
  z-index: 1;
  display: flex;
  flex-direction: column;

  align-items: center;
  border: solid 1px green;
`;

function Login({ Ftoken, Factive }: { Ftoken: Function; Factive: Function }) {
  const [name, namef] = useState("");
  const [password, passwordf] = useState("");
  let history = useHistory();
  const Tologin = () => {
    let cmd = `https://server.recipe101.tk/signin`;
    console.log(cmd);
    return axios
      .post(
        // "http://ec2-15-165-205-147.ap-northeast-2.compute.amazonaws.com/signin",
        //        "http://localhost:4000/signin",
        cmd,
        { username: name, password: password }
      )
      .then((res) => {
        namef("");
        passwordf("");
        Ftoken(res.data.data.accessToken);
        Factive(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalMain>
      <Modal>
        {" "}
        <Input
          label={"username"}
          type={"text"}
          value={name}
          func={namef}
        ></Input>
        <Input
          label={"password"}
          type={"password"}
          value={password}
          func={passwordf}
        ></Input>
        <div>
          <button
            onClick={() => {
              Tologin();
            }}
          >
            ok
          </button>
          <button
            onClick={() => {
              namef("");
              passwordf("");
              Factive(false);
              history.push("/");
            }}
          >
            cancel
          </button>
        </div>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          아직 계정이 없으십니까?
        </button>
      </Modal>
    </ModalMain>
  );
}
export default Login;
