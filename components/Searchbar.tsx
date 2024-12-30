'use client'

import { FormEvent, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"


const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url)
        const hostname = parsedURL.hostname

        // Check if hostname contains amazon.com or amazon.country
        if(
            hostname.includes('amazon.com') 
            || hostname.includes('amazon.') 
            || hostname.endsWith('amazon')) {
                return true
        }

    } catch (error) {
        return false
    }

    return false
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt) 

    if(!isValidLink) return 
        <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your session has expired. Please log in again.
                </AlertDescription>
        </Alert>

    try {
        setIsLoading(true)
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
  } 

  return (
    <form 
        className="flex flex-wrap gap-4 mt-12" 
        onSubmit={handleSubmit}>

        <input 
            type="text"
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder="Enter product link from Amazon"
            className="searchbar-input"
        />

        <button
            type="submit"
            className="searchbar-btn"
            disabled={searchPrompt === ''}
        >
            {isLoading ? 'Searching...' : 'Search'}
        </button>

    </form>


  )
}

export default Searchbar
