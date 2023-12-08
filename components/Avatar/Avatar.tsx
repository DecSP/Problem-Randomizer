import Image, { ImageProps } from 'next/image'
import cx from 'classnames'

interface AvatarProps extends Partial<ImageProps> {
  size?: '32' | '100'
  className?: string
}

const getAvatarContainerClassName = (size: AvatarProps['size']) => {
  switch (size) {
    case '100':
      return 'w-[100px] h-[100px]'
    case '32':
    default:
      return 'w-[32px] h-[32px]'
  }
}

export const Avatar = ({
  size = '32',
  className,
  alt,
  src,
  ...rest
}: AvatarProps) => {
  return (
    <div
      className={cx(
        'rounded-full overflow-hidden relative',
        getAvatarContainerClassName(size),
        className,
      )}
    >
      <div className="bg-slate-200 rounded-full animate-pulse absolute h-full w-full" />

      <Image
        className="absolute"
        height={size}
        width={size}
        src={src || '/images/avatar-image.png'}
        alt={alt || ''}
        {...rest}
      />
    </div>
  )
}
