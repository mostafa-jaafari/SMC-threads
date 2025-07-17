import React from 'react'

export default function PostSkeleton() {
  return (
    <section className="w-full flex items-start gap-4 p-6 border-b border-neutral-800 animate-pulse">
        {/* الصورة + زر المتابعة */}
        <div className="relative">
            <div className="relative overflow-hidden w-10 h-10 rounded-full border bg-neutral-800" />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-neutral-600" />
        </div>

        {/* القسم الرئيسي */}
        <section className="w-full space-y-2">
            <div className="flex items-center gap-2">
            {/* الاسم */}
            <div className="h-4 w-24 bg-neutral-800 rounded-md" />
            {/* الوقت أو result */}
            <div className="h-3 w-12 bg-neutral-800 rounded-md" />
            </div>

            {/* النص */}
            <div className="h-4 w-full bg-neutral-800 rounded-md" />
            <div className="h-4 w-5/6 bg-neutral-800 rounded-md" />

            {/* صورة المنشور */}
            <div className="w-full max-w-[400px] h-[400px] bg-neutral-800 rounded-2xl border border-neutral-800" />

            {/* الأزرار (like, comment, etc) */}
            <div className="flex items-center gap-6 pt-4">
            <div className="w-6 h-6 bg-neutral-800 rounded-md" />
            <div className="w-6 h-6 bg-neutral-800 rounded-md" />
            <div className="w-6 h-6 bg-neutral-800 rounded-md" />
            <div className="w-6 h-6 bg-neutral-800 rounded-md" />
            </div>
        </section>

        {/* النقاط الثلاث */}
        <div className="w-6 h-6 bg-neutral-800 rounded-full" />
    </section>
  )
}
