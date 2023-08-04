'use client';

import Link from 'next/link';

export const TextLink = (props: { linkPath: string; string: string }): JSX.Element => {
  const { linkPath, string } = props;
  return <Link href={linkPath}>{string}</Link>;
};
