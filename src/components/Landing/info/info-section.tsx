import Link from "next/link";
import * as React from "react";
import InfoHeader from "./header";
import ImageView from "./ImageView";
import Info from "./info";
import InfoLink from "./info-link";
import InfoBody from "./InfoBody";

const InfoSection: React.FunctionComponent = () => {
  return (
    <section className="flex flex-col gap-12 px-6 lg:gap-24">
      <Info>
        <ImageView />
        <InfoBody>
          <InfoHeader>Messaging that means business</InfoHeader>
          <p className="text-lg font-semibold">
            Slack is built for work. It’s the app where you can instantly reach
            your team on the go or at your desk.
          </p>
          <InfoLink href="*" label="Learn more about Slack features" />
        </InfoBody>
      </Info>
      <Info>
        <ImageView />
        <InfoBody>
          <InfoHeader>Bring your team together</InfoHeader>
          <p className="text-lg font-semibold">
            At the heart of Slack are channels: organized spaces for everyone
            and everything you need for work.
          </p>
          <InfoLink href="#" label="Learn more about channels" />
        </InfoBody>
      </Info>

      <Info>
        <ImageView />
        <InfoBody>
          <InfoHeader>Choose how you want to work</InfoHeader>
          <p className="text-lg font-semibold">
            You can chat, send audio and video clips, or hop on a huddle to talk
            things out live.
          </p>
          <InfoLink href="#" label="Learn more about flexible communication" />
        </InfoBody>
      </Info>
    </section>
  );
};

export default InfoSection;
