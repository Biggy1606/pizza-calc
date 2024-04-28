import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "./utils/utils";

const TopBar = () => {
  return (
    <div className='flex h-16 items-center justify-between bg-slate-500 p-4 text-white'>
      <h1 className='m-0 p-0 text-3xl font-bold text-white'>
      <Link
        href='/'
        className={cn('w-full')}
      >
        Wise Slice - pizza
        </Link>
      </h1>
      <Menu className='h-8 w-8' />
    </div>
  );
};

export default TopBar;
