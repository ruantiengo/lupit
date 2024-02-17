import Image from "next/image";
import React from "react";

interface TransferProps {
  oldTeam: string;
  newTeam: string;
}
const Transfer = ({ oldTeam, newTeam }: TransferProps) => {
  return (
    <div className="flex gap-2">
      <Image src={oldTeam} alt="Time 1" height={35} width={35} />
      <img
        src={
          "https://static.vecteezy.com/system/resources/previews/015/337/678/original/right-arrow-icon-free-png.png"
        }
        alt="Transfer"
        height={35}
        width={35}
      />
      <Image src={newTeam} alt="Time 2" height={35} width={35} />
    </div>
  );
};

export default Transfer;
