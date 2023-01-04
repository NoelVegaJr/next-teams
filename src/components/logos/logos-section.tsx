import * as React from 'react';
import Image from 'next/image';

interface ITrustedBySectionProps {}

const TrustedBySection: React.FunctionComponent<ITrustedBySectionProps> = (
  props
) => {
  return (
    <section className='py-8'>
      <p className='text-lg px-6 font-semibold text-center leading-4 mb-10 sm:mb-0'>
        Trusted by companies all over the world
      </p>
      {/* flex flex-wrap justify-center items-center gap-x-6 p-6 mx-auto */}
      <div className='grid grid-cols-3 place-items-center sm:grid-cols-6  max-w-3xl mx-auto px-10'>
        <div className='relative'>
          <Image
            alt='trusted by airbnb'
            src='/images/airbnb-logo.png'
            width={100}
            height={50}
          />
        </div>
        <Image
          alt='trusted by nasa'
          src='/images/nasa-logo.png'
          width={65}
          height={65}
        />
        <Image
          alt='trusted by uber'
          src='/images/uber-logo.png'
          width={75}
          height={40}
        />
        <Image
          alt='trusted by dropbox'
          src='/images/dropbox-logo.png'
          width={100}
          height={150}
        />
        <Image
          alt='trusted by tesla'
          src='/images/tesla-logo.png'
          width={75}
          height={75}
        />
        <Image
          alt='trusted by twitch'
          src='/images/twitch-logo.png'
          width={90}
          height={75}
        />
      </div>
    </section>
  );
};

export default TrustedBySection;
