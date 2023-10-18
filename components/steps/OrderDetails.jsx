import React from 'react'

export default function OrderDetails() {
  return (
    <form className="">
       <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm ">
            What are you sending <span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            rows="5"
            name="description"
            id="description"
            placeholder="parcel description"
            className="w-full textarea textarea-primary"
            required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block mb-2 text-sm text-gray-600">
            Weight <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            type="number"
            name="number"
            id="number"
            max={100}
            placeholder="weight"
            required
            className="input input-bordered input-secondary w-full max-w-xs0"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="value" className="block mb-2 text-sm text-gray-600">
            Value <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            type="number"
            name="value"
            id="number"
            placeholder="value"
            required
            className="input input-bordered input-secondary w-full max-w-xs0"
          />
        </div>
    </form>
  )
}
