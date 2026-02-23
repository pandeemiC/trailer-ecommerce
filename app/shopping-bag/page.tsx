import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useCartStore from "@/store/useCartStore";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ShoppingBag() {
  return (
    <div>
      <h1>Shopping Bag</h1>
    </div>
  );
}
