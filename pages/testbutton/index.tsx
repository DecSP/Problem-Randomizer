import { Icon } from '@iconify/react'
import React from 'react'

import { Button } from '@/components/Button'

const index = () => {
  return (
    <div className="p-10">
      <Button variant="solid" color="black">
        <Icon icon="ri:arrow-right-s-line" className="shrink-0" />
        View Selected Problems
      </Button>
    </div>
  )
}

export default index
