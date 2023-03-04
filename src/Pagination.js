import React from 'react'

export default function Pagination({ gotoNextpage, gotoPreviouspage }) {
  return (
    <div className='buttons'>
      { gotoPreviouspage && <button className="prev-next-btn" onClick={gotoPreviouspage}>Prev</button>}
      { gotoNextpage && <button className="prev-next-btn" onClick={gotoNextpage}>Next</button>}
    </div>
  )
}
