'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import AddRecipe from '@/app/components/AddRecipe';

const Page = () => {
    const router = useRouter();

    return (
        <div>
            <button onClick={() => { router.push('/recipe-list') }} className='text-[#404445] font-normal mt-[30px] ml-[30px]'>‹ Back</button>
            <AddRecipe />
        </div>
    )
}

export default Page;