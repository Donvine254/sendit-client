import React from 'react'

export default function OrderDetails() {
  return (
    <form className="mx-5 lg:w-1/2 lg:mx-auto py-2">
      <p className="text-lg font-bold py-2 text-center">
              Add Parcel Details
            </p>
       <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm ">
            What are you sending <span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            rows="3"
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
