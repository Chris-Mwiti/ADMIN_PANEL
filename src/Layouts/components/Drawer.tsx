import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { GanttChart, Menu } from 'lucide-react';
import { NavLinks } from './NavLinks';

const Drawer = () => {
  return (
    <Sheet>
        <SheetTrigger asChild className='block xl:hidden'>
            <Button variant={'outline'}>
                <GanttChart color='#ffffff'/>
            </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className='bg-white/10 bg-clip-padding bg-opacity-50 backdrop-filter backdrop-blur-sm'>
            <SheetHeader>
                <SheetTitle>
                    <p className='text-primary text-center text-xl font-bold'>JUICE HUB</p>
                </SheetTitle>
                <SheetDescription>
                    Hello World
                </SheetDescription>
            </SheetHeader>
            <NavLinks isResizable={false} isWidthAdjusted={false}/>
        </SheetContent>
        <SheetFooter>
        </SheetFooter>
    </Sheet>
  )
}

export default Drawer