import { Transfer, getTransfers } from "@/api/transfers";
import React, { useEffect, useState } from "react";

const useTransfers = () => {
  const [transfers, setTransfer] = useState<Transfer[]>();
  useEffect(() => {
    const getAllTransfers = async () => {
      const trans = (await getTransfers()).data;
      setTransfer(trans);
    };
    if (!transfers) {
      getAllTransfers();
    }
  }, []);
  return { transfers, setTransfer };
};

export default useTransfers;
