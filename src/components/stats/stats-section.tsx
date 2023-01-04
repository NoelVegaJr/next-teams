import * as React from 'react';

interface IStatsSectionProps {}

const StatsSection: React.FunctionComponent<IStatsSectionProps> = (props) => {
  return (
    <section className='flex flex-col gap-8 py-20'>
      <div className='flex flex-col gap-8 px-8'>
        <p className='text-3xl text-center font-bold lg:text-5xl'>
          Teams large and small rely on Orderly
        </p>
        <p className='text-lg text-center'>
          Orderly securely scales up to support collaboration at the world’s
          biggest companies.
        </p>
      </div>
      <div className='flex flex-col mb-12 px-4 justify-center gap-4 sm:flex-row'>
        <button className='font-semibold px-10 py-4 bg-slate-700 text-white rounded tracking-wide uppercase hover:bg-slate-900 transition-all duration-300'>
          Meet Orderly for Enterprise
        </button>
        <button className='font-semibold px-10 py-4 text-slate-900 border border-slate-900 rounded uppercase hover:shadow-[inset_0px_0px_0px_1px_rgba(15,23,42,1)] transition-all duration-300'>
          Talk to sales
        </button>
      </div>
      <div className='grid grid-cols-1 gap-y-10 sm:grid-cols-3 max-w-7xl mx-auto'>
        <div className='text-center'>
          <p className='text-5xl font-bold text-slate-900 mb-2'>85%</p>
          <p className='w-1/2 mx-auto font-semibold'>
            of users say Orderly has improved communication*
          </p>
        </div>
        <div className='text-center'>
          <p className='text-5xl font-bold text-slate-900 mb-2'>86%</p>
          <p className='w-1/2 mx-auto font-semibold'>
            feel their ability to work remotely has improved*
          </p>
        </div>
        <div className='text-center'>
          <p className='text-5xl font-bold text-slate-900 mb-2'>88%</p>
          <p className='w-1/2 mx-auto font-semibold'>
            feel more connected to their teams*
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
