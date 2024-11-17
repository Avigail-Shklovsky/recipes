// <<<<<<< HEAD
// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import AddRecipe from "@/app/components/AddRecipe";

// const page = () => {
//   const router = useRouter();

//   return (
//     <div>
//       <button
//         onClick={() => {
//           router.push("/");
//         }}
//         className="text-[#404445] font-normal mt-[30px] ml-[30px]"
//       >
//         ‹ Back
//       </button>
//       <AddRecipe />
//     </div>
//   );
// };
// =======

import React from "react";
import AddRecipe from "@/app/components/AddRecipe";

const page = () => {
  return (
    <div>
      <AddRecipe />
    </div>
  );
};

export default page;
