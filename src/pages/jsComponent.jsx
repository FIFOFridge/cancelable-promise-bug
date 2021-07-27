import React, { useEffect } from 'react'
import { cancelable } from "cancelable-promise"
import { performUtilAsyncTask } from "../utils/sampleUtil"

export const JsComponent = () => {
    const performComponentAynscTask = async () => {
        throw Error("")
    }

    useEffect(() => {
        const externalAsyncTask = cancelable(performUtilAsyncTask())
        const componentAynscTask = cancelable(performComponentAynscTask())

        let isExternalTaskCompleted = false
        let isComponentTaskCompleted = false

        componentAynscTask.catch(() => {
            console.log(`componentAynscTask error handled as expected...`)
        })
        componentAynscTask.finally(() => {
            isComponentTaskCompleted = true
        })

        externalAsyncTask.catch(() => {
            console.log(`externalAsyncTask error handled as expected...`)  
        })
        externalAsyncTask.finally(() => {
            isExternalTaskCompleted = true
        })

        return () => {
            if(!isExternalTaskCompleted)
                externalAsyncTask.cancel()

            if (!isComponentTaskCompleted)
                componentAynscTask.cancel()
        }
    }, [])

    return (
        <>
            Hello from JsComponent!
        </>
    )
}

export default JsComponent
