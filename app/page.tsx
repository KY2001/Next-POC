import 'server-only';

const Page = (): JSX.Element => {
  return (
    <div className="relative isolate mx-auto max-w-2xl px-6 py-32 pt-14 text-center sm:py-48 lg:px-8 lg:py-56">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Hello World</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Get started
        </a>
        <a className="text-sm font-semibold leading-6 text-gray-900">
          {/* TODO: Learn more はボタン？ */}
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

export default Page;
