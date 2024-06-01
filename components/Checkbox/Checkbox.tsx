import {
  Checkbox as AntCheckbox,
  CheckboxProps as AntCheckboxProps,
} from 'antd'
import cx from 'classnames'
import React, { useId } from 'react'

export interface CheckboxProps extends Partial<AntCheckboxProps> {
  checked?: boolean
  className?: string
  labelClassName?: string
  onChange?: () => void
  label: React.ReactNode
  checkedLabel?: React.ReactNode
  mobileLabel?: React.ReactNode
  mobileCheckedLabel?: React.ReactNode
  rtl?: boolean
  disabled?: boolean
}

export const Checkbox = ({
  checked = false,
  className,
  labelClassName,
  onChange,
  label,
  checkedLabel,
  mobileLabel,
  mobileCheckedLabel,
  rtl = false,
  disabled = false,
  ...rest
}: CheckboxProps) => {
  const uniqueId = useId()
  return (
    <AntCheckbox
      checked={checked}
      className={cx(
        {
          'flex-row-reverse': rtl,
        },
        className,
      )}
      disabled={disabled}
      onChange={onChange}
      {...rest}
    >
      <div className="h-6 overflow-hidden">
        <div
          className={cx('flex flex-col transition-all duration-[250] w-max', {
            '-translate-y-[24px]':
              checked && (!!checkedLabel || !!mobileCheckedLabel),
          })}
        >
          {[
            label,
            mobileLabel || label,
            checkedLabel || label,
            mobileCheckedLabel || checkedLabel || mobileLabel || label,
          ].map((label, index) => (
            <span
              key={`${uniqueId}-${index}`}
              className={cx(
                'h-6 items-center select-none text-neutral-800 hover:text-neutral-500 transition-colors duration-[250]',
                {
                  'flex md:hidden': index % 2 !== 0,
                  'md:flex hidden': index % 2 === 0,
                  'text-right justify-end': rtl,
                  'text-left justify-start': !rtl,
                },
                labelClassName,
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </AntCheckbox>
  )
}
