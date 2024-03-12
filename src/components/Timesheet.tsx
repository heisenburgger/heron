"use client";

import { cn, formatDate, getInterval } from "@/lib/utils";
import { useEffect, useState } from "react";

// number of hours for a session
// TODO: interpolate this value in tailwind grid
const SESSION = 5;

export function Timesheet() {
  const [date, setDate] = useState(new Date());
  console.log("date:", date);
  const formattedDate = formatDate(date);
  const interval = getInterval(4, 22, 1);
  const currentHour = date.getHours();
  const remainingMinutes = 60 - date.getMinutes()

  useEffect(() => {
    const intervalID = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <main className="border border-gray-500 p-4 w-[55%]">
      {/* hey next.js this is on you */}
      <div key={date.toString()}>
        <h1 className="text-3xl font-semibold mb-6">{formattedDate}</h1>
        <div className={`grid grid-cols-5 gap-4`}>
          {interval.map((item) => {
            return (
              <div
                key={item}
                className={cn(
                  "h-[80px] border border-gray-500 grid place-content-center relative",
                  {
                    "border-2 border-purple-500": currentHour === item,
                    "border-gray-300": item < currentHour,
                  }
                )}
              >
                {currentHour === item && <span className="absolute top-0 right-0 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 font-medium">Left: {remainingMinutes} mins</span>}
                <p className="mt-2">
                  <span
                    className={cn("text-xl", {
                      "text-gray-400": item < currentHour,
                    })}
                  >
                    {item > 12 ? item - 12 : item}
                  </span>
                  <span
                    className={cn("text-sm text-gray-500", {
                      "text-gray-400": item < currentHour,
                    })}
                  >
                    {item > 12 ? " PM" : " AM"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
