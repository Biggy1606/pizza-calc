import Link from "next/link";
import { cn } from "./utils/utils";
import { buttonStyle } from "./consts";

export default function NotFound() {
  return (
    <div className='prose flex flex-col items-center space-y-4 px-4 py-2'>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link
        href='/'
        className={cn('w-full',buttonStyle)}
      >
        Return Home
      </Link>
    </div>
  );
}
