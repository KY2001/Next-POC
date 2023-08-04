// import 'server-only';

import Image from 'next/image';

export const Logo = (): JSX.Element => {
  return (
    <div className="mx-4 flex items-center">
      <Image
        src="https://flowbite.com/docs/images/logo.svg"
        width={40}
        height={40}
        alt="Logo"
        className="mr-2"
      />
      <span className="ml-2 text-xl font-semibold">ServiceName</span>
    </div>
  );
};
