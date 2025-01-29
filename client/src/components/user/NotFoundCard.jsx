import React from "react";
import { SearchX } from "lucide-react";

export default function NotFoundCard() {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <SearchX size={85} strokeWidth={2} className="text-peach-orange" />
        <div className="text-center space-y-1">
          <p className="text-xl font-semibold">ไม่พบเนื้อหาที่คุณต้องการ</p>
          <p>กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    </div>
  );
}
