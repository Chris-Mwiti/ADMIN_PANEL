import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarComponent = () => {
  return (
    <Avatar className='text-foreground'>
        <AvatarImage src="" />
        <AvatarFallback className="flex w-full items-center justify-center">CM</AvatarFallback>
    </Avatar>
  )
}

export default AvatarComponent