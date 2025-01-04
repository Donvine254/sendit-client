'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from '../lib/stripe'

// Sample invoice data
const invoice = {
  customerName: "John Doe",
  email: "john.doe@example.com",
  amount: 9999, // Amount in cents (e.g., $99.99)
  userId: "23457565895"
}

export default function ServicePayment() {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const sessionUrl = await createCheckoutSession(invoice)
      window.location.href = sessionUrl
    } catch (error) {
      console.error('Payment error:', error)
      alert('There was an error processing your payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Invoice for {invoice.customerName}</h2>
      <p className="text-gray-600 mb-4">Amount: ${(invoice.amount / 100).toFixed(2)}</p>
      <Button 
        onClick={handlePayment} 
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </div>
  )
}

