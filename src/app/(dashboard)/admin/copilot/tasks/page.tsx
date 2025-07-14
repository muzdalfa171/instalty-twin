import React from 'react'

export default function TasksPage() {
  return (
    <>
    <h1>Tasks</h1>
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">Tasks</h2>
            <p className="text-sm text-gray-500">Tasks are a way to track your progress and goals.</p>
        </div>
    </div>
    </>
  )
}