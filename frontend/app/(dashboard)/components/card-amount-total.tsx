import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import TeamIcon from "./team-icon";

interface CardTotalQuantityProps {
  title: string;
  text: string;
}
const CardTotalAmount = ({ title, text }: CardTotalQuantityProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <TeamIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{text}</div>
      </CardContent>
    </Card>
  );
};

export default CardTotalAmount;
