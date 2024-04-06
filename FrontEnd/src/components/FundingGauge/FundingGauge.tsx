import React from "react";
import {
  FundingGaugeContainer,
  FundingGaugeFiller,
  FundingGaugePercentage,
} from "./FundingGaugeStyle";

interface FundingGaugeProps {
  salesCount: number;
  targetSales: number;
}

const FundingGauge = ({ salesCount, targetSales }: FundingGaugeProps) => {
  const fundingProgress =
    targetSales > 0 ? (salesCount / targetSales) * 100 : 0;

  return (
    <FundingGaugeContainer>
      <FundingGaugeFiller style={{ width: `${fundingProgress}%` }} />
      <FundingGaugePercentage>
        {fundingProgress.toFixed(2)}%
      </FundingGaugePercentage>
    </FundingGaugeContainer>
  );
};

export default FundingGauge;
