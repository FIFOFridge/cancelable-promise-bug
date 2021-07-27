import React, { useEffect } from 'react'
import { cancelable } from "cancelable-promise"

export const InternalAsync = () => {
    const performComponentAynscTask = async () => {
        throw Error("")
    }

    useEffect(() => {
        const componentAynscTask = cancelable(performComponentAynscTask())

        let isComponentTaskCompleted = false

        componentAynscTask.catch(() => {
            console.log(`componentAynscTask error handled as expected...`)
        })
        componentAynscTask.finally(() => {
            isComponentTaskCompleted = true
        })

        return () => {
            if (!isComponentTaskCompleted)
                componentAynscTask.cancel()
        }
    }, [])

    return (
        <>
            <div>Hello from InternalAsync!</div>
            <div>This component executes only self defined functional-component-scope async function</div>
        </>
    )
}

export default InternalAsync
