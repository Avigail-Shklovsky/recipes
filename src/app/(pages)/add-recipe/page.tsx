'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import AddRecipe from '@/app/components/AddRecipe';

const Page = () => {
    const router = useRouter();

    return (
        <div>
            <AddRecipe />
        </div>
    )
}

export default Page;
