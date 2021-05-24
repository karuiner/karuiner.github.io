import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";
import { useHistory } from "react-router-dom";
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
  height: 40%;
  width: 40%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px green;
`;
const Imginput = styled.img`
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  display: block;
`;
const Textinput = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const InputArea = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  flex-direction: row;
`;

const Button = styled.button`
  display: flex;
  height: 50px;
  width: 100%;
  text-align: center;
`;
const ImgBox = styled.div`
  flex: 1 0 0;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default function Resister({ Factive }: { Factive: Function }) {
  const [name, namef] = useState("");
  const [password, passwordf] = useState("");
  const [email, emailf] = useState("");
  const [phone, phonef] = useState("");
  const [image, imagef] = useState("");
  let history = useHistory();
  return (
    <ModalMain>
      <Modal>
        <InputArea>
          <ImgBox>
            <Imginput
              src={image.length ? URL.createObjectURL(image[0]) : image}
            ></Imginput>
            <Button
              onClick={() => {
                namef("");
                passwordf("");
                emailf("");
                phonef("");
                Factive(false);
                history.push("/");
              }}
            >
              cancel
            </Button>
          </ImgBox>

          <Textinput>
            <Input
              label={"image"}
              type={"file"}
              value={image}
              func={imagef}
            ></Input>
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
            <Input
              label={"email"}
              type={"email"}
              value={email}
              func={emailf}
            ></Input>
            <Input
              label={"phone"}
              type={"text"}
              value={phone}
              func={phonef}
            ></Input>
            <Button
              onClick={() => {
                console.log(image);
                let data = new FormData();
                data.append("userImage", image[0]);
                data.append("userName", name);
                data.append("password", password);
                data.append("email", email);
                data.append("phone", phone);
                const config = {
                  headers: { "content-type": "multipart/form-data" },
                };
                axios
                  .post("http://localhost:4000/dummy", data, config)
                  .then((rst) => {
                    console.log("ok");
                  })
                  .catch((err) => {
                    console.log("fail");
                  });
              }}
            >
              ok
            </Button>
          </Textinput>
        </InputArea>
      </Modal>
    </ModalMain>
  );
}
