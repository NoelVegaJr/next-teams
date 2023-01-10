import * as React from 'react';
import { useState } from 'react';
import InfoLink from './info-link';
import LinkList from './link-list';

interface IMoreInfoSectionProps {}

const MoreInfoSection: React.FunctionComponent<IMoreInfoSectionProps> = (
  props
) => {
  return (
    <section className='flex flex-col md:flex-row md:justify-center md:gap-12 lg:gap-16 xl:gap-20 px-4 py-6'>
      <LinkList title='Why Orderly ?'>
        <InfoLink href='#' label='Channels' />
        <InfoLink href='#' label='Engagement' />
        <InfoLink href='#' label='Scale' />
        <InfoLink href='#' label='Watch the Demo' />
      </LinkList>
      <LinkList title='Product'>
        <InfoLink href='#' label='Features' />
        <InfoLink href='#' label='Integrations' />
        <InfoLink href='#' label='Enterprise' />
        <InfoLink href='#' label='Solutions' />
        <InfoLink href='#' label="What's New" />
      </LinkList>
      <LinkList title='Pricing'>
        <InfoLink href='#' label='Channels' />
        <InfoLink href='#' label='Engagement' />
        <InfoLink href='#' label='Scale' />
        <InfoLink href='#' label='Watch the Demo' />
      </LinkList>
      <LinkList title='Resources'>
        <InfoLink href='#' label='Channels' />
        <InfoLink href='#' label='Engagement' />
        <InfoLink href='#' label='Scale' />
        <InfoLink href='#' label='Watch the Demo' />
      </LinkList>
      <LinkList title='Company'>
        <InfoLink href='#' label='Channels' />
        <InfoLink href='#' label='Engagement' />
        <InfoLink href='#' label='Scale' />
        <InfoLink href='#' label='Watch the Demo' />
      </LinkList>
    </section>
  );
};

export default MoreInfoSection;
