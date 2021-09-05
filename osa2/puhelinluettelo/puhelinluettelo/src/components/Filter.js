import React from 'react'

const Filter = ({ newFilter, handle }) => (
    <>
    filter: <input 
        value={newFilter}
        onChange={handle}
      />
    </>
)

export default Filter