"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

interface StripeProps extends React.HTMLAttributes<HTMLDivElement> {
  options: {
    mode: "payment" | "subscription"
    amount: number
    currency: string
  }
}

export function Stripe({ children, options, ...props }: StripeProps) {
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    // In a real app, you would load your Stripe publishable key from an environment variable
    setStripePromise(loadStripe("pk_test_your_key_here"))
  }, [])

  return (
    <div {...props}>
      {stripePromise ? (
        <Elements
          stripe={stripePromise}
          options={{
            mode: options.mode,
            amount: options.amount,
            currency: options.currency,
          }}
        >
          {children}
        </Elements>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading payment system...</p>
        </div>
      )}
    </div>
  )
}

