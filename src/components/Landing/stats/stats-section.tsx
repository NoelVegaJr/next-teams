import * as React from "react";

const StatsSection = () => {
  return (
    <section className="flex flex-col gap-8 py-20">
      <div className="flex flex-col gap-8 px-8">
        <p className="text-center text-3xl font-bold lg:text-5xl">
          Teams large and small rely on Orderly
        </p>
        <p className="text-center text-lg">
          Orderly securely scales up to support collaboration at the world’s
          biggest companies.
        </p>
      </div>
      <div className="mb-12 flex flex-col justify-center gap-4 px-4 sm:flex-row">
        <button className="rounded bg-slate-700 px-10 py-4 font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-slate-900">
          Meet Orderly for Enterprise
        </button>
        <button className="rounded border border-slate-900 px-10 py-4 font-semibold uppercase text-slate-900 transition-all duration-300 hover:shadow-[inset_0px_0px_0px_1px_rgba(15,23,42,1)]">
          Talk to sales
        </button>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 sm:grid-cols-3">
        <div className="text-center">
          <p className="mb-2 text-5xl font-bold text-slate-900">85%</p>
          <p className="mx-auto w-1/2 font-semibold">
            of users say Orderly has improved communication*
          </p>
        </div>
        <div className="text-center">
          <p className="mb-2 text-5xl font-bold text-slate-900">86%</p>
          <p className="mx-auto w-1/2 font-semibold">
            feel their ability to work remotely has improved*
          </p>
        </div>
        <div className="text-center">
          <p className="mb-2 text-5xl font-bold text-slate-900">88%</p>
          <p className="mx-auto w-1/2 font-semibold">
            feel more connected to their teams*
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
