'use client'
import Swal from 'sweetalert2'
import React from 'react'

export default function Button({text}) {
  return (
<button className="btn btn-primary" onClick={()=>Swal.fire({
        icon:"success",
        title:"success",
        text:"request submitted successfully",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor:"#0056F1"
      }
      )}>{text}</button>
  )
}
