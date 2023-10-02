'use client'
import Swal from 'sweetalert2'
import React from 'react'

export default function Button() {
  return (
<button className="btn btn-neutral" onClick={()=>Swal.fire({
        icon:"success",
        title:"success",
        text:"request submitted successfully",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor:"#0056F1"
      }
      )}>Buy Now</button>
  )
}
