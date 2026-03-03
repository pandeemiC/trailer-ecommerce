"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HomepageSection } from "@/lib/types";
import {
  createSection,
  updateSection,
  deleteSection,
  reorderSection,
} from "@/lib/admin/actions";

import {
  PiPencilSimpleLight,
  PiTrashLight,
  PiArrowUpLight,
  PiArrowDownLight,
  PiPlusLight,
} from "react-icons/pi";
import ImageUploader from "./ImageUploader";

interface ContentManagerProps {
  sections: HomepageSection[];
}

export default function ContentManager({ sections }: ContentManagerProps) {
  return <div>ContentManager</div>;
}
