import styled from "styled-components";

const Inputbox = styled.div`
  flex: 1 0 0;
`;

export default function Input({
  label,
  value,
  type,
  func,
}: {
  label: string;
  value: string;
  type: string;
  func: Function;
}) {
  return (
    <>
      {label === "image" ? (
        <Inputbox>
          <label>{`${label} :`}</label>
          <input type={type} onChange={(e) => func(e.target.files)} />
        </Inputbox>
      ) : (
        <Inputbox>
          <label>{`${label} :`}</label>
          <input
            value={value}
            type={type}
            onChange={(e) => func(e.target.value)}
          />
        </Inputbox>
      )}
    </>
  );
}
