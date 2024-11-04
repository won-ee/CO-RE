import styled from "styled-components";

export const ContainerLayout = styled.div`
  width: 200px;
  padding: 35px 10px 30px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const Name = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export const Title = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
`;

export const Email = styled.p`
  font-size: 12px;
  color: #555;
`;