'use client'

import { FormEvent, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Image from "next/image"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { addUserEmailToProducts } from "@/lib/actions"

interface Props {
    productId: string
}

const Modal = ({ productId }: Props) => {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setIsSubmitting(true)
    
            await addUserEmailToProducts(productId, email)
    
            setIsSubmitting(false)
            setEmail('')
    
        }
    


  return (

      <div className="w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button  className="w-full bg-black text-white">Track</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            <Image 
                                                src="/assets/images/reprice-logo.svg"
                                                alt="logo"
                                                width={94}
                                                height={94}
                                            />
                                            
                                        </DialogTitle>
                                        <DialogDescription>
                                            You will get an email notifying you when the price of the product is at it's lowest 
                                        </DialogDescription>
                                    </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input 
                                                    id="email" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    className="col-span-3" 
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>
                                    <DialogFooter>
                                        <form onSubmit={handleSubmit} className="w-full">
                                            <Button type="submit" className="w-full">
                                                {isSubmitting ? 'Submitting...' : 'Track'}
                                            </Button>
                                        </form>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
  )
}

export default Modal

