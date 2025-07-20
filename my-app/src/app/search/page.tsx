import React from 'react'
import { SearchPage } from './SearchPage'

export default function page() {
  return (
    <main className="w-full pb-14">
            <section
                className='w-full flex flex-col items-center'
            >
                <SearchPage />
            </section>
        </main>
  )
}
