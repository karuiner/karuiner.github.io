import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";
import { useHistory } from "react-router-dom";

export default function Mypage({
  token,
  userName,
  email,
  phone,
  createdAt,
}: {
  token: string;
  userName: string;
  email: string;
  phone: string;
  createdAt: string;
}) {
  let history = useHistory();

  return (
    <div>
      <div>
        <span>username :</span>
        <span>{userName} </span>
      </div>
      <div>
        <span>email :</span>
        <span>{email}</span>
      </div>
      <div>
        <span>phone :</span>
        <span>{phone}</span>
      </div>
      <div>
        <span>createdAt :</span>
        <span>{createdAt}</span>
      </div>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        cancel
      </button>
    </div>
  );
}
