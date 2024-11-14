
'use client'
import React from 'react'
import RecipeList from '@/app/components/RecipeList'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();


  return (
    <div>

      <div className='p-[40px]'>
        <header className='flex flex-col w-[90%]'>
          <h1 className='text-[4vh] pb-[6vh]'>Recipe List</h1>
          <button className='flex self-end bg-[#7864EA] text-white rounded-sm p-[7px] w-[7vw] cursor-pointer justify-center' onClick={() => router.push('/add-recipe')} title="add recipe">Add Recipe</button>
        </header>
       <Filtering></Filtering>
      </div>

    </div>
  );
};

export default Page;
