import styled from "styled-components";

export const FundingGaugeContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #eee;
  border-radius: 8px;
`;

export const FundingGaugeFiller = styled.div`
  height: 30px;
  background-color: #5271ff;
  border-radius: inherit;
`;

export const FundingGaugePercentage = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
`;
